'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-rose-800">Nearby</Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-rose-700">Home</Link>
            <Link href="/services" className="text-gray-700 hover:text-rose-700">Dienste</Link>
            <Link href="/explore" className="text-gray-700 hover:text-rose-700">Entdecken</Link>
            <Link href="/about-us" className="text-rose-700 font-semibold">Über Uns</Link>
            <Link href="/login" className="text-gray-700 hover:text-rose-700">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-rose-700 text-white rounded-full hover:bg-rose-800 transition-colors">Registrieren</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image src="/images/hero.jpg" alt="Hero Image" layout="fill" objectFit="cover" className="z-0" />
          <div className="absolute inset-0 bg-rose-900/30 z-10" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white p-4"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">Über Uns</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto">Entdecke die Welt der lokalen Dienstleistungen</p>
            </motion.div>
          </div>
        </div>

        {/* Vision Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-rose-800 mb-6">Unsere Vision</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Bei <span className="font-semibold text-rose-700">Nearby</span> glauben wir an eine Welt, in der Talente und Fähigkeiten ohne Grenzen geteilt werden können. Unsere Plattform verbindet Menschen mit lokalen Dienstleistern und ermöglicht es jedem, sein volles Potenzial zu entfalten.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-rose-700 mb-4">Was uns antreibt</h3>
              <p className="text-gray-700 mb-6">
                Wir setzen uns leidenschaftlich dafür ein, eine Plattform zu schaffen, die es Dienstleistern ermöglicht, ihre einzigartigen Fähigkeiten zu präsentieren und gleichzeitig Kunden dabei hilft, genau die Expertise zu finden, die sie benötigen.
              </p>
              <p className="text-gray-700">
                Unsere Mission ist es, eine vertrauenswürdige Gemeinschaft aufzubauen, in der Qualität, Transparenz und gegenseitiger Respekt an erster Stelle stehen. Wir möchten jedem die Möglichkeit geben, durch sein Talent erfolgreich zu sein.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl bg-rose-200"
            >
              <Image src="/images/vision.jpg" alt="Vision Illustration" layout="fill" objectFit="cover" />
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 px-4 bg-rose-50">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-rose-800 mb-16"
            >
              Unsere Erfolge
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '10K+', label: 'Aktive Nutzer', description: 'aus ganz Deutschland' },
                { number: '5K+', label: 'Dienstleister', description: 'mit einzigartigen Fähigkeiten' },
                { number: '25K+', label: 'Abgeschlossene Aufträge', description: 'mit höchster Zufriedenheit' },
                { number: '4.8', label: 'Durchschnittsbewertung', description: 'von unseren zufriedenen Kunden' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl hover:bg-rose-100/50 transition-all"
                >
                  <h3 className="text-4xl font-bold text-rose-700 mb-2">{stat.number}</h3>
                  <p className="text-xl font-semibold text-gray-800 mb-2">{stat.label}</p>
                  <p className="text-gray-600">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-rose-800 mb-6">Unser Einfluss</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Wir sind stolz darauf, positive Veränderungen im Leben von Menschen zu bewirken und die lokale Wirtschaft zu unterstützen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Förderung lokaler Talente',
                description: 'Wir haben tausenden Dienstleistern geholfen, ihre Karriere aufzubauen und ihre Leidenschaft zum Beruf zu machen.',
                icon: '🌱'
              },
              {
                title: 'Wirtschaftliche Unabhängigkeit',
                description: 'Unsere Plattform ermöglicht es Menschen, ein stabiles Einkommen zu erzielen und finanzielle Freiheit zu erlangen.',
                icon: '💼'
              },
              {
                title: 'Nachhaltige Gemeinschaft',
                description: 'Durch die Förderung lokaler Dienstleistungen tragen wir zu einer nachhaltigeren und verbundenen Gesellschaft bei.',
                icon: '🌍'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow border border-rose-100 hover:border-rose-300 transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-rose-700 mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-rose-50">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-rose-800 mb-6"
            >
              Unser Team
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-16"
            >
              Hinter Nearby steht ein engagiertes Team von Experten, die jeden Tag daran arbeiten, das beste Erlebnis für unsere Nutzer zu schaffen.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Anna Schmidt', role: 'Gründerin & CEO', image: '/images/team/anna.jpg' },
                { name: 'Markus Weber', role: 'CTO', image: '/images/team/markus.jpg' },
                { name: 'Sophie Müller', role: 'Design Direktorin', image: '/images/team/sophie.jpg' },
                { name: 'Thomas Bauer', role: 'Marketing Leiter', image: '/images/team/thomas.jpg' },
                { name: 'Laura Fischer', role: 'Kundenbetreuung', image: '/images/team/laura.jpg' },
                { name: 'Michael Jung', role: 'Produktmanager', image: '/images/team/michael.jpg' }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="relative h-64">
                    <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-rose-800 mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-rose-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6"
            >
              Sei Teil unserer Geschichte
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg mb-8"
            >
              Ob als Dienstleister oder Kunde – werde Teil der Nearby-Gemeinschaft und erlebe den Unterschied.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/register/provider" className="px-8 py-3 bg-white text-rose-800 font-bold rounded-full hover:bg-rose-100 transition-colors text-center">
                Dienstleister werden
              </Link>
              <Link href="/services" className="px-8 py-3 bg-rose-600 text-white font-bold rounded-full hover:bg-rose-700 transition-colors text-center">
                Dienste entdecken
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-rose-400">Nearby</h3>
              <p className="text-gray-400 mb-4">
                Verbindung lokaler Talente mit Menschen, die nach qualitativ hochwertigen Dienstleistungen suchen.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-rose-400">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-rose-400">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-rose-400">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-rose-400">Home</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-rose-400">Dienste</Link></li>
                <li><Link href="/about-us" className="text-gray-400 hover:text-rose-400">Über Uns</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-rose-400">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kategorien</h3>
              <ul className="space-y-2">
                <li><Link href="/services/category/design" className="text-gray-400 hover:text-rose-400">Design</Link></li>
                <li><Link href="/services/category/development" className="text-gray-400 hover:text-rose-400">Entwicklung</Link></li>
                <li><Link href="/services/category/marketing" className="text-gray-400 hover:text-rose-400">Marketing</Link></li>
                <li><Link href="/services/category/writing" className="text-gray-400 hover:text-rose-400">Text & Übersetzung</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
              <ul className="space-y-2">
                <li><Link href="/legal/terms" className="text-gray-400 hover:text-rose-400">Nutzungsbedingungen</Link></li>
                <li><Link href="/legal/privacy" className="text-gray-400 hover:text-rose-400">Datenschutz</Link></li>
                <li><Link href="/legal/imprint" className="text-gray-400 hover:text-rose-400">Impressum</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Nearby. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage; 