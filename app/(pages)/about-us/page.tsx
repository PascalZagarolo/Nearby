'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        className="relative h-[70vh] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900 to-rose-600 z-0 opacity-90" />
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Nearby Community" 
            layout="fill"
            objectFit="cover"
            className="mix-blend-overlay"
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white p-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Über Nearby</h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
                Wir verbinden talentierte lokale Dienstleister mit Menschen, die nach Qualität suchen
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </motion.div>

      <main>
        {/* Mission Statement Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-4">UNSERE MISSION</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Eine Gemeinschaft der Möglichkeiten</h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Bei <span className="font-semibold text-rose-600">Nearby</span> glauben wir daran, dass jeder Mensch einzigartige Fähigkeiten besitzt, die anderen helfen können. Unsere Plattform bringt lokale Dienstleister und Kunden zusammen und schafft nachhaltige wirtschaftliche Chancen für alle.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: "💡",
                  title: "Innovation",
                  description: "Wir entwickeln ständig neue Funktionen, um das Nutzererlebnis zu verbessern und den Erfolg unserer Dienstleister zu fördern."
                },
                {
                  icon: "🤝",
                  title: "Gemeinschaft",
                  description: "Wir schaffen eine vertrauensvolle Umgebung, in der Respekt, Qualität und gegenseitige Unterstützung im Mittelpunkt stehen."
                },
                {
                  icon: "🌱",
                  title: "Nachhaltigkeit",
                  description: "Durch die Förderung lokaler Dienstleistungen reduzieren wir Transportwege und unterstützen lokale Wirtschaftskreisläufe."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section with Animated Counters */}
        <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-white">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-4">UNSERE ERFOLGE</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Die Nearby-Gemeinschaft wächst</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Tausende von Nutzern vertrauen Nearby für lokale Dienstleistungen
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: '10K+', label: 'Aktive Nutzer', icon: '👥' },
                { number: '5K+', label: 'Dienstleister', icon: '🛠️' },
                { number: '25K+', label: 'Erfolgreiche Aufträge', icon: '✅' },
                { number: '4.8', label: 'Bewertung', icon: '⭐' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center group hover:border-rose-200 hover:shadow-md transition-all"
                >
                  <div className="bg-rose-100 group-hover:bg-rose-200 transition-colors w-14 h-14 rounded-full flex items-center justify-center mr-5 text-2xl">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section with Modern Cards */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-4">UNSER TEAM</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Die Menschen hinter Nearby</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Ein engagiertes Team von Visionären, die daran arbeiten, lokale Dienstleistungen zu revolutionieren
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Anna Schmidt', role: 'Gründerin & CEO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80' },
                { name: 'Markus Weber', role: 'CTO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
                { name: 'Sophie Müller', role: 'Design Direktorin', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80' },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative h-80 mb-6 overflow-hidden rounded-2xl">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      layout="fill" 
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-rose-300">{member.role}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern Testimonials Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-white">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-4">ERFAHRUNGEN</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Was unsere Nutzer sagen</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Echte Erfahrungen von echten Menschen, die Nearby nutzen
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Als freiberuflicher Handwerker hat Nearby meine Auftragslage komplett verändert. Ich habe jetzt mehr Kunden als je zuvor.",
                  author: "Michael K.",
                  role: "Elektriker aus München",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                },
                {
                  quote: "Die Qualität der Dienstleister auf Nearby ist beeindruckend. Ich habe für meine Wohnungsrenovierung die perfekten Profis gefunden.",
                  author: "Laura M.",
                  role: "Kundin aus Berlin",
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image src={testimonial.image} alt={testimonial.author} layout="fill" objectFit="cover" />
                    </div>
                  </div>
                  <div>
                    <div className="text-rose-600 mb-2">★★★★★</div>
                    <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-rose-600 to-rose-800 rounded-3xl p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 80 80">
                  <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                    <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#fff"></circle>
                  </pattern>
                  <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
                </svg>
              </div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Bereit, Teil von Nearby zu werden?</h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Egal, ob Du Deine Dienstleistungen anbieten oder lokale Experten finden möchtest – Nearby macht es einfach.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/register/provider" className="px-8 py-4 bg-white text-rose-700 font-bold rounded-full hover:bg-rose-50 transition-colors text-center">
                    Als Dienstleister starten
                  </Link>
                  <Link href="/services" className="px-8 py-4 bg-rose-700 text-white font-bold rounded-full border border-rose-500 hover:bg-rose-600 transition-colors text-center">
                    Dienste entdecken
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage; 