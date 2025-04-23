import React from 'react';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import ChatInterface from './ChatInterface';
import MessagesList from './MessagesList';
import EmptyConversation from './EmptyConversation';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    otherUser: {
      id: 'user1',
      name: 'Thomas Mueller',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      isOnline: true
    },
    lastMessage: {
      text: 'Wie ist der aktuelle Status meines Auftrags?',
      time: '10:32',
      isRead: false,
      isFromMe: false
    },
    unreadCount: 2,
    serviceName: 'Gartenarbeit - Rasen mähen'
  },
  {
    id: '2',
    otherUser: {
      id: 'user2',
      name: 'Anna Schmidt',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      isOnline: false
    },
    lastMessage: {
      text: 'Vielen Dank für die schnelle Lieferung! Alles gut angekommen.',
      time: 'Gestern',
      isRead: true,
      isFromMe: false
    },
    unreadCount: 0,
    serviceName: 'Möbel Transportdienst'
  },
  {
    id: '3',
    otherUser: {
      id: 'user3',
      name: 'Michael Wagner',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      isOnline: true
    },
    lastMessage: {
      text: 'Ich kann Ihnen einen Rabatt von 10% anbieten wenn Sie bis morgen buchen.',
      time: 'Gestern',
      isRead: true,
      isFromMe: true
    },
    unreadCount: 0,
    serviceName: 'IT Support & Beratung'
  }
];

// Mock messages for each conversation
const mockConversationMessages = {
  '1': [
    {
      id: 'm1',
      text: 'Hallo, ich interessiere mich für Ihren Gartenarbeitsservice.',
      time: '10:20',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm2',
      text: 'Guten Tag! Vielen Dank für Ihr Interesse. Wie kann ich Ihnen helfen?',
      time: '10:24',
      isFromMe: true,
      status: 'read'
    },
    {
      id: 'm3',
      text: 'Ich bräuchte jemanden, der regelmäßig meinen Rasen mäht. Ist das möglich?',
      time: '10:26',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm4',
      text: 'Selbstverständlich! Wir bieten wöchentliche, zweiwöchentliche oder monatliche Rasenpflege an. Wie groß ist Ihr Garten?',
      time: '10:28',
      isFromMe: true,
      status: 'read'
    },
    {
      id: 'm5',
      text: 'Mein Garten ist etwa 200 Quadratmeter groß.',
      time: '10:30',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm6',
      text: 'Wie ist der aktuelle Status meines Auftrags?',
      time: '10:32',
      isFromMe: false,
      status: 'delivered'
    }
  ],
  '2': [
    {
      id: 'm1',
      text: 'Guten Tag, ich benötige einen Transportservice für einen Umzug am nächsten Wochenende.',
      time: '15:42',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm2',
      text: 'Hallo! Ich kann Ihnen definitiv beim Transport helfen. Wie viele Möbelstücke müssten transportiert werden?',
      time: '15:45',
      isFromMe: true,
      status: 'read'
    },
    {
      id: 'm3',
      text: 'Es handelt sich um ein Sofa, einen Esstisch, vier Stühle und zwei Schränke.',
      time: '15:50',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm4',
      text: 'Verstanden. Und wie weit ist die Entfernung zwischen Start und Zielort?',
      time: '15:52',
      isFromMe: true,
      status: 'read'
    },
    {
      id: 'm5',
      text: 'Etwa 15 Kilometer innerhalb der Stadt.',
      time: '15:55',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm6',
      text: 'Vielen Dank für die schnelle Lieferung! Alles gut angekommen.',
      time: 'Gestern',
      isFromMe: false,
      status: 'read'
    }
  ],
  '3': [
    {
      id: 'm1',
      text: 'Ich habe Probleme mit meinem Computer. Könnten Sie mir helfen?',
      time: '11:20',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm2',
      text: 'Natürlich! Welche Art von Problemen treten auf?',
      time: '11:25',
      isFromMe: true,
      status: 'read'
    },
    {
      id: 'm3',
      text: 'Mein Computer stürzt ständig ab und ist extrem langsam.',
      time: '11:30',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm4',
      text: 'Das klingt nach einem möglichen Speicher- oder Festplattenproblem. Ich könnte vorbeikommen und das überprüfen.',
      time: '11:32',
      isFromMe: true,
      status: 'read'
    },
    {
      id: 'm5',
      text: 'Das wäre großartig. Wann könnten Sie vorbeikommen?',
      time: '11:35',
      isFromMe: false,
      status: 'read'
    },
    {
      id: 'm6',
      text: 'Ich kann Ihnen einen Rabatt von 10% anbieten wenn Sie bis morgen buchen.',
      time: 'Gestern',
      isFromMe: true, 
      status: 'read'
    }
  ]
};

export default async function MessagesPage({ 
  searchParams 
}: { 
  searchParams: { conversation?: string } 
}) {
  const user = await getCurrentUser();
  
  if (!user) {
    return redirect('/auth/signin');
  }

  // Get the active conversation from URL params
  const activeConversationId = searchParams.conversation || '';
  const activeConversation = activeConversationId 
    ? mockConversations.find(conversation => conversation.id === activeConversationId)
    : null;

  // Get messages for the active conversation
  const activeMessages = activeConversationId 
    ? mockConversationMessages[activeConversationId as keyof typeof mockConversationMessages] || []
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nachrichten</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex h-[calc(80vh-10rem)]">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <MessagesList 
              conversations={mockConversations} 
              activeConversationId={activeConversationId} 
            />
          </div>
          
          {/* Chat Area */}
          <div className="w-2/3 flex flex-col">
            {activeConversation ? (
              <ChatInterface 
                conversation={activeConversation} 
                messages={activeMessages} 
              />
            ) : (
              <EmptyConversation />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 