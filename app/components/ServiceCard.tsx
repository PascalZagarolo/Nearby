import Link from 'next/link';
import Image from 'next/image';
import { FiStar, FiMapPin, FiHeart } from 'react-icons/fi';
import CATEGORIES from '../constants/categories';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  category: string;
  image: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
  };
  userType?: 'dienstleister' | 'arbeitgeber';
}

const ServiceCard = ({
  id,
  title,
  description,
  price,
  rating,
  reviews,
  location,
  category,
  image,
  seller,
  userType = 'dienstleister',
}: ServiceCardProps) => {
  // Find the category object to get its icon
  const categoryObj = CATEGORIES.find(cat => cat.id === category || cat.name === category);
  const categoryName = categoryObj?.name || category;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full">
      <Link href={`/gigs/${id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <button 
            className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-80 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              // Logik zum Hinzufügen zu Favoriten würde hier stehen
            }}
          >
            <FiHeart className="h-5 w-5 text-gray-600 hover:text-red-500" />
          </button>
          
          {/* User Type Badge - positioned at top left */}
          <div className="absolute top-2 left-2">
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                userType === 'dienstleister' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {userType === 'dienstleister' ? 'Dienstleister' : 'Arbeitgeber'}
            </span>
          </div>
          
          {/* Category Badge - stays at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-500 text-white text-xs font-semibold rounded-md">
              {categoryObj?.icon && <span className="text-white">{categoryObj.icon}</span>}
              {categoryName}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-8 w-8 rounded-full overflow-hidden relative flex-shrink-0">
            <Image
              src={seller.avatar}
              alt={seller.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Link href={`/profile/${seller.id}`} className="text-sm hover:underline text-gray-900 font-semibold">
              {seller.name}
            </Link>
          </div>
        </div>
        
        <Link href={`/gigs/${id}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-rose-500 text-gray-800 transition duration-150 h-14">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
          {description}
        </p>
        
        <div className="flex items-center space-x-1 text-yellow-500 mb-2">
          <FiStar className="h-4 w-4 fill-current" />
          <span className="font-medium text-sm">{rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">({reviews})</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <FiMapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-auto">
          <p className="text-xs text-gray-500">{userType === 'dienstleister' ? 'Ab' : 'Budget'}</p>
          <p className="text-xl font-bold text-gray-900">{price}€</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 