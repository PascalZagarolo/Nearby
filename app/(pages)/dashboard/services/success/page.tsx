import React from 'react';
import Link from 'next/link';
import { FiCheckCircle, FiEdit, FiEye, FiArrowLeft } from 'react-icons/fi';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export default async function ServiceSuccessPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    return redirect('/auth/signin');
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-5">
          <FiCheckCircle className="h-7 w-7 text-green-600" />
        </div>
        
        <h2 className="text-xl font-semibold mb-3">Angebot erfolgreich erstellt!</h2>
        <p className="text-gray-700 mb-6">
          Dein Angebot wurde als Entwurf gespeichert. Du kannst es jederzeit bearbeiten und veröffentlichen.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/dashboard/services"
            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiArrowLeft className="mr-2" />
            Zurück zu meinen Angeboten
          </Link>
          
          <Link
            href="/dashboard/services/edit/latest"
            className="inline-flex items-center justify-center w-full px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiEdit className="mr-2" />
            Angebot bearbeiten
          </Link>
          
          <Link
            href="/services/preview/latest"
            className="inline-flex items-center justify-center w-full px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiEye className="mr-2" />
            Vorschau anzeigen
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium mb-3">Nächste Schritte:</h3>
          <ul className="space-y-3 text-left">
            <li className="flex items-start text-sm text-gray-700">
              <span className="mr-2 font-medium">1.</span>
              <span>Füge weitere Details und Bilder hinzu, um dein Angebot attraktiver zu gestalten</span>
            </li>
            <li className="flex items-start text-sm text-gray-700">
              <span className="mr-2 font-medium">2.</span>
              <span>Veröffentliche dein Angebot, damit potenzielle Kunden es finden können</span>
            </li>
            <li className="flex items-start text-sm text-gray-700">
              <span className="mr-2 font-medium">3.</span>
              <span>Teile den Link zu deinem Angebot in deinen sozialen Netzwerken</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 