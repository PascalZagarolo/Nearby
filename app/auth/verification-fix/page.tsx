'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function VerificationFix() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch('/api/auth/verify-manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Verifikation fehlgeschlagen');
      }
      
      setSuccess(true);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col">
      {/* Hero Header */}
      <div className="w-full bg-gradient-to-r from-rose-600 to-rose-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Link href="/" className="flex justify-center">
              <span className="text-3xl font-bold text-white">Nearby</span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold text-white">E-Mail-Verifizierung Reparieren</h2>
            <p className="mt-2 text-md text-rose-100">Lösen Sie Probleme mit Ihrer E-Mail-Verifizierung</p>
          </div>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm flex items-start shadow-md">
              <FiAlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-600 text-sm flex items-start shadow-md">
              <FiCheck className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>E-Mail wurde erfolgreich verifiziert! Sie können sich jetzt <Link href="/auth/signin" className="underline font-semibold">anmelden</Link>.</p>
            </div>
          )}
          
          <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
                  <FiMail className="h-8 w-8 text-rose-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">E-Mail-Verifizierung Reparieren</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Wenn Sie Probleme mit der E-Mail-Verifizierung haben, können Sie diese hier beheben.
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                  <p className="mt-1 text-xs text-gray-500">Geben Sie die E-Mail-Adresse ein, mit der Sie sich registriert haben.</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifizierung läuft...
                    </span>
                  ) : 'E-Mail verifizieren'}
                </button>
              </form>
            </div>
            
            <div className="bg-gray-100 px-8 py-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Zurück zur <Link href="/auth/signin" className="text-rose-600 hover:text-rose-500 font-medium">Anmeldeseite</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 