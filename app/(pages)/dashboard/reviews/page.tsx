'use client';

import React, { useState } from 'react';
import { FiInfo, FiFilter } from 'react-icons/fi';
import ReviewStats from './ReviewStats';
import ReviewsList from './ReviewsList';


// Mock data for demonstration purposes


const mockReviews = [
  {
    id: '1',
    reviewer: {
      id: 'user1',
      name: 'Max Mustermann',
      image: '/avatars/max.jpg',
      country: 'Deutschland'
    },
    rating: 5,
    date: '2023-12-15T10:30:00Z',
    text: 'Sehr professioneller Service. Die Arbeit wurde schnell und in ausgezeichneter Qualität geliefert. Ich bin sehr zufrieden und werde definitiv wieder buchen!',
    response: {
      date: '2023-12-16T09:15:00Z',
      text: 'Vielen Dank für Ihre positive Bewertung, Max! Es war mir eine Freude, mit Ihnen zusammenzuarbeiten. Ich freue mich auf zukünftige Projekte.'
    }
  },
  {
    id: '2',
    reviewer: {
      id: 'user2',
      name: 'Anna Schmidt',
      image: '/avatars/anna.jpg',
      country: 'Österreich'
    },
    rating: 4,
    date: '2023-12-10T14:20:00Z',
    text: 'Gute Kommunikation und pünktliche Lieferung. Die Qualität der Arbeit war insgesamt gut, mit kleinen Verbesserungsmöglichkeiten.'
  },
  {
    id: '3',
    reviewer: {
      id: 'user3',
      name: 'Thomas Weber',
      image: '/avatars/thomas.jpg',
      country: 'Schweiz'
    },
    rating: 5,
    date: '2023-12-05T08:45:00Z',
    text: 'Hervorragende Arbeit! Alle Anforderungen wurden perfekt umgesetzt und sogar Vorschläge zur Verbesserung gemacht. Sehr empfehlenswert!',
    response: {
      date: '2023-12-05T16:30:00Z',
      text: 'Danke für die tolle Bewertung, Thomas! Es freut mich sehr, dass Sie mit dem Ergebnis zufrieden sind. Ihre Projektanforderungen waren klar und präzise, was die Zusammenarbeit sehr angenehm gemacht hat.'
    }
  },
  {
    id: '4',
    reviewer: {
      id: 'user4',
      name: 'Julia Becker',
      image: '/avatars/julia.jpg',
      country: 'Deutschland'
    },
    rating: 3,
    date: '2023-11-28T11:20:00Z',
    text: 'Die Arbeit war in Ordnung, aber die Kommunikation hätte besser sein können. Einige Missverständnisse führten zu Verzögerungen im Projekt.'
  },
  {
    id: '5',
    reviewer: {
      id: 'user5',
      name: 'Michael Klein',
      image: '/avatars/michael.jpg',
      country: 'Deutschland'
    },
    rating: 5,
    date: '2023-11-20T09:15:00Z',
    text: 'Absolut begeistert von der Qualität und Schnelligkeit! Hat meine Erwartungen übertroffen und ich werde definitiv wieder buchen.',
    response: {
      date: '2023-11-21T10:00:00Z',
      text: 'Vielen herzlichen Dank für Ihre tolle Bewertung, Michael! Es war mir eine Freude, an Ihrem Projekt zu arbeiten. Ich stehe jederzeit für zukünftige Projekte zur Verfügung.'
    }
  }
];

// Calculate review statistics
const calculateStats = (reviews : {rating: number, date: string, text: string, response?: {date: string, text: string}}[]) => {
  const totalReviews = reviews.length;
  
  if (totalReviews === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      stats: Array.from({ length: 5 }, (_, i) => ({
        rating: 5 - i,
        count: 0,
        percentage: 0
      }))
    };
  }
  
  const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = sumRatings / totalReviews;
  
  // Count ratings
  const counts = [0, 0, 0, 0, 0]; // for ratings 1-5
  reviews.forEach(review => {
    counts[review.rating - 1]++;
  });
  
  // Create stats array (from 5 to 1 stars)
  const stats = Array.from({ length: 5 }, (_, i) => {
    const rating = 5 - i;
    const count = counts[rating - 1];
    return {
      rating,
      count,
      percentage: (count / totalReviews) * 100
    };
  });
  
  return {
    totalReviews,
    averageRating,
    stats
  };
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  console.log(setReviews)
  const [filterRating, setFilterRating] = useState<number | null>(null);
  
  const filteredReviews = filterRating 
    ? reviews.filter(review => review.rating === filterRating)
    : reviews;
    
  const stats = calculateStats(reviews);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Meine Bewertungen</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <FiInfo className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-semibold text-blue-800 mb-1">Warum Bewertungen wichtig sind</h4>
            <p className="text-sm text-blue-700">
              Gute Bewertungen können Ihre Sichtbarkeit erhöhen und das Vertrauen potenzieller Kunden stärken. 
              Antworten Sie zeitnah und professionell auf Bewertungen, um Ihr Engagement zu zeigen.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ReviewStats 
            totalReviews={stats.totalReviews}
            averageRating={stats.averageRating}
            stats={stats.stats}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="mb-6 flex justify-end">
            <div className="relative inline-block">
              <button 
                className="flex items-center text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
                onClick={() => setFilterRating(null)}
              >
                <FiFilter className="mr-2" />
                {filterRating ? `${filterRating} Sterne` : 'Alle Bewertungen'}
              </button>
              {filterRating === null && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <button
                        key={rating}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setFilterRating(rating)}
                      >
                        {rating} Sterne
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <ReviewsList reviews={filteredReviews} />
        </div>
      </div>
    </div>
  );
} 