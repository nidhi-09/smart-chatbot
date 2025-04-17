const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'chatbot-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function sendChatEvent(userMessage, botReply) {
  await producer.connect();

  await producer.send({
    topic: 'chat-messages',
    messages: [
      {
        key: 'chat',
        value: JSON.stringify({ userMessage, botReply, timestamp: Date.now() })
      }
    ]
  });

  await producer.disconnect();
}

module.exports = { sendChatEvent };
