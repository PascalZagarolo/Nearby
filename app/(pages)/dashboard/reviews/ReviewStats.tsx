'use client';

import React from 'react';
import { FiStar } from 'react-icons/fi';

interface ReviewStat {
  rating: number;
  count: number;
  percentage: number;
}

interface ReviewStatsProps {
  averageRating: number;
  totalReviews: number;
  stats: ReviewStat[];
}

export default function ReviewStats({ averageRating, totalReviews, stats }: ReviewStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Bewertungsstatistik</h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-3xl font-bold text-gray-900 mr-2">{averageRating.toFixed(1)}</span>
            <FiStar className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-sm text-gray-500">
            basierend auf {totalReviews} {totalReviews === 1 ? 'Bewertung' : 'Bewertungen'}
          </p>
        </div>
        
        <div className="flex-grow w-full">
          {stats.map((stat) => (
            <div key={stat.rating} className="flex items-center mb-2">
              <div className="flex items-center w-20">
                <span className="text-sm mr-1">{stat.rating}</span>
                <FiStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex-grow mx-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-14 text-right">
                <span className="text-sm text-gray-600">{stat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{totalReviews > 0 ? Math.round(stats[4].percentage) : 0}%</p>
            <p className="text-sm text-gray-600">5-Sterne Bewertungen</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{Math.round(totalReviews * 0.8)}</p>
            <p className="text-sm text-gray-600">Antwortrate</p>
          </div>
        </div>
      </div>
    </div>
  );
} 