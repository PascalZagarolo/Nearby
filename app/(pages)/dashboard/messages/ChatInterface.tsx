'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FiSend, FiPaperclip, FiMoreVertical, FiClock, FiCheck, FiCheckCircle } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isFromMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  otherUser: User;
  serviceName: string;
}

interface ChatInterfaceProps {
  conversation: Conversation;
  messages: Message[];
}

export default function ChatInterface({ conversation, messages: initialMessages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages on load and when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    const newMessageObj: Message = {
      id: `m${messages.length + 1}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFromMe: true,
      status: 'sent'
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    
    // Simulate message delivered status after 1 second
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessageObj.id ? { ...msg, status: 'delivered' } : msg
        )
      );
      
      // Simulate message read status after 2 more seconds
      setTimeout(() => {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === newMessageObj.id ? { ...msg, status: 'read' } : msg
          )
        );
      }, 2000);
    }, 1000);
  };
  
  // Function to render message status icon
  const renderMessageStatus = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <FiClock className="text-gray-400" size={14} />;
      case 'delivered':
        return <FiCheck className="text-gray-400" size={14} />;
      case 'read':
        return <FiCheckCircle className="text-blue-500" size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative mr-3">
            <Image
              className="h-10 w-10 rounded-full object-cover"
              src={conversation.otherUser.avatar}
              alt={conversation.otherUser.name}
              width={40}
              height={40}
            />
            {conversation.otherUser.isOnline && (
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400" />
            )}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              {conversation.otherUser.name}
            </h2>
            <p className="text-xs text-gray-500">
              {conversation.otherUser.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <FiMoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {/* Service information at the top */}
          <div className="text-center">
            <div className="inline-block bg-gray-200 rounded-lg px-4 py-2">
              <p className="text-xs text-gray-700">
                Konversation zu: <span className="font-medium">{conversation.serviceName}</span>
              </p>
            </div>
          </div>
          
          {/* Messages */}
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                  message.isFromMe 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`text-xs mt-1 flex justify-end items-center ${
                  message.isFromMe ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  <span>{message.time}</span>
                  {message.isFromMe && (
                    <span className="ml-1">
                      {renderMessageStatus(message.status)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button 
            type="button" 
            className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2"
          >
            <FiPaperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Nachricht schreiben..."
            className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button 
            type="submit" 
            className="ml-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={newMessage.trim() === ''}
          >
            <FiSend className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
} 