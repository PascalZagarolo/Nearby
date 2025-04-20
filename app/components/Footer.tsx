import Link from 'next/link';
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';
import CATEGORIES from '../constants/categories';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">Nearby</h3>
            <p className="text-gray-300 text-sm">
              Finde lokale Dienstleistungen und talentierte Fachleute in deiner Nähe. 
              Setze deine Projekte mit qualifizierten Profis um.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-500">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500">
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-500">
                <FiGithub className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategorien</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/search?category=${CATEGORIES[0].slug}`} className="text-gray-300 hover:text-rose-300">
                  {CATEGORIES[0].name}
                </Link>
              </li>
              <li>
                <Link href={`/search?category=${CATEGORIES[1].slug}`} className="text-gray-300 hover:text-rose-300">
                  {CATEGORIES[1].name}
                </Link>
              </li>
              <li>
                <Link href={`/search?category=${CATEGORIES[2].slug}`} className="text-gray-300 hover:text-rose-300">
                  {CATEGORIES[2].name}
                </Link>
              </li>
              <li>
                <Link href={`/search?category=${CATEGORIES[3].slug}`} className="text-gray-300 hover:text-rose-300">
                  {CATEGORIES[3].name}
                </Link>
              </li>
              <li>
                <Link href={`/search?category=${CATEGORIES[4].slug}`} className="text-gray-300 hover:text-rose-300">
                  {CATEGORIES[4].name}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-300 hover:text-rose-300">
                  Alle Kategorien anzeigen
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Über uns</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-rose-300">
                  Über Nearby
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-rose-300">
                  Karriere
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-rose-300">
                  Presse & News
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-gray-300 hover:text-rose-300">
                  Partnerschaften
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-rose-300">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-rose-300">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-rose-300">
                  Hilfe & Support
                </Link>
              </li>
              <li>
                <Link href="/trust" className="text-gray-300 hover:text-rose-300">
                  Sicherheit & Vertrauen
                </Link>
              </li>
              <li>
                <Link href="/selling" className="text-gray-300 hover:text-rose-300">
                  Dienstleistungen anbieten
                </Link>
              </li>
              <li>
                <Link href="/buying" className="text-gray-300 hover:text-rose-300">
                  Dienstleistungen buchen
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center">
            &copy; {year} Nearby. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 