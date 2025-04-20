import Link from 'next/link';
import Image from 'next/image';
import CATEGORIES from '../constants/categories';

const handwerksKategorien = [
  {
    id: 'handwerk',
    name: 'Handwerk & Reparaturen',
    description: 'Elektrik, Sanitär, Schreinerarbeiten und mehr',
    icon: '/icons/tools.svg',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  },
  {
    id: 'haushalt',
    name: 'Haushalt & Reinigungen',
    description: 'Haushaltsreinigung, Fensterreinigung und Gebäudereinigung',
    icon: '/icons/cleaning.svg',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'umzug',
    name: 'Umzug & Transport',
    description: 'Umzugshilfe, Möbeltransport und Logistik',
    icon: '/icons/moving.svg',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 'garten',
    name: 'Garten & Außenbereich',
    description: 'Gartenpflege, Landschaftsbau und Terrassengestaltung',
    icon: '/icons/gardening.svg',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'haustiere',
    name: 'Haustiere',
    description: 'Tiersitting, Gassiservice und Haustierpflege',
    icon: '/icons/pets.svg',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
  },
  {
    id: 'alltagshilfe',
    name: 'Familien & Alltagshilfe',
    description: 'Betreuung, Nachhilfe und Unterstützung im Alltag',
    icon: '/icons/family.svg',
    image: 'https://images.unsplash.com/photo-1603664454146-50b9bb1e7afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'technik',
    name: 'Technik & IT vor Ort',
    description: 'Computer-Reparatur, Netzwerkeinrichtung und technischer Support',
    icon: '/icons/tech.svg',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80',
  },
  {
    id: 'event',
    name: 'Event & Medien',
    description: 'Fotografie, Videografie und Event-Organisation',
    icon: '/icons/camera.svg',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Entdecke beliebte Service-Kategorien
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finde den perfekten Service für deine Projekte aus unserer vielfältigen Auswahl an Kategorien
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {handwerksKategorien.map((category) => (
            <Link 
              key={category.id}
              href={`/search?category=${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                <div className="relative h-48 w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:brightness-90 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-center justify-center p-4 group-hover:via-black/70 transition-all duration-300">
                    <div className="text-center">
                      <div className="bg-white rounded-full p-2 h-16 w-16 mx-auto mb-3 flex items-center justify-center">
                        <div className="text-rose-600 h-10 w-10 flex items-center justify-center">
                          {CATEGORIES.find(cat => cat.id === category.id)?.icon}
                        </div>
                      </div>
                      <h3 className="text-white font-bold text-lg">{category.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a
            href="/search"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Alle Kategorien anzeigen
          </a>
        </div>
      </div>
    </section>
  );
};

export default Categories; 