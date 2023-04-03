const connectDB = require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/generate-niche-ideas', async (req, res) => {
  const keyword = req.body.keyword;
  if (!keyword) {
    res.status(400).json({ error: 'Keyword is required' });
    return;
  }

  try {
    const aiResponse = await generateNicheIdeas(keyword);
    const formattedResponse = formatAiResponse(aiResponse);
    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating niche ideas' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Mock generateNicheIdeas function
async function generateNicheIdeas(keyword) {
  return {
    keyword,
    ideas: [
      'Idea 1',
      'Idea 2',
      'Idea 3'
    ]
  };
}

// Mock formatAiResponse function
function formatAiResponse(aiResponse) {
  return {
    keyword: aiResponse.keyword,
    nicheIdeas: aiResponse.ideas
  };
}
