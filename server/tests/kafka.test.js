const { sendChatEvent } = require('../services/kafka');

jest.mock('../services/kafka', () => ({
  sendChatEvent: jest.fn()
}));

describe('Kafka Logger', () => {
  it('should call sendChatEvent with user and bot messages', async () => {
    const userMessage = 'Hi there!';
    const botReply = 'Hello!';

    await sendChatEvent(userMessage, botReply);

    expect(sendChatEvent).toHaveBeenCalledWith(userMessage, botReply);
  });
});
