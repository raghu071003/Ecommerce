import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async (text) => {
    setMessages([...messages, { text, from: 'user' }]);
    const response = await axios.post('https://api.dialogflow.com/v1/query', {
      query: text,
      lang: 'en',
      sessionId: '12345',
      queryInput: {
        text: { text, languageCode: 'en' }
      }
    }, {
      headers: { Authorization: `Bearer <your-dialogflow-token>` }
    });

    const botMessage = response.data.result.fulfillment.speech;
    setMessages([...messages, { text, from: 'user' }, { text: botMessage, from: 'bot' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.from}`}>{msg.text}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
