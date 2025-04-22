'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX, FiUser, FiSettings, FiMessageSquare, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { FaHouseFire } from 'react-icons/fa6';
import { BsArrowRight } from 'react-icons/bs';
import { useAuth } from '../contexts/AuthContext';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="flex flex-row items-center space-x-4 text-2xl font-bold bg-gradient-to-r from-rose-400  to-rose-600 bg-clip-text text-transparent">
              <div className='mr-2'>
              <FaHouseFire 
              className='text-rose-800'
              />
              </div>
                Nearby
              </span>

            </Link>
            <div className="hidden sm:ml-16 sm:flex sm:space-x-8">
              <Link
                href="/explore"
                className={`${pathname === '/explore'
                    ? 'border-rose-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Entdecken
              </Link>
              {/* 
              <Link
                href="/gigs"
                className={`${pathname === '/gigs'
                    ? 'border-rose-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Gigs
              </Link>
              */}
              <Link
                href="/search"
                className={`${pathname === '/search'
                    ? 'border-rose-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Suchen
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="ml-3 relative flex items-center space-x-4">
                {user?.role === 'service_provider' && (
                  <Link
                    href="/dashboard/services/new"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Angebot erstellen
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                
                {/* User dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    onClick={toggleProfileDropdown}
                    aria-expanded={isProfileDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    {user?.avatar ? (
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.avatar}
                        alt={`${user.name}'s profile`}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 text-sm font-medium">
                          {user?.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </button>
                  
                  {/* Dropdown menu */}
                  {isProfileDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      
                      <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FiUser className="mr-3 h-4 w-4 text-gray-400" />
                        Mein Profil
                      </Link>
                      <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FiSettings className="mr-3 h-4 w-4 text-gray-400" />
                        Dashboard
                      </Link>
                      <Link href="/messages" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FiMessageSquare className="mr-3 h-4 w-4 text-gray-400" />
                        Nachrichten
                      </Link>
                      <Link href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FiHelpCircle className="mr-3 h-4 w-4 text-gray-400" />
                        Hilfe
                      </Link>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button 
                        onClick={() => logout()}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiLogOut className="mr-3 h-4 w-4 text-gray-400" />
                        Ausloggen
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="ml-3 relative">
                <div className="flex space-x-4">
                  <Link
                    href="/auth/signin"
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Einloggen
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-gradient-to-r from-rose-600 to-rose-800 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-rose-900 font-semibold flex flex-row items-center"
                  >
                    <BsArrowRight className="h-4 w-4 mr-2" />
                    Jetzt starten
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/explore"
              className={`${pathname === '/explore'
                  ? 'bg-rose-50 border-rose-500 text-rose-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Entdecken
            </Link>
            <Link
              href="/search"
              className={`${pathname === '/search'
                  ? 'bg-rose-50 border-rose-500 text-rose-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Suchen
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {user?.avatar ? (
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt={`${user.name}'s profile`}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 text-sm font-medium">
                          {user?.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <FiUser className="mr-3 h-5 w-5 text-gray-400" />
                    Mein Profil
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <FiSettings className="mr-3 h-5 w-5 text-gray-400" />
                    Dashboard
                  </Link>
                  <Link
                    href="/messages"
                    className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <FiMessageSquare className="mr-3 h-5 w-5 text-gray-400" />
                    Nachrichten
                  </Link>
                  {user?.role === 'service_provider' && (
                    <Link
                      href="/dashboard/services/new"
                      className="flex items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    >
                      <FiSettings className="mr-3 h-5 w-5 text-gray-400" />
                      Angebot erstellen
                    </Link>
                  )}
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-3 h-5 w-5 text-gray-400" />
                    Ausloggen
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 space-y-1">
                <Link
                  href="/auth/signin"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Einloggen
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Registrieren
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 