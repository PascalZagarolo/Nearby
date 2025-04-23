'use client';

import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { FiStar, FiMessageCircle, FiChevronDown } from 'react-icons/fi';

interface Reviewer {
  id: string;
  name: string;
  image: string;
  country: string;
}

interface Response {
  date: string;
  text: string;
}

interface Review {
  id: string;
  reviewer: Reviewer;
  rating: number;
  date: string;
  text: string;
  response?: Response;
}

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd. MMMM yyyy', { locale: de });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Bewertungen ({reviews.length})</h2>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            Neueste zuerst
            <FiChevronDown className="ml-1" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {reviews.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Keine Bewertungen vorhanden.
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <img
                    src={review.reviewer.image || '/avatars/placeholder.jpg'}
                    alt={review.reviewer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-900 mr-2">
                      {review.reviewer.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {review.reviewer.country}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.text}</p>
                  
                  {review.response && (
                    <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-blue-500">
                      <div className="flex items-center mb-2">
                        <FiMessageCircle className="text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          Ihre Antwort
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(review.response.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{review.response.text}</p>
                    </div>
                  )}
                  
                  {!review.response && (
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Auf Bewertung antworten
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 