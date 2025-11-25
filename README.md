# AI Name Search Application

An AI-powered web application that searches for information about a person by name and generates a comprehensive summary using OpenAI's GPT-4 model.

## Features..

- Simple, clean user interface
- Name input form
- AI-generated summaries using OpenAI
- Results page with formatted abstract
- Responsive design
- Error handling

## Deployment on Vercel

This app is designed to be deployed on Vercel for easy access outside corporate networks.

### Quick Deploy

1. Push this code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variable:
   - `OPENAI_API_KEY` = your OpenAI API key
5. Deploy!

### Local Development

#### Prerequisites

- Node.js (v14 or higher)
- OpenAI API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your_actual_api_key_here
PORT=3000
```

### Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a name in the search form
3. Click "Search" to generate an AI summary
4. View the results on the summary page

## Project Structure

```
simple-sample-app/
├── server.js              # Express server with OpenAI integration
├── package.json           # Project dependencies
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
└── public/               # Frontend files
    ├── index.html        # Main page with search form
    ├── results.html      # Results page
    ├── app.js           # Frontend logic for search
    ├── results.js       # Frontend logic for results
    └── styles.css       # Application styling
```

## Technologies Used

- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-4o-mini API
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Vercel
- **Environment**: dotenv for configuration

## Notes

- Make sure to keep your OpenAI API key secure and never commit it to version control
- The application uses GPT-4o-mini for generating summaries
- API calls to OpenAI will incur costs based on your usage
- Deploying on Vercel allows you to bypass corporate network restrictions
