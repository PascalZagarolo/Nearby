'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiStar, FiMapPin, FiCalendar, FiClock, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';
import ServiceCard from '../../../components/ServiceCard';

// Mock-Daten für das Benutzerprofil
const userProfile = {
  id: 'user1',
  name: 'Alexander Müller',
  avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
  coverImage: 'https://images.unsplash.com/photo-1567498952889-4783d81a3aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  title: 'Meistertischler',
  bio: 'Erfahrener Tischlermeister mit über 15 Jahren Berufserfahrung. Spezialisiert auf maßgefertigte Möbel, Einbauschränke und Holzarbeiten aller Art. Ich glaube daran, qualitativ hochwertige Stücke zu schaffen, die nicht nur gut aussehen, sondern auch Generationen überdauern.',
  location: 'München, BY',
  memberSince: 'Januar 2018',
  responseTime: '1 Stunde',
  lastDelivery: 'vor 1 Tag',
  languages: ['Deutsch', 'Englisch'],
  education: [
    {
      title: 'Meister im Tischlerhandwerk',
      institution: 'Handwerkskammer München',
      year: '2005-2007',
    },
  ],
  certifications: [
    {
      title: 'Zertifizierter Restaurator im Handwerk',
      issuer: 'Handwerkskammer',
      year: '2010',
    },
    {
      title: 'Sachverständiger für Holz und Möbel',
      issuer: 'IHK München',
      year: '2015',
    },
  ],
  skills: ['Möbelbau', 'Restaurierung', 'Holzschnitzerei', 'Intarsienarbeit', 'Furnierarbeiten', 'CAD-Design', 'CNC-Bearbeitung'],
  stats: {
    rating: 4.9,
    reviews: 253,
    completedProjects: 324,
    onTime: 99,
    onBudget: 98,
  },
  services: [
    {
      id: '1',
      title: 'Professionelle Tischlerarbeiten',
      description: 'Ich fertige hochwertige Möbel und Holzelemente nach Maß an',
      price: 85,
      rating: 4.9,
      reviews: 253,
      location: 'München, BY',
      category: 'Tischlerei',
      image: 'https://images.unsplash.com/photo-1588854337127-a1c3e5f19535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      seller: {
        id: 'user1',
        name: 'Alexander Müller',
        avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
      },
    },
    {
      id: '3',
      title: 'Restaurierung antiker Möbel',
      description: 'Fachgerechte Restaurierung und Aufarbeitung von antiken und alten Möbelstücken',
      price: 250,
      rating: 4.8,
      reviews: 118,
      location: 'München, BY',
      category: 'Restaurierung',
      image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80',
      seller: {
        id: 'user1',
        name: 'Alexander Müller',
        avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
      },
    },
    {
      id: '4',
      title: 'Holzschnitzereien und Intarsienarbeiten',
      description: 'Kunstvolle Holzschnitzereien und Intarsienarbeiten für besondere Projekte',
      price: 120,
      rating: 4.7,
      reviews: 96,
      location: 'München, BY',
      category: 'Kunsthandwerk',
      image: 'https://images.unsplash.com/photo-1544733422-251bdc27c4b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      seller: {
        id: 'user1',
        name: 'Alexander Müller',
        avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
      },
    },
  ],
  reviews: [
    {
      id: 'rev1',
      user: {
        name: 'Sarah Weber',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
      },
      rating: 5,
      date: '15.04.2023',
      service: 'Tischlerarbeiten',
      comment: 'Herr Müller hat fantastische Arbeit geleistet! Unser neuer Esstisch ist ein wahres Kunstwerk. Die Kommunikation war hervorragend und der Zeitplan wurde perfekt eingehalten.',
    },
    {
      id: 'rev2',
      user: {
        name: 'Michael Becker',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
      },
      rating: 4,
      date: '22.03.2023',
      service: 'Restaurierung antiker Möbel',
      comment: 'Tolle Arbeit bei der Restaurierung unseres Erbstücks. Der Prozess verlief reibungslos und Herr Müller setzte unser Feedback sehr gut um. Empfehlenswert für alle, die qualitativ hochwertige Handwerksarbeit suchen.',
    },
  ],
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('services');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full">
        <Image
          src={userProfile.coverImage}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 mt-8">
          <div className="p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
                <p className="text-gray-600 mb-2">{userProfile.title}</p>
                <div className="flex items-center justify-center sm:justify-start text-yellow-500">
                  <FiStar className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{userProfile.stats.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({userProfile.stats.reviews} Bewertungen)</span>
                </div>
                
                <div className="mt-4 sm:hidden">
                  <button className="bg-rose-500 text-white px-6 py-2 rounded-md font-medium hover:bg-rose-600 transition-colors w-full">
                    Kontaktieren
                  </button>
                </div>
              </div>
              
              <div className="hidden sm:block">
                <button className="bg-rose-500 text-white px-6 py-2 rounded-md font-medium hover:bg-rose-600 transition-colors">
                  Kontaktieren
                </button>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center text-gray-600">
                <FiMapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>{userProfile.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiCalendar className="h-5 w-5 mr-2 text-gray-500" />
                <span>Mitglied seit {userProfile.memberSince}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiClock className="h-5 w-5 mr-2 text-gray-500" />
                <span>Antwortet in {userProfile.responseTime}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiMessageSquare className="h-5 w-5 mr-2 text-gray-500" />
                <span>Letzte Lieferung {userProfile.lastDelivery}</span>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'services'
                    ? 'text-rose-600 border-b-2 border-rose-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('services')}
              >
                Dienstleistungen
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'about'
                    ? 'text-rose-600 border-b-2 border-rose-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('about')}
              >
                Über mich
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'text-rose-600 border-b-2 border-rose-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Bewertungen
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'services' && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Meine Dienstleistungen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProfile.services.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Über mich</h2>
            <p className="text-gray-700 mb-6">{userProfile.bio}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Fähigkeiten</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {userProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sprachen</h3>
                <ul className="list-disc list-inside text-gray-700 mb-6">
                  {userProfile.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ausbildung</h3>
                <div className="space-y-3 mb-6">
                  {userProfile.education.map((item, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.institution}</p>
                      <p className="text-sm text-gray-500">{item.year}</p>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Zertifizierungen</h3>
                <div className="space-y-3 mb-6">
                  {userProfile.certifications.map((cert, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900">{cert.title}</h4>
                      <p className="text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">{cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Statistiken</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-gray-900">{userProfile.stats.completedProjects}</span>
                  <span className="text-gray-600">Abgeschlossene Projekte</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-gray-900">{userProfile.stats.onTime}%</span>
                  <span className="text-gray-600">Termingerechte Lieferung</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-gray-900">{userProfile.stats.onBudget}%</span>
                  <span className="text-gray-600">Im Budget</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-gray-900">{userProfile.stats.rating}</span>
                  <span className="text-gray-600">Bewertung</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Bewertungen</h2>
              <div className="flex items-center text-yellow-500">
                <FiStar className="h-5 w-5 fill-current" />
                <span className="ml-1 font-medium text-lg">{userProfile.stats.rating}</span>
                <span className="text-gray-500 ml-1">({userProfile.stats.reviews} Bewertungen)</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {userProfile.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden relative mr-3">
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                      <div className="flex items-center">
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">Dienstleistung: </span>
                    <span className="text-sm font-medium text-gray-700">{review.service}</span>
                  </div>
                  
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-rose-600 font-medium hover:text-rose-700">
                Alle Bewertungen ansehen →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 