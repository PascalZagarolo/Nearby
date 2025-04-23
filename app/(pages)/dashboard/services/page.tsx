import React from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit, FiTrash, FiEye, FiAlertCircle } from 'react-icons/fi';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

// Mock data - in a real app, these would come from a database
const mockServices = [
  {
    id: '1',
    title: 'Professionelle Gartenarbeit',
    status: 'active',
    price: 80,
    views: 243,
    orders: 5,
    created: '2023-09-15'
  },
  {
    id: '2',
    title: 'Umzugshelfer mit Transporter',
    status: 'active',
    price: 120, 
    views: 187,
    orders: 12,
    created: '2023-08-22'
  },
  {
    id: '3',
    title: 'IT Support & PC Reparatur',
    status: 'draft',
    price: 65,
    views: 0,
    orders: 0,
    created: '2023-09-28'
  }
];

export default async function ServicesPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    return redirect('/auth/signin');
  }

  if (user.role !== 'service_provider') {
    return (
      <div className="p-8 text-center">
        <FiAlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Nur für Dienstleister</h2>
        <p className="mb-4 text-gray-700">
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meine Angebote</h1>
        <Link
          href="/dashboard/services/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiPlus className="mr-2" />
          Neues Angebot
        </Link>
      </div>
      
      <div className="bg-white shadow-md overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {mockServices.map((service) => (
            <li key={service.id} className="hover:bg-gray-50 transition-colors">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-blue-600 truncate">{service.title}</p>
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {service.status === 'active' ? 'Aktiv' : 'Entwurf'}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      href={`/dashboard/services/edit/${service.id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiEdit className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`/services/${service.id}`}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiEye className="h-5 w-5" />
                    </Link>
                    <button className="text-gray-500 hover:text-red-600">
                      <FiTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm font-medium text-gray-700">
                      {service.price} €
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-700 sm:mt-0">
                    <p className="mr-4">Aufrufe: <span className="font-medium">{service.views}</span></p>
                    <p className="mr-4">Aufträge: <span className="font-medium">{service.orders}</span></p>
                    <p>Erstellt: <span className="font-medium">{service.created}</span></p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 