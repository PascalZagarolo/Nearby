'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiSearch, FiMapPin, FiFilter } from 'react-icons/fi';
import ServiceCard from '../../components/ServiceCard';
import CATEGORIES from '../../constants/categories';
import { FaEuroSign } from 'react-icons/fa6';

// Mock data für Services
const allServices = [
  {
    id: '1',
    title: 'Professionelle Elektroinstallation',
    description: 'Ich biete fachgerechte Elektroinstallationen für Ihr Zuhause oder Gewerbe an',
    price: 65,
    rating: 4.9,
    reviews: 253,
    location: 'München, BY',
    category: CATEGORIES[0].id,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    seller: {
      id: 'user1',
      name: 'Alexander Schmidt',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80',
    },
    userType: 'dienstleister',
  },
  {
    id: '2',
    title: 'Malerarbeiten & Renovierung',
    description: 'Professionelles Streichen und Renovieren von Innenräumen mit hochwertigen Materialien',
    price: 45,
    rating: 4.8,
    reviews: 187,
    location: 'Berlin, BE',
    category: CATEGORIES[1].id,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    seller: {
      id: 'user2',
      name: 'Emma Wagner',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    userType: 'dienstleister',
  },
  {
    id: '3',
    title: 'Gartenpflege & Landschaftsbau',
    description: 'Professionelle Gartenpflege, Rasen mähen und Heckenschnitt für Ihren perfekten Garten',
    price: 40,
    rating: 4.7,
    reviews: 129,
    location: 'Hamburg, HH',
    category: CATEGORIES[3].id,
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    seller: {
      id: 'user3',
      name: 'Markus Becker',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    userType: 'dienstleister',
  },
  {
    id: '4',
    title: 'Reinigungsservice für Privathaushalte',
    description: 'Zuverlässige und gründliche Reinigung für Ihr Zuhause - regelmäßig oder einmalig',
    price: 35,
    rating: 4.9,
    reviews: 211,
    location: 'Köln, NRW',
    category: CATEGORIES[1].id,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    seller: {
      id: 'user4',
      name: 'Sarah Müller',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
    },
    userType: 'dienstleister',
  },
  {
    id: '5',
    title: 'Umzugshelfer und Transportdienst',
    description: 'Professionelle Umzugshilfe mit Transportfahrzeug für Ihren stressfreien Umzug',
    price: 55,
    rating: 4.8,
    reviews: 156,
    location: 'Frankfurt, HE',
    category: CATEGORIES[2].id,
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    seller: {
      id: 'user5',
      name: 'David Klein',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    userType: 'dienstleister',
  },
  {
    id: '6',
    title: 'Computer & Netzwerk Support',
    description: 'IT-Hilfe vor Ort für Privatpersonen und kleine Unternehmen - PC-Probleme schnell gelöst',
    price: 60,
    rating: 4.9,
    reviews: 143,
    location: 'Stuttgart, BW',
    category: CATEGORIES[6].id,
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80',
    seller: {
      id: 'user6',
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
    },
    userType: 'dienstleister',
  },
  {
    id: '7',
    title: 'Betreuungsservice für Kinder',
    description: 'Liebevolle und zuverlässige Kinderbetreuung durch erfahrene Pädagogin',
    price: 25,
    rating: 4.7,
    reviews: 98,
    location: 'Düsseldorf, NRW',
    category: CATEGORIES[5].id,
    image: 'https://images.unsplash.com/photo-1603664454146-50b9bb1e7afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    seller: {
      id: 'user7',
      name: 'Robert Taylor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    userType: 'dienstleister',
  },
  {
    id: '8',
    title: 'Fotografie für Events & Hochzeiten',
    description: 'Professionelle Fotografie für Ihre besonderen Anlässe mit schneller Bildbearbeitung',
    price: 85,
    rating: 4.8,
    reviews: 176,
    location: 'München, BY',
    category: CATEGORIES[7].id,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    seller: {
      id: 'user8',
      name: 'Jennifer Lopez',
      avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1889&q=80',
    },
    userType: 'dienstleister',
  },
  // Arbeitgeber
  {
    id: '9',
    title: 'Suche Elektriker für Hausinstallation',
    description: 'Für eine komplette Neuverkabelung unseres Hauses suchen wir einen erfahrenen Elektriker',
    price: 70,
    rating: 4.5,
    reviews: 32,
    location: 'München, BY',
    category: CATEGORIES[0].id,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    seller: {
      id: 'employer1',
      name: 'Maximilian Schreiber',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    userType: 'arbeitgeber',
  },
  {
    id: '10',
    title: 'Gärtner für regelmäßige Gartenpflege gesucht',
    description: 'Für unseren großen Garten suchen wir einen zuverlässigen Gärtner für wöchentliche Pflege',
    price: 45,
    rating: 4.7,
    reviews: 18,
    location: 'Hamburg, HH',
    category: CATEGORIES[3].id,
    image: 'https://images.unsplash.com/photo-1583900985737-6d0495555783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    seller: {
      id: 'employer2',
      name: 'Claudia Müller',
      avatar: 'https://images.unsplash.com/photo-1599566219227-2efe0c9b7f5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    },
    userType: 'arbeitgeber',
  },
];

// Kategorien aus der globalen Konstante ableiten
const categoryOptions = ['Alle Kategorien', ...CATEGORIES.map(cat => cat.name)];

export default function Search() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('q');
  const locationParam = searchParams.get('location');
  const categoryParam = searchParams.get('category');
  const typeParam = searchParams.get('type') || 'dienstleister';
  
  const [searchTerm, setSearchTerm] = useState(queryParam || '');
  const [location, setLocation] = useState(locationParam || '');
  const [category, setCategory] = useState(categoryParam || 'Alle Kategorien');
  const [userType, setUserType] = useState(typeParam);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredServices, setFilteredServices] = useState(allServices);
  
  // Filter services based on search criteria
  useEffect(() => {
    let results = [...allServices];
    
    // Filter by user type
    results = results.filter(service => service.userType === userType);
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by location
    if (location) {
      results = results.filter(service =>
        service.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Filter by category
    if (category && category !== 'Alle Kategorien') {
      const categoryId = CATEGORIES.find(cat => cat.name === category)?.id;
      if (categoryId) {
        results = results.filter(service => service.category === categoryId);
      }
    }
    
    // Filter by price range
    results = results.filter(service =>
      service.price >= priceRange[0] && service.price <= priceRange[1]
    );
    
    // Filter by minimum rating
    results = results.filter(service => service.rating >= minRating);
    
    setFilteredServices(results);
  }, [searchTerm, location, category, priceRange, minRating, userType]);
  
  // Initialize from URL params
  useEffect(() => {
    if (queryParam) setSearchTerm(queryParam);
    if (locationParam) setLocation(locationParam);
    if (categoryParam) {
      const cat = CATEGORIES.find(c => c.id === categoryParam || c.slug === categoryParam);
      if (cat) {
        setCategory(cat.name);
      } else {
        setCategory(categoryParam);
      }
    }
    if (typeParam) setUserType(typeParam);
  }, [queryParam, locationParam, categoryParam, typeParam]);
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {userType === 'dienstleister' ? 'Dienstleister finden' : 'Arbeitgeber finden'}
          </h1>
          
          {/* User Type Switch */}
          <div className="mb-6">
            <div className="inline-flex rounded-lg shadow-sm bg-gray-100 p-1 w-full max-w-xs">
              <button
                type="button"
                onClick={() => setUserType('dienstleister')}
                className={`w-1/2 py-2.5 text-sm font-medium rounded-md transition-all ${
                  userType === 'dienstleister'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dienstleister
              </button>
              <button
                type="button"
                onClick={() => setUserType('arbeitgeber')}
                className={`w-1/2 py-2.5 text-sm font-medium rounded-md transition-all ${
                  userType === 'arbeitgeber'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Arbeitgeber
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={userType === 'dienstleister' ? "Welchen Service suchst du?" : "Welche Arbeit suchst du?"}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 text-gray-600 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ort"
                className="block w-full text-gray-600  pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <button
              className="bg-gradient-to-r from-rose-600 to-rose-700 text-white px-6 py-2 rounded-md hover:from-rose-700 hover:to-rose-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
            >
              Suchen
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
                <button 
                  className="md:hidden text-gray-500 hover:text-gray-700"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <FiFilter className="h-5 w-5" />
                </button>
              </div>
              
              <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Kategorie</h3>
                  <select
                    className="block w-full px-4 text-sm py-2 border border-gray-300 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Preisbereich</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Min</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <FaEuroSign className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          className="block w-full pl-7 pr-3 py-1 border border-gray-300 rounded-md text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Max</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <FaEuroSign className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          className="block w-full pl-7 pr-3 py-1 border border-gray-300 text-gray-600  rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          min={priceRange[0]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Mindestbewertung</h3>
                  <div className="flex items-center justify-between">
                    {[0, 1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className={`h-8 w-8 flex items-center justify-center rounded-full mr-1 ${
                          minRating === rating 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setMinRating(rating)}
                      >
                        {rating}
                      </button>
                    ))}
                   
                  </div>
                </div>
                
                {/* Reset Filters */}
                <button
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setCategory('Alle Kategorien');
                    setPriceRange([0, 200]);
                    setMinRating(0);
                  }}
                >
                  Filter zurücksetzen
                </button>
              </div>
            </div>
          </div>
          
          {/* Search Results */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredServices.length} Services gefunden
                </h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Sortieren nach:</span>
                  <select className="border border-gray-300 text-gray-600 rounded-md text-sm px-2 py-1">
                    <option>Relevanz</option>
                    <option>Preis (aufsteigend)</option>
                    <option>Preis (absteigend)</option>
                    <option>Bewertung</option>
                  </select>
                </div>
              </div>
            </div>
            
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    {...service} 
                    userType={service.userType as 'dienstleister' | 'arbeitgeber'} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Keine Services gefunden</h3>
                <p className="text-gray-600 mb-4">
                  Wir konnten keine Services finden, die deinen Suchkriterien entsprechen.
                </p>
                <p className="text-gray-600">
                  Versuche, deine Filtereinstellungen oder Suchbegriffe anzupassen.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 