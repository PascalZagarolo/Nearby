'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiCheckCircle, FiShield, FiDollarSign, FiGlobe, FiClock, FiStar, FiAlertCircle, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'service_provider'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Password validation
    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein.');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registrierung fehlgeschlagen');
      }
      
      // Show success state instead of redirecting immediately
      setRegistrationSuccess(true);
      setRegisteredEmail(email);
      
      // Optional: Redirect to signin page after a delay
      // setTimeout(() => {
      //   router.push('/auth/signin');
      // }, 5000);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToSignIn = () => {
    router.push('/auth/signin');
  };
  
  // Features data for service providers
  const providerFeatures = [
    {
      icon: <FiGlobe className="h-6 w-6 text-rose-500" />,
      title: "Erreichen Sie mehr Kunden",
      description: "Präsentieren Sie Ihre Dienstleistungen einer breiten Zielgruppe und gewinnen Sie neue Kunden."
    },
    {
      icon: <FiDollarSign className="h-6 w-6 text-rose-500" />,
      title: "Einfache Bezahlung",
      description: "Sichere und schnelle Zahlungsabwicklung ohne Aufwand für Sie."
    },
    {
      icon: <FiCheckCircle className="h-6 w-6 text-rose-500" />,
      title: "Professionelles Profil",
      description: "Erstellen Sie ein beeindruckendes Profil, das Ihre Fähigkeiten optimal präsentiert."
    }
  ];
  
  // Features data for service seekers
  const seekerFeatures = [
    {
      icon: <FiCheckCircle className="h-6 w-6 text-rose-500" />,
      title: "Verifizierte Anbieter",
      description: "Alle Dienstleister werden sorgfältig überprüft, um Qualität zu gewährleisten."
    },
    {
      icon: <FiShield className="h-6 w-6 text-rose-500" />,
      title: "Sichere Transaktionen",
      description: "Bezahlen Sie erst, wenn Sie mit der Leistung zufrieden sind."
    },
    {
      icon: <FiClock className="h-6 w-6 text-rose-500" />,
      title: "Zeitsparend",
      description: "Finden Sie schnell den passenden Dienstleister für Ihre Bedürfnisse."
    }
  ];
  
  // Stats
  const stats = [
    { value: "10.000+", label: "Zufriedene Kunden" },
    { value: "5.000+", label: "Aktive Anbieter" },
    { value: "4.8/5", label: "Kundenbewertung" }
  ];
  
  // Password strength calculation
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    // Calculate password strength
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Contains lowercase letters
    if (/[a-z]/.test(password)) strength += 15;
    
    // Contains uppercase letters
    if (/[A-Z]/.test(password)) strength += 20;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 20;
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    setPasswordStrength(strength);
  }, [password]);
  
  // Get color based on strength
  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Get text based on strength
  const getStrengthText = () => {
    if (passwordStrength < 40) return 'Schwach';
    if (passwordStrength < 70) return 'Mittel';
    return 'Stark';
  };
  
  // Registration Success Component
  const RegistrationSuccessView = () => (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <FiCheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registrierung erfolgreich!</h2>
            <p className="text-gray-700 mb-6">
              Wir haben eine Bestätigungs-E-Mail an <span className="font-semibold">{registeredEmail}</span> gesendet.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 w-full mb-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                <FiAlertCircle className="h-5 w-5 text-rose-500 mr-2" />
                Nächste Schritte:
              </h3>
              <ol className="text-left text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="bg-rose-100 rounded-full h-5 w-5 flex items-center justify-center text-xs text-rose-600 font-bold mr-2 mt-0.5">1</span>
                  <span>Überprüfen Sie Ihren E-Mail-Posteingang (und ggf. den Spam-Ordner)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-rose-100 rounded-full h-5 w-5 flex items-center justify-center text-xs text-rose-600 font-bold mr-2 mt-0.5">2</span>
                  <span>Klicken Sie auf den Bestätigungslink in der E-Mail</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-rose-100 rounded-full h-5 w-5 flex items-center justify-center text-xs text-rose-600 font-bold mr-2 mt-0.5">3</span>
                  <span>Melden Sie sich an, um Ihr Konto zu vervollständigen</span>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={navigateToSignIn}
              className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg transition-colors"
            >
              Zur Anmeldeseite
            </button>
            <button
              onClick={() => setRegistrationSuccess(false)}
              className="text-gray-700 hover:text-rose-600 text-sm font-medium"
            >
              Zurück zur Registrierung
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Keine E-Mail erhalten? <button className="text-rose-600 font-medium hover:underline">Erneut senden</button></p>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col">
      {/* Hero Header */}
      <div className="w-full bg-gradient-to-r from-rose-600 to-rose-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Link href="/" className="flex justify-center">
              <span className="text-3xl font-bold text-white">Nearby</span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-white">Kostenlos Registrieren</h2>
            <p className="mt-2 text-md text-rose-100">Erstellen Sie ein Konto und entdecken Sie lokale Dienstleistungen</p>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Registration success state */}
        {registrationSuccess ? (
          <div className="w-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <RegistrationSuccessView />
          </div>
        ) : (
        <>
        {/* Left side - Features and benefits based on role */}
        <div className="lg:w-1/2 bg-gradient-to-br from-rose-600 via-rose-500 to-pink-500 p-8 flex items-center">
          <div className="w-full max-w-lg mx-auto">
            <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {role === 'service_provider' ? 
                  'Werden Sie ein Anbieter auf Nearby' : 
                  'Finden Sie lokale Dienstleistungen'
                }
              </h3>
              <p className="text-gray-700 font-medium">
                {role === 'service_provider' ? 
                  'Präsentieren Sie Ihre Dienstleistungen und erreichen Sie neue Kunden in Ihrer Region.' : 
                  'Entdecken Sie qualifizierte Anbieter in Ihrer Nähe für alle Ihre Bedürfnisse.'
                }
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 text-center">
                  <div className="text-2xl font-bold text-rose-600">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Features */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-8 border border-white/20">
              <h4 className="text-xl font-semibold text-gray-900 mb-5 border-b border-gray-200 pb-2">
                {role === 'service_provider' ? 'Ihre Vorteile als Anbieter:' : 'Ihre Vorteile als Kunde:'}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {(role === 'service_provider' ? providerFeatures : seekerFeatures).map((feature, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg hover:bg-rose-50 transition-all">
                    <div className="bg-rose-100 rounded-full p-3 mr-4 flex-shrink-0">
                      {React.cloneElement(feature.icon, { className: "h-6 w-6 text-rose-600" })}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">{feature.title}</h5>
                      <p className="text-gray-700 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Success story or promotion */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border-l-4 border-rose-500 border-t border-r border-b border-white/20">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 rounded-full p-2 mr-3">
                  <FiStar className="h-5 w-5 text-yellow-500" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {role === 'service_provider' ? 'Erfolgsgeschichte' : 'Vorteile der Premium-Mitgliedschaft'}
                </h4>
              </div>
              {role === 'service_provider' ? (
                <div className="flex flex-col">
                  <p className="text-gray-700 font-medium italic">
                    "Nach nur 3 Monaten auf Nearby konnte ich meine Auftragslage um 70% steigern und meinen Kundenstamm deutlich erweitern."
                  </p>
                  <div className="mt-3 flex items-center">
                    <div className="bg-rose-100 rounded-full h-8 w-8 flex items-center justify-center mr-2 text-rose-600 font-bold">MK</div> 
                    <span className="font-semibold text-gray-900">Michael K.</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-gray-700">Selbstständiger Handwerker</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 font-medium">
                    Erhalten Sie Zugang zu exklusiven Angeboten, priorisierten Anfragen und vergünstigten Dienstleistungen mit einem Premium-Konto.
                  </p>
                  <div className="mt-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium text-center">
                    Jetzt kostenlos für 30 Tage testen!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right side - Registration form */}
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
            
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Konto erstellen</h2>
                  <button
                    onClick={navigateToSignIn}
                    className="text-sm font-medium text-rose-600 hover:text-rose-500"
                  >
                    Bereits registriert?
                  </button>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Account type selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wie möchten Sie Nearby nutzen?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        className={`flex justify-center items-center border rounded-lg py-4 px-3 cursor-pointer transition-colors ${
                          role === 'user' 
                            ? 'bg-rose-100 border-rose-500 text-rose-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setRole('user')}
                      >
                        <div className="text-center">
                          <FiUser className="h-6 w-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">Dienste suchen</span>
                        </div>
                      </div>
                      <div 
                        className={`flex justify-center items-center border rounded-lg py-4 px-3 cursor-pointer transition-colors ${
                          role === 'service_provider' 
                            ? 'bg-rose-100 border-rose-500 text-rose-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setRole('service_provider')}
                      >
                        <div className="text-center">
                          <FiCheckCircle className="h-6 w-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">Dienste anbieten</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        <span>Vollständiger Name</span>
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-gray-50 text-gray-900"
                          placeholder="Ihr vollständiger Name"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Wird anderen Nutzern angezeigt</p>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        <span>E-Mail-Adresse</span>
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
                      <p className="mt-1 text-xs text-gray-500">Wir senden eine Bestätigung an diese Adresse</p>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        <span>Passwort</span>
                      </label>
                      <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-gray-50 text-gray-900"
                          placeholder="Mindestens 8 Zeichen"
                          minLength={8}
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
                      {password && (
                        <div className="mt-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                                style={{ width: `${passwordStrength}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs font-medium min-w-[40px] text-right">{getStrengthText()}</span>
                          </div>
                          <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                            <li className={password.length >= 8 ? "text-green-600" : ""}>
                              Mindestens 8 Zeichen
                            </li>
                            <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
                              Großbuchstaben (A-Z)
                            </li>
                            <li className={/[0-9]/.test(password) ? "text-green-600" : ""}>
                              Zahlen (0-9)
                            </li>
                            <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : ""}>
                              Sonderzeichen (!@#$%^&*)
                            </li>
                          </ul>
                        </div>
                      )}
                      {!password && (
                        <p className="mt-1 text-xs text-gray-500">Mindestens 8 Zeichen mit Buchstaben und Zahlen</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        <span>Passwort bestätigen</span>
                      </label>
                      <div className="relative">
                        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="new-password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`block w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-gray-50 text-gray-900 ${
                            confirmPassword && password !== confirmPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Passwort wiederholen"
                        />
                        {confirmPassword && password !== confirmPassword && (
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3">
                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      {confirmPassword && password !== confirmPassword && (
                        <p className="mt-1 text-xs text-red-500">Passwörter stimmen nicht überein</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-gray-700">
                          Ich stimme den <a href="#" className="text-rose-600 hover:text-rose-500 underline">Nutzungsbedingungen</a> und der <a href="#" className="text-rose-600 hover:text-rose-500 underline">Datenschutzrichtlinie</a> zu
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !termsAccepted || (confirmPassword !== "" && password !== confirmPassword)}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors
                      ${(isLoading || !termsAccepted || (confirmPassword !== "" && password !== confirmPassword)) ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Registrierung läuft...
                      </span>
                    ) : 'Konto erstellen'}
                  </button>
                </form>
              </div>
              
              <div className="bg-gray-100 px-8 py-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-500 mb-4">
                  Oder registrieren Sie sich mit
                </p>
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
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
} 