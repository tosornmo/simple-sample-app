require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to search the web using Tavily API or Google Custom Search
async function searchWeb(query) {
  try {
    // Try Tavily API first (if API key is available)
    if (process.env.TAVILY_API_KEY) {
      const response = await axios.post('https://api.tavily.com/search', {
        api_key: process.env.TAVILY_API_KEY,
        query: query,
        search_depth: 'advanced',
        include_domains: ['linkedin.com', 'twitter.com', 'x.com', 'github.com', 'facebook.com', 'instagram.com'],
        max_results: 10
      });
      return response.data.results || [];
    }
    
    // Fallback to SerpAPI if available
    if (process.env.SERPAPI_KEY) {
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          q: query,
          api_key: process.env.SERPAPI_KEY,
          engine: 'google'
        }
      });
      return response.data.organic_results || [];
    }
    
    return [];
  } catch (error) {
    console.error('Web search error:', error.message);
    return [];
  }
}

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API endpoint to search and summarize
app.post('/api/search', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Perform web searches for different platforms
    const searchQueries = [
      `${name} LinkedIn profile`,
      `${name} Twitter X profile`,
      `${name} GitHub profile`,
      `${name} biography achievements`,
      `${name} professional background`
    ];

    let searchResults = [];
    
    // Gather search results from all queries
    for (const query of searchQueries) {
      const results = await searchWeb(query);
      searchResults = searchResults.concat(results);
    }

    // Prepare context from search results
    let searchContext = '';
    if (searchResults.length > 0) {
      searchContext = '\n\nSearch Results:\n';
      searchResults.slice(0, 15).forEach((result, index) => {
        const title = result.title || result.snippet || '';
        const snippet = result.content || result.snippet || '';
        const url = result.url || result.link || '';
        searchContext += `${index + 1}. ${title}\n${snippet}\nSource: ${url}\n\n`;
      });
    }

    // Use OpenAI to generate a summary based on search results
    const systemPrompt = searchResults.length > 0
      ? "You are a helpful research assistant. Based on the search results provided, create a comprehensive and accurate summary about the person. Focus on verified information from reputable sources like LinkedIn, GitHub, Twitter/X, and professional websites. Include their profession, current role, notable achievements, and online presence. If multiple people share the same name, distinguish between them. Be factual and cite which platforms they're active on. Keep the summary informative but concise, around 200-300 words."
      : "You are a helpful research assistant. No recent search results were found for this person. Provide a brief note that limited information is available and suggest the person may have a low online presence or the name might be spelled differently. Keep it brief and helpful.";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Please provide a summary about: ${name}${searchContext}`
        }
      ],
      temperature: 0.7,
      max_tokens: 600
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('No response from OpenAI API');
    }

    const summary = completion.choices[0].message.content;

    res.json({
      name: name,
      summary: summary,
      sources: searchResults.slice(0, 5).map(r => ({
        title: r.title,
        url: r.url || r.link
      })),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message 
    });
  }
});

// Serve index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve results page
app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
