require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

    // Use OpenAI to generate a summary about the person
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful research assistant. When given a name, provide a comprehensive summary about that person based on publicly available information. Include their profession, notable achievements, and any significant contributions they've made. If the name is common or you're not certain about a specific individual, provide general context and mention that multiple people may have this name. Keep the summary informative but concise, around 200-300 words."
        },
        {
          role: "user",
          content: `Please provide a summary about: ${name}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('No response from OpenAI API');
    }

    const summary = completion.choices[0].message.content;

    res.json({
      name: name,
      summary: summary,
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
