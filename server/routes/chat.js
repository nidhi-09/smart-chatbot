const express = require('express');
const { sendChatEvent } = require('../services/kafka');
const router = express.Router();
const { getChatResponse } = require('../services/openai')

// POST /api/chat
router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    // Call the AI model
    const reply = await getChatResponse(message);

    //  Send chat to Kafka
    await sendChatEvent(message, reply);

    //  Send the response back to frontend
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
});

module.exports = router;