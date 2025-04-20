'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiStar, FiMapPin, FiShoppingCart, FiMessageSquare, FiHeart, FiCheck, FiX } from 'react-icons/fi';

// Mock data (in einer echten App würde dies von einer API abgerufen werden)
const service = {
  id: '1',
  title: 'Professionelle Tischlerarbeiten',
  description: 'Ich fertige hochwertige Möbel und Holzelemente nach Maß an. Mit jahrelanger Erfahrung garantiere ich Ihnen ein einzigartiges Handwerksstück, das perfekt zu Ihren Anforderungen und Ihrem Wohnstil passt.',
  price: 85,
  rating: 4.9,
  reviews: 253,
  location: 'München, BY',
  category: 'Tischlerei',
  image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1764&q=80',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
  ],
  seller: {
    id: 'user1',
    name: 'Alexander Müller',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    title: 'Meistertischler',
    bio: 'Erfahrener Tischlermeister mit über 15 Jahren Berufserfahrung. Spezialisiert auf maßgefertigte Möbel, Einbauschränke und Holzarbeiten aller Art.',
    memberSince: 'Januar 2018',
    responseTime: '1 Stunde',
    languages: ['Deutsch', 'Englisch'],
    skills: ['Möbelbau', 'Restaurierung', 'Holzschnitzerei', 'Intarsienarbeit'],
  },
  packages: [
    {
      id: 'basic',
      name: 'Basis',
      description: 'Einfache Holzarbeiten mit grundlegender Beratung',
      deliveryTime: 5, // Tage
      revisions: 2,
      price: 85,
      features: [
        'Kostenvoranschlag',
        'Telefonische Beratung',
        'Standard-Materialien',
        'Lieferung im Umkreis von 20km',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Maßgefertigte Holzarbeiten mit Beratung vor Ort',
      deliveryTime: 10, // Tage
      revisions: 3,
      price: 150,
      features: [
        'Persönliche Beratung vor Ort',
        'Detaillierte Entwürfe',
        'Premium-Materialien',
        'Spezielle Oberflächenbehandlung',
        'Kostenlose Lieferung im Umkreis von 50km',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Exklusive Maßanfertigungen mit Premiumservice',
      deliveryTime: 15, // Tage
      revisions: 'Unbegrenzt',
      price: 300,
      features: [
        'Umfassende Beratung vor Ort',
        '3D-Visualisierung der Entwürfe',
        'Exklusive Hölzer und Materialien',
        'Individuelle Oberflächenbehandlung',
        'Montage und Installation',
        '3 Jahre Garantie',
        'Landesweite Lieferung',
        'Prioritäts-Support',
      ],
    },
  ],
  reviewsData: [
    {
      id: 'rev1',
      user: {
        name: 'Sarah Weber',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
      },
      rating: 5,
      date: '15.04.2023',
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
      comment: 'Tolle Arbeit bei unserem Einbauschrank. Der Prozess verlief reibungslos und Herr Müller setzte unser Feedback sehr gut um. Empfehlenswert für alle, die qualitativ hochwertige Handwerksarbeit suchen.',
    },
    {
      id: 'rev3',
      user: {
        name: 'Emily Schmidt',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
      },
      rating: 5,
      date: '10.02.2023',
      comment: 'Außergewöhnlicher Service! Herr Müller hat eine wunderschöne Kommode für unser Wohnzimmer gefertigt. Das Stück passt perfekt in unseren Raum und die Verarbeitung ist erstklassig. Absolut empfehlenswert!',
    },
  ],
};

export default function ServiceDetail({ params }: { params: { id: string } }) {
  const [selectedPackage, setSelectedPackage] = useState(service.packages[1]); // Standard-Paket als Standard
  const [activeImage, setActiveImage] = useState(service.image);
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-4">
          <ul className="flex items-center space-x-1 text-gray-500">
            <li><Link href="/" className="hover:text-gray-700">Startseite</Link></li>
            <li className="mx-1">/</li>
            <li><Link href="/search" className="hover:text-gray-700">Dienstleistungen</Link></li>
            <li className="mx-1">/</li>
            <li><Link href={`/search?category=${service.category}`} className="hover:text-gray-700">{service.category}</Link></li>
            <li className="mx-1">/</li>
            <li className="text-gray-900 font-medium">{service.title}</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Linke Spalte - Bilder und Details */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
                <Image
                  src={service.seller.avatar}
                  alt={service.seller.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <Link 
                  href={`/profile/${service.seller.id}`}
                  className="text-gray-900 font-medium hover:underline mr-2"
                >
                  {service.seller.name}
                </Link>
                <div className="flex items-center text-yellow-500">
                  <FiStar className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({service.reviews} Bewertungen)</span>
                </div>
              </div>
            </div>
            
            {/* Hauptbild */}
            <div className="mb-4 relative rounded-lg overflow-hidden h-80 w-full">
              <Image
                src={activeImage}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Thumbnail-Galerie */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              <div 
                className={`h-20 relative rounded-lg overflow-hidden cursor-pointer ${activeImage === service.image ? 'ring-2 ring-rose-500' : ''}`}
                onClick={() => setActiveImage(service.image)}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {service.gallery.map((img, index) => (
                <div 
                  key={index}
                  className={`h-20 relative rounded-lg overflow-hidden cursor-pointer ${activeImage === img ? 'ring-2 ring-rose-500' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${service.title} Galeriebild ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Beschreibung */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Über diese Dienstleistung</h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
              
              <div className="flex items-center text-gray-500 mb-4">
                <FiMapPin className="h-5 w-5 mr-2" />
                <span>{service.location}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Was enthalten ist</h3>
              <ul className="space-y-2 mb-4">
                {selectedPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-400">
                    <FiCheck className="h-4 w-4 text-rose-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center justify-between mt-6">
                <button className="flex items-center text-gray-500 hover:text-rose-700">
                  <FiHeart className="h-5 w-5 mr-1" />
                  <span>Merken</span>
                </button>
                
                <button className="flex items-center text-gray-500 hover:text-rose-700">
                  <FiMessageSquare className="h-5 w-5 mr-1" />
                  <span>Anbieter kontaktieren</span>
                </button>
              </div>
            </div>
            
            {/* Bewertungen */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Bewertungen</h2>
                <div className="flex items-center text-yellow-500">
                  <FiStar className="h-5 w-5 fill-current" />
                  <span className="ml-1 font-medium text-lg">{service.rating}</span>
                  <span className="text-gray-500 ml-1">({service.reviews} Bewertungen)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {service.reviewsData.map((review) => (
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
          </div>
          
          {/* Rechte Spalte - Preise und Pakete */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Paketauswahl */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="flex border-b border-gray-200">
                  {service.packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      className={`flex-1 px-4 py-3 text-center font-medium ${
                        selectedPackage.id === pkg.id
                          ? 'bg-rose-50 text-rose-700 border-b-2 border-rose-500'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      {pkg.name}
                    </button>
                  ))}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{selectedPackage.name}</h3>
                    <span className="text-2xl font-bold text-gray-900">{selectedPackage.price} €</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{selectedPackage.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <span className="text-gray-500 w-1/2">Lieferzeit</span>
                      <span className="font-medium text-gray-600">{selectedPackage.deliveryTime} Tage</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 w-1/2">Überarbeitungen</span>
                      <span className="font-medium">{selectedPackage.revisions}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-2">Was enthalten ist:</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedPackage.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-400">
                        <FiCheck className="h-4 w-4 text-rose-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-rose-500 text-white py-3 px-4 rounded-md font-medium hover:bg-rose-600 transition-colors flex items-center justify-center">
                    <FiShoppingCart className="h-5 w-5 mr-2" />
                    Weiter ({selectedPackage.price} €)
                  </button>
                  
                  <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors">
                    Anbieter kontaktieren
                  </button>
                </div>
              </div>
              
              {/* Anbieter-Info */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden relative mr-4">
                      <Image
                        src={service.seller.avatar}
                        alt={service.seller.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900">{service.seller.name}</h3>
                      <p className="text-sm text-gray-500">{service.seller.title}</p>
                      <div className="flex items-center text-yellow-500 mt-1">
                        <FiStar className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{service.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/profile/${service.seller.id}`}
                    className="block w-full text-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors mb-4"
                  >
                    Profil ansehen
                  </Link>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Aus</span>
                      <span className="font-medium text-gray-900">{service.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Mitglied seit</span>
                      <span className="font-medium text-gray-900">{service.seller.memberSince}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Durchschn. Antwortzeit</span>
                      <span className="font-medium text-gray-900">{service.seller.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sprachen</span>
                      <span className="font-medium text-gray-900">{service.seller.languages.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Fähigkeiten</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.seller.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 