'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiCheckCircle, FiClock, FiGlobe, } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import Cookies from 'js-cookie';


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState<{ userId: string; sessionId: string } | null>(null);
  
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Call the session API to log in
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Check if 2FA is required
      if (data.requiresTwoFactor) {
        setRequiresTwoFactor(true);
        setTwoFactorData({
          userId: data.userId,
          sessionId: data.sessionId
        });
        
        // Generate 2FA token
        await fetch('/api/auth/two-factor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: data.userId,
          }),
        });
        
        setIsLoading(false);
        return;
      }
      
      // Set the session cookie
      const expiryDays = rememberMe ? 30 : 1;
      Cookies.set('sessionId', data.sessionId, { 
        expires: expiryDays, 
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      // Navigate to home page after successful login
      router.push('/');
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!twoFactorData) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Verify 2FA token
      const response = await fetch('/api/auth/two-factor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: twoFactorCode,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Zwei-Faktor-Authentifizierung fehlgeschlagen');
      }
      
      // Set the session cookie
      const expiryDays = rememberMe ? 30 : 1;
      Cookies.set('sessionId', twoFactorData.sessionId, { 
        expires: expiryDays, 
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      // Navigate to home page after successful 2FA
      router.push('/');
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToSignUp = () => {
    router.push('/auth/signup');
  };
  
  // Testimonials data
  const testimonials = [
    {
      name: "Marie Schmidt",
      role: "Freelance Designer",
      quote: "Dank Nearby habe ich meine Kundenbasis in nur 3 Monaten verdoppelt.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Thomas Weber",
      role: "Unternehmer",
      quote: "Die Qualität der Dienstleistungen ist hervorragend und das Buchungssystem einfach zu bedienen.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <FiCheckCircle className="h-6 w-6 text-rose-500" />,
      title: "Verifizierte Dienstleister",
      description: "Alle Anbieter werden gründlich überprüft, um höchste Qualität zu gewährleisten."
    },
    {
      icon: <FiShield className="h-6 w-6 text-rose-500" />,
      title: "Sicher und zuverlässig",
      description: "Abgesicherte Zahlungen und Kundenservice für problemlose Transaktionen."
    },
    {
      icon: <FiClock className="h-6 w-6 text-rose-500" />,
      title: "Zeitsparend",
      description: "Finden Sie schnell den passenden Dienstleister für Ihre Bedürfnisse."
    },
    {
      icon: <FiGlobe className="h-6 w-6 text-rose-500" />,
      title: "Lokale Unterstützung",
      description: "Unterstützen Sie lokale Unternehmen und Freiberufler in Ihrer Umgebung."
    }
  ];

  // Stats
  const stats = [
    { value: "10.000+", label: "Aktive Nutzer" },
    { value: "5.000+", label: "Erfolgreiche Projekte" },
    { value: "4.8/5", label: "Durchschnittliche Bewertung" }
  ];
  
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col">
      {/* Hero Header */}
      <div className="w-full bg-gradient-to-r from-rose-600 to-rose-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Link href="/" className="flex justify-center">
              <span className="text-3xl font-bold text-white">Nearby</span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-white">Willkommen bei Nearby</h2>
            <p className="mt-2 text-md text-rose-100">Die Plattform für lokale Dienstleistungen</p>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-start shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p>{error}</p>
              </div>
            )}
            
            <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
              {requiresTwoFactor ? (
                // Two-factor authentication form
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
                      <FiShield className="h-8 w-8 text-rose-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Sicherheitsprüfung</h2>
                    <p className="text-sm text-gray-500 mt-2">
                      Bitte geben Sie den Code ein, der an Ihre E-Mail gesendet wurde
                    </p>
                  </div>
                  
                  <form className="space-y-6" onSubmit={handleTwoFactorSubmit}>
                    <div className="space-y-2">
                      <label htmlFor="twoFactorCode" className="sr-only">
                        Bestätigungscode
                      </label>
                      <div className="flex justify-center mb-2">
                        <div className="relative">
                          <FiShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            id="twoFactorCode"
                            name="twoFactorCode"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            required
                            value={twoFactorCode}
                            onChange={(e) => setTwoFactorCode(e.target.value)}
                            className="block w-48 pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-lg text-center tracking-widest focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-gray-50 text-gray-900"
                            placeholder="••••••"
                            maxLength={6}
                          />
                        </div>
                      </div>
                      <p className="text-center text-sm text-gray-500">
                        Der Code ist 10 Minuten gültig
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? 'Überprüfung...' : 'Bestätigen'}
                    </button>
                    
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm text-rose-600 hover:text-rose-500"
                        onClick={() => setRequiresTwoFactor(false)}
                      >
                        Zurück zur Anmeldung
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                // Regular login form
                <>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Anmelden</h2>
                      <button
                        onClick={navigateToSignUp}
                        className="text-sm font-medium text-rose-600 hover:text-rose-500"
                      >
                        Konto erstellen
                      </button>
                    </div>
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          E-Mail-Adresse
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-gray-50 text-gray-900"
                            placeholder="name@beispiel.de"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Passwort
                          </label>
                          <Link href="/auth/reset-password" className="text-xs font-medium text-rose-600 hover:text-rose-500">
                            Passwort vergessen?
                          </Link>
                        </div>
                        <div className="relative">
                          <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-gray-50 text-gray-900"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                            ) : (
                              <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                          Angemeldet bleiben
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${
                          isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Anmeldung...
                          </span>
                        ) : 'Anmelden'}
                      </button>
                    </form>
                  </div>
                  
                  <div className="bg-gray-100 px-8 py-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        className="w-full flex justify-center items-center px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                      >
                        <FcGoogle className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        className="w-full flex justify-center items-center px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                      >
                        <FaFacebook className="h-5 w-5 text-blue-600" />
                      </button>
                      <button
                        type="button"
                        className="w-full flex justify-center items-center px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors"
                      >
                        <FaApple className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mt-4 text-center text-xs text-gray-500">
                      Mit der Anmeldung akzeptieren Sie unsere{' '}
                      <a href="#" className="text-rose-600 hover:text-rose-500">
                        Nutzungsbedingungen
                      </a>{' '}
                      und{' '}
                      <a href="#" className="text-rose-600 hover:text-rose-500">
                        Datenschutzrichtlinie
                      </a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Benefits and testimonials */}
        <div className="lg:w-1/2 bg-gradient-to-br from-rose-600 via-rose-500 to-pink-500 p-8 flex items-center">
          <div className="w-full max-w-lg mx-auto">
            {/* Introduction */}
            <div className="mb-10 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Entdecken Sie lokale Dienstleistungen in Ihrer Nähe
              </h3>
              <p className="text-gray-700 font-medium">
                Tausende von verifizierten Anbietern stehen bereit, um Ihnen zu helfen. Jetzt anmelden und alle Vorteile nutzen!
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
                  <div className="text-2xl font-bold text-rose-600">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Benefits */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-10 border border-white/20">
              <h4 className="text-xl font-semibold mb-5 text-gray-900 border-b border-gray-200 pb-2">Warum Nearby wählen?</h4>
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4 rounded-xl transition-all hover:bg-rose-50 hover:shadow-md">
                    <div className="bg-rose-100 rounded-full p-3 mb-3">
                      {React.cloneElement(benefit.icon, { className: "h-6 w-6 text-rose-600" })}
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-1">{benefit.title}</h5>
                    <p className="text-gray-700">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold mb-4 text-white">Das sagen unsere Nutzer:</h4>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-white/20">
                  <div className="flex items-start">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="h-12 w-12 rounded-full mr-4 border-2 border-rose-300"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-rose-500 rounded-full p-1">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium italic">{`"`}{testimonial.quote}{`"`}</p>
                      <div className="mt-2 flex items-center">
                        <p className="text-sm font-bold text-gray-900">{testimonial.name}</p>
                        <span className="mx-1 text-gray-400">•</span>
                        <p className="text-sm text-gray-700">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 