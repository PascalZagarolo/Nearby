'use client';

import { useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import CATEGORIES from '../constants/categories';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append('q', searchTerm);
    }

    if (location) {
      params.append('location', location);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')",
          filter: "brightness(0.5)"
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Finde Lokale Talente & Services
        </h1>
        <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
          Vernetze dich mit lokalen Talenten und Services für deine Projekte und Bedürfnisse,
          oder biete deine Services direkt an.
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-center">
            <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="flex items-center px-4 py-3">
                <FiSearch className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Wonach suchst du?"
                  className="flex-1 px-3 py-2 focus:outline-none text-gray-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center px-4 py-3">
                <FiMapPin className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ort"
                  className="flex-1 px-3 py-2 focus:outline-none text-gray-600"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-4 px-6 py-2 bg-red-600 text-white font-medium rounded-md 
             hover:bg-red-700 transition-all duration-300 
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Suchen
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Popular Categories */}
        <div className="mt-16 w-full">
          <p className="text-gray-200 font-semibold text-lg mb-6 text-center">Beliebte Kategorien:</p>
          <div className="flex space-x-6 overflow-x-auto px-4 py-4">
            {CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`/search?category=${encodeURIComponent(category.slug)}`}
                className="w-32 bg-white text-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-2xl mb-3 text-red-600">{category.icon}</div>
                <span className="text-sm font-medium text-center">{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
