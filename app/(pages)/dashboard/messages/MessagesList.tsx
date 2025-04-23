'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface Message {
  text: string;
  time: string;
  isRead: boolean;
  isFromMe: boolean;
}

interface Conversation {
  id: string;
  otherUser: User;
  lastMessage: Message;
  unreadCount: number;
  serviceName: string;
}

interface MessagesListProps {
  conversations: Conversation[];
  activeConversationId: string;
}

export default function MessagesList({ conversations, activeConversationId }: MessagesListProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredConversations = searchTerm
    ? conversations.filter(
        conversation => 
          conversation.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conversation.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : conversations;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Nachrichten suchen..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Keine Konversationen gefunden
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredConversations.map((conversation) => (
              <li key={conversation.id}>
                <Link 
                  href={`/dashboard/messages?conversation=${conversation.id}`}
                  className={`block hover:bg-gray-50 ${
                    activeConversationId === conversation.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="px-4 py-4 flex">
                    <div className="relative mr-4 flex-shrink-0">
                      <Image
                        className="h-12 w-12 rounded-full object-cover"
                        src={conversation.otherUser.avatar}
                        alt={conversation.otherUser.name}
                        width={48}
                        height={48}
                      />
                      {conversation.otherUser.isOnline && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-gray-900 truncate">
                          {conversation.otherUser.name}
                        </h2>
                        <div className="text-xs text-gray-500">
                          {conversation.lastMessage.time}
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className={`text-sm ${
                          conversation.unreadCount > 0 
                            ? 'font-semibold text-gray-900' 
                            : 'text-gray-500'
                        } truncate`}>
                          {conversation.lastMessage.isFromMe ? 'Sie: ' : ''}
                          {conversation.lastMessage.text}
                        </p>
                      </div>
                      <div className="mt-1 text-xs text-gray-500 truncate">
                        {conversation.serviceName}
                      </div>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="ml-2 flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-xs font-medium text-white">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 