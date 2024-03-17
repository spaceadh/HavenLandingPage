import { useState, useEffect } from 'react';
import './ChatApp.css';
import React, { useRef } from "react";
import RachelAIIcon from '../img/bot.jpeg';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { chatbotapibot } from '../apis/bot';
import { triggerAnswers } from '../apis/triggeranswers';

const Chatbot = () => {
  const scroll = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Rachel AI ! Ask me anything related to mental health !",
      sentTime: "just now",
      sender: "RachelAI",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMedicalQuestion, setMedicalQuestion] = useState(false); // New state variable
  const [userMessages, setUserMessages] = useState([]);
  const [botResponses, setBotResponses] = useState([]);

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
    console.log(userMessages);
    setUserMessages((prevUserMessages) => [...prevUserMessages, message]);
    setMessage('');
    scroll.current.scrollIntoView({ behavior: "smooth" });

    const isMedicalQuestion = checkIfBadQuestion(message);
    setMedicalQuestion(isMedicalQuestion);
  
    if (!isMedicalQuestion) {
      setIsTyping(true);
  
      try {
        // // Sort user messages and bot responses by timestamp
        // userMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        // botResponses.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        // // Interleave user messages and bot responses in chronological order
        // const interleavedMessages = [];
        // let userIndex = 0;
        // let botIndex = 0;

        // while (userIndex < userMessages.length || botIndex < botResponses.length) {
        //     if (userIndex < userMessages.length && userMessages[userIndex].timestamp <= botResponses[botIndex]?.timestamp) {
        //         interleavedMessages.push(`User: ${userMessages[userIndex].message}`);
        //         userIndex++;
        //     } else if (botIndex < botResponses.length) {
        //         interleavedMessages.push(`RachelAI: ${botResponses[botIndex].response}`);
        //         botIndex++;
        //     }
        // }

        // // Join interleaved messages into training data
        // const trainingData = interleavedMessages.join(' ');
        const userTrainingData = userMessages.map(message => `User: ${message}.`).join(' ');
        const botTrainingData = botResponses.map(response => `RachelAI: ${response}.`).join(' ');
        const trainingData = `${userTrainingData} ${botTrainingData}`
        
        console.log(trainingData);
        const train = "You are a bot called RachelAI, you`re a bot that is trained to answer questions on Mental health. You`re supposed to be caring, friendly, and most importantly maintain a human connection. Kindly note that we are in Kenya. Respond to the latest user message only, while using previous communications to get context. If there is no previous communication i.e its the first message, just respond to the message.Understand the following previous communications and reply appropriately, with sympathy , understanding in a friendly nature : '"+ trainingData +" '";
        console.log(train);
        triggerAnswers(train).then((response) => {
          setIsTyping(false);
          if (response && response !== "Text not available") {
            const chatGPTResponse = {
              message: response,
              sender: 'RachelAI',
            };
            // setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
            setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
            setBotResponses((prevBotResponses) => [...prevBotResponses, response]);
          } else {
            const errorMessage = {
              message: "Sorry, I cannot process your message due to safety concerns. Please try again with a different query.",
              direction: 'incoming',
              sender: 'RachelAI',
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
        sender: 'RachelAI',
      };
  
      setMessages((prevMessages) => [...prevMessages, denialMessage]);
      setIsTyping(false);
    }
  }; 
  
  // const checkIfBadQuestion = (message) => {
  //   const medicalKeywords = [
  //     'health','medical','symptoms','doctor','treatment','mental health','psychiatrist',
  //     'counseling','therapy','depression','anxiety','stress',
  //     'mental disorder','psychological','emotional well-being','suicidal','self-harm',
  //     'PTSD','OCD','bipolar','schizophrenia','panic attack','trauma','ADD',
  //     'ADHD','eating disorder','phobia','stress management','mindfulness','substance abuse',
  //     'psychiatric','psychological assessment',"mental","health","psychiatrist","counseling","therapy","sick",
  //     "sad","depressed","anxious","stressed","mental disorder","psychological","emotional well-being",
  //     'cognitive therapy','mind-body connection','positive psychology','resilience','self-esteem','social anxiety', 
  //     'sleep disorder','anger management','behavioral health','grief counseling','family therapy',"mental health","broken",
  //     "broken heart","broke","heart",
  //     'group therapy','medication management','rehabilitation','recovery','wellness','mental health support',
  //     'mental health awareness'
  //   ];
  
  //   return medicalKeywords.some((keyword) => message.toLowerCase().includes(keyword));
  // }; 
  const checkIfBadQuestion = (message) => {
    const medicalKeywords = [
      'damn', 'fuck', 'bastard', 'fool', 'idiot', 'asshole', 'shit',
      'bullshit', 'dick', 'cock', 'pussy', 'cunt', 'ass', 'bitch', 'motherfucker',
      'whore', 'slut', 'prick', 'wanker', 'arsehole', 'jackass', 'douchebag',
      'twat', 'douche', 'son of a bitch', 'bloody hell', 'crap', 'arse', 'fanny',
      'screw you', 'screw off', 'go to hell', 'bugger off', 'sod off', 'wank', 
      'piss off', 'fuck off', 'fudge', 'eff off', 'eff you', 'effing', 'freaking', 
      'frigging', 'frick', 'frack', 'dagnabbit', 'goddamn', 'daggonit'
    ];
  
    return medicalKeywords.some((keyword) => message.toLowerCase().includes(keyword));
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
                  src={RachelAIIcon}
                  alt="RachelAI avatar"
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
                  src={RachelAIIcon}
                  alt="RachelAI avatar"
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

    {isTyping && messages.length > 0 && messages[messages.length - 1].sender === 'RachelAI' && (
      <p>Loading...</p>
    )}
  </div>
);
}

export default Chatbot;