# Getting a Tavily API Key for Web Search

To enable real-time web search (LinkedIn, Twitter/X, GitHub, etc.), you need a search API key.

## Option 1: Tavily API (Recommended - Free Tier Available)

1. Go to [Tavily.com](https://tavily.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Free tier includes 1,000 searches/month

Add to your `.env` file:
```
TAVILY_API_KEY=tvly-xxxxxxxxxxxxxxxxxxxxxxxx
```

## Option 2: SerpAPI (Alternative)

1. Go to [SerpAPI.com](https://serpapi.com/)
2. Sign up for a free account
3. Get your API key
4. Free tier includes 100 searches/month

Add to your `.env` file:
```
SERPAPI_KEY=your_serpapi_key_here
```

## Without a Search API Key

If you don't add a search API key, the app will still work but will only use OpenAI's training data (knowledge cutoff) instead of real-time web searches.

## For Vercel Deployment

Add the environment variable in Vercel:

```bash
vercel env add TAVILY_API_KEY production
```

Or through the Vercel dashboard:
1. Go to your project settings
2. Environment Variables
3. Add `TAVILY_API_KEY` with your key
4. Redeploy
