'use client';

import ServiceCard from './ServiceCard';
import CATEGORIES from '../constants/categories';

// Mock data for featured services
const featuredServices = [
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
  },
  {
    id: '4',
    title: 'Sanitär & Heizungsinstallation',
    description: 'Installation und Reparatur von Sanitäranlagen, Heizungen und Klimaanlagen',
    price: 75,
    rating: 4.9,
    reviews: 211,
    location: 'Köln, NRW',
    category: CATEGORIES[0].id,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    seller: {
      id: 'user4',
      name: 'Sarah Müller',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
    },
  },
];

// Helper function to get category name by id
const getCategoryName = (categoryId: string) => {
  const category = CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.name : categoryId;
};

const FeaturedServices = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-200 mb-4">
            Ausgezeichnete Services
          </h2>
          <p className="text-xl text-gray-200/60 max-w-3xl mx-auto">
            Entdecken Sie hochwertige Services von talentierten Fachleuten in Ihrer Nähe
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              {...service} 
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/search"
            className="inline-flex font-semibold items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Alle Services anzeigen
          </a>

        </div>
      </div>
    </section>
  );
};

export default FeaturedServices; 