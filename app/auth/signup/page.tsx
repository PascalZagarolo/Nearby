'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiMapPin } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaMagnifyingGlass, FaUser } from 'react-icons/fa6';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [accountType, setAccountType] = useState('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      setError('Du musst den Nutzungsbedingungen und der Datenschutzerklärung zustimmen.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // In einer echten Anwendung würden Sie hier Ihre Registrierungs-API aufrufen
      // Für Demo-Zwecke simulieren wir eine erfolgreiche Registrierung
      setTimeout(() => {
        // Nach erfolgreicher Registrierung zur Startseite navigieren
        router.push('/');
        setIsLoading(false);
      }, 1500);
    } catch (_) {
      setError('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">Nearby</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Konto erstellen</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Oder{' '}
          <Link href="/auth/signin" className="font-medium text-rose-600 hover:text-rose-500">
            in dein Konto anmelden
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-50 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {/* Auswahl des Kontotyps */}
          <div className="mb-6">
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => setAccountType('buyer')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-md focus:outline-none flex flex-col items-center ${
                  accountType === 'buyer'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaMagnifyingGlass className="h-4 w-4 mr-2 mb-2" />
                Auftraggeber werden
              </button>
              <button
                type="button"
                onClick={() => setAccountType('seller')}
                className={`px-4 py-2.5 text-sm font-semibold rounded-md focus:outline-none flex flex-col items-center ${
                  accountType === 'seller'
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FaUser className="h-4 w-4 mr-2 mb-2" />
                Dienstleister werden
              </button>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Vollständiger Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  placeholder="Dein vollständiger Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-Mail-Adresse
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  placeholder="E-Mail-Adresse"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Standort
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  placeholder="Deine Stadt, Land"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passwort
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  placeholder="Passwort (mind. 8 Zeichen)"
                  minLength={8}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Das Passwort muss mindestens 8 Zeichen lang sein und einen Buchstaben und eine Zahl enthalten.
              </p>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Ich stimme den{' '}
                <Link href="/terms" className="text-rose-600 hover:text-rose-500">
                  Nutzungsbedingungen
                </Link>{' '}
                und der{' '}
                <Link href="/privacy" className="text-rose-600 hover:text-rose-500">
                  Datenschutzerklärung
                </Link>{' '}
                zu
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading || !agreeTerms}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 ${
                  (isLoading || !agreeTerms) ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Konto wird erstellt...' : 'Konto erstellen'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Oder registrieren mit</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FcGoogle className="h-5 w-5" />
                <span className="ml-2">Mit Google registrieren</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 