const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'chatbot-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'chat-logger' });

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'chat-messages', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const parsed = JSON.parse(message.value.toString());
      console.log(`📥 [Kafka] ${new Date(parsed.timestamp).toLocaleString()} — 👤 ${parsed.userMessage} → 🤖 ${parsed.botReply}`);
    }
  });
}

runConsumer().catch(console.error);
