import React from 'react';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import NewServiceForm from './NewServiceForm';
import ServiceGuide from './ServiceGuide';
import { FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

export default async function NewServicePage() {
  const user = await getCurrentUser();
  
  if (!user) {
    return redirect('/auth/signin');
  }

  if (user.role !== 'service_provider') {
    return (
      <div className="p-8 text-center">
        <FiAlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Nur für Dienstleister</h2>
        <p className="mb-4 text-gray-600">
          Diese Seite ist nur für registrierte Dienstleister zugänglich.
        </p>
        <Link 
          href="/dashboard"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Zurück zum Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Neues Angebot erstellen</h1>
      <p className="mb-6 text-gray-800">Erstelle dein Angebot mit mehreren Preispaketen (Basic, Standard, Premium). Desto detaillierter deine Beschreibung ist, desto besser können potenzielle Kunden deine Dienstleistung verstehen.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800 font-medium">
                    Mit verschiedenen Preispaketen (Basic, Standard, Premium) kannst du verschiedene Kundenbedürfnisse ansprechen und deine Umsatzchancen erhöhen.
                  </p>
                </div>
              </div>
            </div>
            
            <NewServiceForm />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <ServiceGuide />
        </div>
      </div>
    </div>
  );
} 