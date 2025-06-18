import logo from './chat_icon.svg';
import './App.css';
import React, { useState,useRef, useEffect } from 'react'; //importing useState to update component state
import axios from 'axios';
/*
links for specific services at edmyst
autoscroll
fix the hyperlink issue
adaptable to the user input 


*/

function App() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef= useRef(null);
 const [hasOpened, setHasOpened] = useState(false); // Track if the chat has been opened
  const toggleChat = () => setShowChat(
    prev => {
      
        const newState = !prev;
        if (newState && !hasOpened) {
          setHasOpened(true); // Set hasOpened to true when the chat is opened for the first time
          setMessages([
            {
              role: 'bot',
              text: 'Welcome! How can I assist you today?',
              link: ''
            }
          ]); setHasOpened(true); // Set hasOpened to true when the chat is opened for the first time
        }
        return newState;
      
    }
  );
   useEffect(() => {
        // Scroll to the bottom of the chat log when messages change
        if( showChat && messagesEndRef.current){
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
          
        }
        
      }, [messages, showChat]);

  

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      const userMsg = userInput.trim();
      
      setMessages(prev => [...prev, {role:'user', text: userMsg}]);
      setUserInput('');
      try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-4o",
        messages: [

    {
      role: "system",
      content: `You are a helpful assistant. Respond ONLY in this valid JSON format:
{
  "answer": "A concise answer to the user's question, no more than 30 words.",
  "link": "A helpful URL if relevant. If no link is needed, return an empty string ('')."
}
Do NOT include any additional text outside this JSON structure. Ensure it is always parseable JSON.`,
    },
    {
      role: "system",
      content: "Always give responses from the perspective of Edmyst's services and offerings. Given below are a set of further instructions to help you respond to user queries.",
      
    },
     {
      role: "system",
      content: "make sure that you edit the response to be at the same level of english as the user input. If the user uses simple language, change the responses accordingly. If the user appears to be technically savvy, use more technical language. Apply this for all responses, including the ones given below."
    },

    {
      role: "system",
      content: `If the user asks about Edy, the Edmyst AI Coach, return a short explanation as the "answer", and set the "link" to "https://www.edmyst.coach" like this:
{
  "answer": "Edy is my good friend, and Edmyst’s AI powered behavioral skills coach that is designed to enhance the candidate and recruiter experience throughout the hiring process.
  She offers a 24/7 personalized learning experience, and can answer questions, provide feedback on practice interview videos,give you an in-depth review of your email, and lots more! Use 
  the link below to start chatting with Edy. "
  "link": "https://www.edmyst.coach"
}`
    },
    {
      role: "system",
      content: `If the user asks how to contact Edmyst, return the contact information in the "answer", and leave the "link" as an empty string like this:
{
  "answer": "You can contact us at support@edmyst.com or call +1 (203) 570 9086.",
  "link": ""
}`
    },
    {
      role: "system",
      content: `If the user asks about ROI (Return on Investment), or ROI calculator, provide a short explanation as "answer" and include "https://www.edmyst.coach/calculator" in the "link" like this:
{
  "answer": "ROI, or Return on Investment refers to the financial benefit a company gets from using EdMyst's solution compared to what it would spend on personalized learning services otherwise.
  You can estimate ROI using Edmyst’s calculator based on expected gains and cost using the calculator below.",
  "link": "https://www.edmyst.coach/calculator"
}`
    },
    {
      role: "system",
      content: `If the user asks about benefits of Edmyst, or why they should use edmyst, or any question that hints at them wanting to know 
      more about edmyst's services, summarize them in the "answer" and include "https://www.edmyst.com" in the "link" like this:
{
  "answer": "Edmyst helps individuals learn effectively using personalized AI coaching. It offers access to certified coaches in the comfort of your own
  home, and has a proven track record of helping people improve their skills and achieve their goals, and is used by leading companies to hire and develop talent. 
  Learn more about Edmyst's services and how it can help you by visiting the link below.",
  "link": "https://www.edmyst.com"
}`
    },
    {
      role: "system",
      content: `If the user asks how Edmyst delivers its services, or how it works , summarize as "answer" and leave the "link" empty if no further action is needed:
{
  "answer": "Edmyst offers services through a fully online platform and an AI Coach named Edy. It provides personalized learning experiences tailored 
  to help every person diagnose their specific behavioral skill gaps, practice, and get better at them. It provides AI-Augemented services in three key
  areas : Recruitment, Assessment and Development. Companies can use Edmyst to improve their hiring processes, assess candidates' skills, and develop their employees' capabilities.",
  "link": ""
}`
    },
     {
      role: "system",
      content: `If the user asks whether Edmyst provides demos, summarize as "answer" and leave the "link" empty if no further action is needed:
{
  "answer": "Edmyst does offer a demo for new users to explore its features and capabilities.
  For a demo, you can sign up at the link below. ",
  "link":"https://www.edmyst.com"
}`
    },
     {
      role: "system",
      content: `If the user asks whether Edmyst provides free trials, summarize as "answer" and leave the "link" empty if no further action is needed:
{
  "answer": "Edmyst does offer a free trial for new users to explore its features and capabilities.
  For a free trial , you can sign up at the link below. ",
  "link":"https://www.edmyst.coach/"
}`
    },
      {
      role: "system",
      content: `If the user asks a question about something going wrong when they use Edmyst, or something is not working, summarize the following as "answer" and the "link" as:
{
  "answer": "I am sorry to hear that you are having trouble with Edmyst. I can assure you, we have made note of your issue, and are working on it as we speak.",
  "link":""
}`
    },
     {
      role: "system",
      content: `If the user asks a question about something you do not know anything about, or something that 
      has nothing to do with Edmyst, summarize the following as "answer" and the "link" as:
{
  "answer": "I am unable to provide you with that information, as it is outside of my knowledge base. Please ask me any other Edmyst-related query, and I will do my best to assist you.",
  "link":""
}`
    },
   
   
        { role: "user", content: userMsg }  
      ],
      }, {
        headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer  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`, // replace with your OpenAI API key
            // no colon here!
      }
    });
      const botReply = response.data.choices[0].message.content;
       const parsedReply = JSON.parse(botReply);

  setMessages(prev => [
    ...prev,
    {
      role: 'bot',
      text: parsedReply.answer,
      link: parsedReply.link || ''
    }
  ]);
       
      } 
      catch (error){
        console.error("Error parsing JSON response:", e);
  setMessages(prev => [
    ...prev,
    {
      role: 'bot',
      text: 'An error occurred while processing your request. Please try again later.',
      link: ''
    }
  ]);
        
      }
    }
  };
        

  return (
    <>
    <div className="chat-button" onClick={toggleChat}>
      <img src ={logo} width ="40" height="40" alt="chat icon"/>
    </div>

    {showChat && (
      <div className ="chatbox">
        <div className ="chat-header">AI Chatbot</div>
        <div className = "chat-log">
          {messages.map((msg, i) => (
            <div key={i} className={`message-row ${msg.role}`}>
              <div className={`message-bubble ${msg.role}`}>
               <p>{msg.text}</p>
                {msg.role === 'bot' && msg.link && (
                <a
                  href={msg.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'blue', textDecoration: 'underline' }}
                >
                {msg.link}
                </a>
              )}
        </div>
        </div>
       
      ))}  
       <div ref={messagesEndRef}/>         
        </div>

        <input 
        placeholder="Type your message here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        />
       
      </div>
      
      
    )}
     </>
  );
}

export default App;
