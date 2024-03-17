import { useState, useEffect } from 'react';
import './ChatApp.css';
import React, { useRef } from "react";
import SheSafeBotIcon from '../img/bot.jpeg';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { chatbotapibot } from '../apis/bot';
import { triggerAnswers } from '../apis/triggeranswers';

const API_KEY = process.env.OPEN_API_KEY;

const Chatbot = () => {
  const scroll = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm the She`s Safe Bot! Ask me anything related!",
      sentTime: "just now",
      sender: "SheSafeBot",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isBadQuestion, setisBadQuestion] = useState(false); // New state variable

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }
  
    const userMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };
  
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage('');
    scroll.current.scrollIntoView({ behavior: "smooth" });
  
    const isBadQuestion = checkIfBadQuestion(message);
    setisBadQuestion(isBadQuestion);
  
    if (!isBadQuestion) {
      setIsTyping(true);
  
      try {
        const trainmessage = "You are a bot called SheSafe, that answers questions on Security information in the area mentioned. Kindly note that we are in Kenya. Understand the following and reply appropriately :" + message;
        triggerAnswers(trainmessage).then((response) => {
          setIsTyping(false);
          if (response && response !== "Text not available") {
            const chatGPTResponse = {
              message: response,
              sender: 'SheSafeBot',
            };
            setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
          } else {
            const errorMessage = {
              message: "Sorry, I cannot process your message due to safety concerns. Please try again with a different query.",
              direction: 'incoming',
              sender: 'SheSafeBot',
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
          }
        });
      } catch (error) {
        console.error('Error:', error);
        setIsTyping(false);
      }
    } else {
      const denialMessage = {
        message: "I'm sorry, but I'm programmed to answer only questions with no bad words in it.",
        direction: 'incoming',
        sender: 'SheSafeBot',
      };
  
      setMessages((prevMessages) => [...prevMessages, denialMessage]);
      setIsTyping(false);
    }
  };
    
  const checkIfBadQuestion = (message) => {
    const badKeywords = [
      'damn', 'fuck', 'stupid', 'bastard', 'fool', 'idiot', 'asshole', 'shit',
      'bullshit', 'dick', 'cock', 'pussy', 'cunt', 'ass', 'bitch', 'motherfucker',
      'whore', 'slut', 'prick', 'wanker', 'arsehole', 'jackass', 'douchebag',
      'twat', 'douche', 'son of a bitch', 'bloody hell', 'crap', 'arse', 'fanny',
      'screw you', 'screw off', 'go to hell', 'bugger off', 'sod off', 'wank', 
      'piss off', 'fuck off', 'fudge', 'eff off', 'eff you', 'effing', 'freaking', 
      'frigging', 'frick', 'frack', 'dagnabbit', 'goddamn', 'daggonit'
    ];
    return badKeywords.some((keyword) => message.toLowerCase().includes(keyword));
  }; 

  return (
  <div className="Chatbot">
    {isMobile ? (
      <div className="mobile-chat-container">
        <div className="messages-wrapper">
          {messages?.map((message, index) => (
            <div className={`chat-bubble ${message.sender === 'user' ? "right" : ""}`} key={index}>
              {message.sender !== 'user' && (
                <img
                  className="chat-bubble__left"
                  src={SheSafeBotIcon}
                  alt="SheSafeBot avatar"
                />
              )}
              <div className="chat-bubble__right">
                {message.sender !== 'user' && (
                  <p className="user-name">{message.sender}</p>
                )}
                <p className="user-message">{message.message}</p>
              </div>
              {message.sender === 'user' && <div className="message-divider"></div>}
            </div>
          ))}
        </div>
        <span ref={scroll}></span>
        <div className="send-message">
          <input
            id="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} type="button">Send</button>
        </div>
      </div>
    ) : (
      <div className="desktop-chat-container">
        <div className="messages-wrapper">
          {messages?.map((message, index) => (
            <div className={`chat-bubble ${message.sender === 'user' ? "right" : ""}`} key={index}>
              {message.sender !== 'user' && (
                <img
                  className="chat-bubble__left"
                  src={SheSafeBotIcon}
                  alt="SheSafeBot avatar"
                />
              )}
              <div className="chat-bubble__right">
                {message.sender !== 'user' && (
                  <p className="user-name">{message.sender}</p>
                )}
                <p className="user-message">{message.message}</p>
              </div>
              {message.sender === 'user' && <div className="message-divider"></div>}
            </div>
          ))}
        </div>
        <span ref={scroll}></span>
        <div className="send-message">
          <input
            id="messageInput"
            type="text"
            className="form-input__input"
            placeholder="type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage} type="button">Send</button>
        </div>
      </div>
    )}

    {isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'SheSafeBot' && (
      <p>Loading...</p>
    )}
  </div>
);
}

export default Chatbot;