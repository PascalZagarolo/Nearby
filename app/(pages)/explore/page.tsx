'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';


const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handwerksKategorien = [
    {
      id: 'handwerk',
      name: 'Handwerk & Reparaturen',
      description: 'Elektrik, Sanitär, Schreinerarbeiten und mehr',
      icon: '/icons/tools.svg',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    },
    {
      id: 'haushalt',
      name: 'Haushalt & Reinigungen',
      description: 'Haushaltsreinigung, Fensterreinigung und Gebäudereinigung',
      icon: '/icons/cleaning.svg',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    {
      id: 'umzug',
      name: 'Umzug & Transport',
      description: 'Umzugshilfe, Möbeltransport und Logistik',
      icon: '/icons/moving.svg',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 'garten',
      name: 'Garten & Außenbereich',
      description: 'Gartenpflege, Landschaftsbau und Terrassengestaltung',
      icon: '/icons/gardening.svg',
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    {
      id: 'haustiere',
      name: 'Haustiere',
      description: 'Tiersitting, Gassiservice und Haustierpflege',
      icon: '/icons/pets.svg',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    },
    {
      id: 'alltagshilfe',
      name: 'Familien & Alltagshilfe',
      description: 'Betreuung, Nachhilfe und Unterstützung im Alltag',
      icon: '/icons/family.svg',
      image: 'https://images.unsplash.com/photo-1603664454146-50b9bb1e7afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    },
    {
      id: 'technik',
      name: 'Technik & IT vor Ort',
      description: 'Computer-Reparatur, Netzwerkeinrichtung und technischer Support',
      icon: '/icons/tech.svg',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80',
    },
    {
      id: 'event',
      name: 'Event & Medien',
      description: 'Fotografie, Videografie und Event-Organisation',
      icon: '/icons/camera.svg',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
    },
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'Professionelles Logo-Design',
      description: 'Einzigartige und moderne Logos für Ihr Unternehmen mit unbegrenzten Revisionen.',
      price: 'Ab €99',
      rating: 4.9,
      reviews: 238,
      image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Design'
    },
    {
      id: 2,
      title: 'Webseiten-Entwicklung',
      description: 'Responsive Webseiten mit modernem Design und optimaler Nutzererfahrung.',
      price: 'Ab €299',
      rating: 4.8,
      reviews: 187,
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Entwicklung'
    },
    {
      id: 3,
      title: 'Professionelle Reinigung',
      description: 'Gründliche und zuverlässige Reinigung für Wohnungen, Häuser und Büros.',
      price: 'Ab €89',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Haushalt'
    },
    {
      id: 4,
      title: 'Umzugshelfer & Transport',
      description: 'Professionelle Umzugshelfer für stressfreies Umziehen und Transportieren.',
      price: 'Ab €149',
      rating: 4.9,
      reviews: 204,
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Umzug'
    },
    {
      id: 5,
      title: 'Gartenpflege & Landschaftsbau',
      description: 'Professionelle Gartenpflege und kreative Landschaftsgestaltung.',
      price: 'Ab €120',
      rating: 4.8,
      reviews: 132,
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      category: 'Garten'
    },
    {
      id: 6,
      title: 'Elektroinstallation & Reparatur',
      description: 'Sichere und professionelle Elektroarbeit für Ihr Zuhause oder Unternehmen.',
      price: 'Ab €80',
      rating: 4.9,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      category: 'Handwerk'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gradient-to-r from-rose-600 to-rose-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-white animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Entdecke lokale Dienstleistungen
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 mb-8"
          >
            Finde genau den richtigen Dienstleister für dein Projekt in deiner Nähe
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative max-w-3xl mx-auto"
          >
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Wonach suchst du? (z.B. Reinigung, Umzugshilfe...)" 
              className="w-full p-5 pl-6 pr-16 rounded-full shadow-xl border-0 focus:outline-none focus:ring-2 shadow-lg border-gray-200 border-2 focus:ring-rose-500 text-gray-200 placeholder:text-gray-300"
            />
            <button className="absolute right-3 top-3 bg-rose-800 text-white p-2 rounded-full hover:bg-rose-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Categories Section */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Beliebte Kategorien</h2>
            <Link href="/search" className="text-rose-600 hover:text-rose-700 font-semibold">
              Alle Kategorien
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {handwerksKategorien.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-xl"
              >
                <Link href={`/search?category=${category.id}`} className="block group">
                  <div className="relative h-48 w-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:brightness-90 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-center justify-center p-4 group-hover:via-black/70 transition-all duration-300">
                      <div className="text-center">
                        <div className="bg-white rounded-full p-3 h-20 w-20 mx-auto mb-3 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
                          {category.id === 'handwerk' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-700" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 3a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h8a1 1 0 100-2H7zM6 9a1 1 0 011-1h2a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 100 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                          )}
                          {category.id === 'haushalt' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-700" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                          )}
                          {category.id === 'umzug' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-700" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                            </svg>
                          )}
                          {category.id === 'garten' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-700" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                            </svg>
                          )}
                          {category.id === 'haustiere' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-700" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                            </svg>
                          )}
                          {category.id === 'alltagshilfe' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-700" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                          )}
                          {category.id === 'technik' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-700" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                            </svg>
                          )}
                          {category.id === 'event' && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-700" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-white font-bold text-lg">{category.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Services Section */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Beliebte Dienstleistungen</h2>
            <Link href="/services" className="text-rose-600 hover:text-rose-700 font-semibold">
              Alle anzeigen
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="relative h-56">
                  <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-800">{service.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-rose-700 text-white px-3 py-1 rounded-full">
                    <span className="text-sm font-medium">{service.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <Link href={`/services/${service.id}`}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-rose-600 transition-colors">{service.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-amber-500 mr-1">★</span>
                      <span className="font-medium text-gray-800">{service.rating}</span>
                      <span className="text-gray-500 ml-1">({service.reviews})</span>
                    </div>
                    <button className="text-rose-600 font-medium hover:text-rose-700 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Employers Section */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Gefragte Berufe</h2>
            <Link href="/employers" className="text-rose-600 hover:text-rose-700 font-semibold">
              Alle anzeigen
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Bau & Renovierung',
                jobCount: 328,
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
                sectors: ['Malerarbeiten', 'Trockenbau', 'Fliesenleger']
              },
              {
                name: 'Gastronomie & Hotellerie',
                jobCount: 256,
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
                sectors: ['Köche', 'Servicekräfte', 'Barkeeper']
              },
              {
                name: 'E-Commerce & Versand',
                jobCount: 184,
                image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
                sectors: ['Lagermitarbeiter', 'Versandhelfer', 'Fahrer']
              }
            ].map((employer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="relative h-40">
                  <Image src={employer.image} alt={employer.name} layout="fill" objectFit="cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{employer.name}</h3>
                      <p className="text-white/80">{employer.jobCount} offene Stellen</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {employer.sectors.map((sector, i) => (
                      <span 
                        key={i} 
                        className="inline-block bg-rose-100 text-rose-700 text-sm px-3 py-1 rounded-full"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">Aktuelle Angebote</p>
                    <Link href={`/employers/${employer.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-rose-600 font-medium hover:text-rose-700 transition-colors">
                      Alle anzeigen →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16 bg-gradient-to-r from-rose-50 to-rose-100 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Wie es funktioniert</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Finde den passenden Dienstleister',
                description: 'Durchsuche unsere lokalen Dienstleister und finde den perfekten Match für dein Projekt.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                ),
                color: 'bg-rose-100 text-rose-700'
              },
              {
                title: 'Kommuniziere direkt',
                description: 'Bespreche die Details deines Projekts und erhalte ein individuelles Angebot.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                ),
                color: 'bg-rose-100 text-rose-700'
              },
              {
                title: 'Bezahlung & Lieferung',
                description: 'Sichere Bezahlung und Lieferung der vereinbarten Dienstleistung.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                color: 'bg-rose-100 text-rose-700'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-md`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 font-medium">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-gradient-to-r from-rose-600 to-rose-800 rounded-2xl p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid)" />
            </svg>
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-4">Biete deine Dienstleistungen an</h2>
              <p className="text-white/90 mb-6">Registriere dich jetzt als Dienstleister und stelle deine Fähigkeiten tausenden potenziellen Kunden vor.</p>
            </div>
            <Link href="/register/provider" className="inline-block bg-white text-rose-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
              Jetzt starten
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExplorePage; 