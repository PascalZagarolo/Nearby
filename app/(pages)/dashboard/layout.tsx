import React from 'react';
import Link from 'next/link';
import { FiGrid, FiPackage, FiMessageSquare, FiStar, FiSettings } from 'react-icons/fi';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  
  if (!user) {
    return redirect('/auth/signin');
  }

  const navItems = [
    { icon: <FiGrid className="w-5 h-5" />, label: 'Übersicht', href: '/dashboard' },
    { icon: <FiPackage className="w-5 h-5" />, label: 'Meine Angebote', href: '/dashboard/services' },
    { icon: <FiMessageSquare className="w-5 h-5" />, label: 'Nachrichten', href: '/dashboard/messages' },
    { icon: <FiStar className="w-5 h-5" />, label: 'Bewertungen', href: '/dashboard/reviews' },
    { icon: <FiSettings className="w-5 h-5" />, label: 'Einstellungen', href: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-full min-h-screen">
      <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6 px-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group flex items-center px-3 py-2.5 my-1 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="text-gray-500 group-hover:text-gray-700 mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 