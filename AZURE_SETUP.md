# Azure OpenAI Setup Instructions

To use Microsoft 365 Copilot / Azure OpenAI with this application, you need to set up Azure OpenAI Service.

## Option 1: Use Azure OpenAI Service

### Step 1: Create Azure OpenAI Resource

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new **Azure OpenAI** resource
3. Once created, go to the resource

### Step 2: Get Your Credentials

1. Go to **Keys and Endpoint** section
2. Copy:
   - **Endpoint** (e.g., `https://your-resource-name.openai.azure.com/`)
   - **Key 1** or **Key 2**

### Step 3: Deploy a Model

1. Go to **Model deployments** in your Azure OpenAI resource
2. Click **Create new deployment**
3. Select a model (e.g., `gpt-4`, `gpt-35-turbo`)
4. Give it a deployment name (e.g., `gpt-4`)

### Step 4: Update Your .env File

Update your `.env` file with:

```
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_API_KEY=your_key_here
AZURE_OPENAI_DEPLOYMENT=your-deployment-name
PORT=3000
```

## Option 2: Request Corporate Access

If your organization has Microsoft 365 Copilot configured:

1. Contact your IT department
2. Request access to Azure OpenAI API endpoints
3. Ask for:
   - Azure OpenAI endpoint URL
   - API key or authentication method
   - Available deployment names

## Note About Corporate Networks

If you're on a Capgemini or similar corporate network, you may need to:
- Request an exception through Service Central
- Use the approved Microsoft 365 Copilot Chat interface
- Work with IT to configure proper API access

## Testing the Setup

Once configured, start the server:
```bash
npm start
```

Then test the API:
```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"name":"Albert Einstein"}'
```

You should see a JSON response with the generated summary.
