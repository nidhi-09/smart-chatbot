const axios = require('axios');

const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';

async function getChatResponse(message) {
  const response = await axios.post(
    openaiEndpoint,
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
}

module.exports = { getChatResponse };