'use client';


import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { FaHouseFire } from 'react-icons/fa6';
import { BsArrowRight } from 'react-icons/bs';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                href="/services"
                className={`${pathname === '/services'
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
            {/* 
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                placeholder="Search services"
                type="search"
              />
            </div>
            */}
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
              href="/services"
              className={`${pathname === '/services'
                  ? 'bg-rose-50 border-rose-500 text-rose-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Explore Services
            </Link>
            <Link
              href="/gigs"
              className={`${pathname === '/gigs'
                  ? 'bg-rose-50 border-rose-500 text-rose-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Gigs
            </Link>
            <Link
              href="/search"
              className={`${pathname === '/search'
                  ? 'bg-rose-50 border-rose-500 text-rose-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Search
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Guest User</div>
                <div className="text-sm font-medium text-gray-500">guest@example.com</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Link
                href="/auth/signin"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 