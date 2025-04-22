'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiX, FiCheckCircle, FiSettings } from 'react-icons/fi';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieOptions, setCookieOptions] = useState({
    necessary: true, // Always true and can't be changed
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show consent popup after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    setCookieOptions({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptSelected = () => {
    saveConsent(cookieOptions);
  };

  const saveConsent = (options: typeof cookieOptions) => {
    localStorage.setItem('cookie-consent', JSON.stringify(options));
    setShowConsent(false);
  };

  const handleToggle = (key: keyof typeof cookieOptions) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setCookieOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showConsent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {!showSettings ? (
          // Main consent dialog
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Cookie-Einstellungen</h2>
              <button 
                onClick={() => setShowConsent(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <div className="prose prose-sm text-gray-700 mb-6">
              <p>
                Wir verwenden Cookies, um Ihnen ein optimales Websiteerlebnis zu bieten. Dazu zählen Cookies, die für den Betrieb der Seite notwendig sind, sowie solche, die nur zu Statistikzwecken, für Komforteinstellungen oder zur Anzeige personalisierter Inhalte genutzt werden.
              </p>
              <p>
                Sie können selbst entscheiden, welche Kategorien Sie zulassen möchten. Bitte beachten Sie, dass auf Basis Ihrer Einstellungen möglicherweise nicht alle Funktionen der Website zur Verfügung stehen.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
              <button
                onClick={() => setShowSettings(true)}
                className="order-2 sm:order-1 px-5 py-2.5 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <FiSettings className="h-4 w-4" />
                Einstellungen anpassen
              </button>
              
              <div className="order-1 sm:order-2 flex gap-3">
                <button
                  onClick={acceptSelected}
                  className="px-5 py-2.5 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg font-medium flex-1 sm:flex-none"
                >
                  Nur Notwendige
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-2.5 bg-rose-600 text-white hover:bg-rose-700 rounded-lg font-medium flex-1 sm:flex-none"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Detailed cookie settings
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Cookie-Einstellungen</h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6 mb-8">
              {/* Necessary cookies - always enabled */}
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <div className="w-10 h-6 bg-rose-600 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">Notwendige Cookies</h3>
                    <span className="text-xs bg-gray-100 text-gray-700 py-1 px-2 rounded">Immer aktiv</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
                  </p>
                </div>
              </div>
              
              {/* Analytics cookies */}
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <button 
                    onClick={() => handleToggle('analytics')}
                    className={`relative w-10 h-6 transition-colors duration-200 ease-in-out rounded-full ${
                      cookieOptions.analytics ? 'bg-rose-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${
                        cookieOptions.analytics ? 'transform translate-x-4' : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">Statistik-Cookies</h3>
                    <span className="text-xs bg-gray-100 text-gray-700 py-1 px-2 rounded">
                      {cookieOptions.analytics ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Diese Cookies helfen uns, die Nutzung der Website zu verstehen und zu analysieren, um das Nutzungserlebnis kontinuierlich zu verbessern.
                  </p>
                </div>
              </div>
              
              {/* Marketing cookies */}
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <button 
                    onClick={() => handleToggle('marketing')}
                    className={`relative w-10 h-6 transition-colors duration-200 ease-in-out rounded-full ${
                      cookieOptions.marketing ? 'bg-rose-600' : 'bg-gray-300'
                    }`}
                  >
                    <span 
                      className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${
                        cookieOptions.marketing ? 'transform translate-x-4' : ''
                      }`}
                    />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">Marketing-Cookies</h3>
                    <span className="text-xs bg-gray-100 text-gray-700 py-1 px-2 rounded">
                      {cookieOptions.marketing ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Diese Cookies werden verwendet, um Werbung und Inhalte besser auf Ihre Interessen abzustimmen.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-3 border-t pt-4">
              <button
                onClick={() => setShowSettings(false)}
                className="px-5 py-2.5 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg font-medium"
              >
                Zurück
              </button>
              <button
                onClick={acceptSelected}
                className="px-5 py-2.5 bg-rose-600 text-white hover:bg-rose-700 rounded-lg font-medium"
              >
                Auswahl speichern
              </button>
            </div>
          </div>
        )}
        
        {/* Footer with links */}
        <div className="px-6 py-3 bg-gray-50 text-xs text-gray-600 flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/datenschutz" className="hover:text-rose-600">Datenschutzerklärung</Link>
          <Link href="/impressum" className="hover:text-rose-600">Impressum</Link>
          <Link href="/agb" className="hover:text-rose-600">AGB</Link>
        </div>
      </div>
    </div>
  );
} 