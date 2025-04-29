'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { 
  FiPackage, 
  FiStar, 
  FiUsers, 
  FiMessageSquare, 
  FiDollarSign, 

  FiCalendar, 
  FiClock,

  FiBarChart2,
  FiArrowUp,
  FiArrowDown,
  FiCheckCircle,
  FiAlertCircle,
  FiActivity,
  FiMoreHorizontal
} from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import { Doughnut, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title
);

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('month'); // week, month, year
  
  // Mock user data - in a real app, this would come from a database
  const user = {
    name: 'Max Mustermann',
    profileImage: '/avatars/profile.jpg',
    role: 'service_provider',
    level: 'Level 2 Verkäufer',
    memberSince: '2021-06-15',
    balance: 1250.75
  };

  // Mock stats - in a real app, these would come from a database
  const stats = [
    { 
      title: 'Aktive Angebote', 
      value: '5', 
      change: '+1',
      increased: true,
      icon: <FiPackage className="h-6 w-6 text-rose-600" />,
      href: '/dashboard/services'
    },
    { 
      title: 'Neue Anfragen', 
      value: '12', 
      change: '+3',
      increased: true,
      icon: <FiUsers className="h-6 w-6 text-emerald-600" />,
      href: '/dashboard/orders'
    },
    { 
      title: 'Ungelesene Nachrichten', 
      value: '3', 
      change: '-2',
      increased: false,
      icon: <FiMessageSquare className="h-6 w-6 text-amber-600" />,
      href: '/dashboard/messages'
    },
    { 
      title: 'Neue Bewertungen', 
      value: '2', 
      change: '+2',
      increased: true,
      icon: <FiStar className="h-6 w-6 text-purple-600" />,
      href: '/dashboard/reviews'
    },
  ];

  // Mock performance data
  const performanceMetrics = [
    { 
      title: 'Durchschnittliche Antwortzeit', 
      value: '2.5 Std', 
      icon: <FiClock className="h-5 w-5 text-rose-500" />,
      desc: '12% schneller als der Durchschnitt'
    },
    { 
      title: 'Abschlussquote', 
      value: '95%', 
      icon: <FiCheckCircle className="h-5 w-5 text-emerald-500" />, 
      desc: '5% über deinem Ziel'
    },
    { 
      title: 'Reaktionsrate', 
      value: '98%', 
      icon: <FiActivity className="h-5 w-5 text-amber-500" />, 
      desc: 'Übertrifft die Anforderungen für Level 3'
    },
  ];

  // Mock recent activities
  const recentActivity = [
    { 
      type: 'order', 
      title: 'Neue Bestellung', 
      description: 'Logo-Design für TechStartup GmbH', 
      time: 'Vor 2 Stunden',
      amount: '€120,00',
      status: 'pending'
    },
    { 
      type: 'message', 
      title: 'Neue Nachricht', 
      description: 'Anfrage zu Ihrem Webdesign-Paket', 
      time: 'Vor 5 Stunden',
      status: 'unread'
    },
    { 
      type: 'review', 
      title: 'Neue Bewertung', 
      description: '5 Sterne für UI/UX Design', 
      time: 'Gestern',
      status: 'positive'
    },
    { 
      type: 'payout', 
      title: 'Auszahlung abgeschlossen', 
      description: 'Monatliche Auszahlung für April', 
      time: 'Vor 2 Tagen',
      amount: '€850,00',
      status: 'completed'
    },
  ];

  // Chart data for earnings
  const earningsData = {
    labels: timeRange === 'week' 
      ? ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] 
      : timeRange === 'month'
      ? ['1. Woche', '2. Woche', '3. Woche', '4. Woche']
      : ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Einnahmen (€)',
        data: timeRange === 'week' 
          ? [120, 190, 30, 250, 180, 80, 0] 
          : timeRange === 'month' 
          ? [450, 380, 520, 390] 
          : [1200, 1900, 1600, 2500, 1800, 2200, 2400, 1900, 2100, 2500, 2300, 2700],
        borderColor: 'rgb(244, 63, 94)',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const earningsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: false
        }
      },
    },
  };

  // Chart data for order sources
  const orderSourcesData = {
    labels: ['Direktsuche', 'Empfehlungen', 'Rückkehrer', 'Social Media'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ['#f43f5e', '#10b981', '#8b5cf6', '#f59e0b'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const orderSourcesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 12,
          padding: 20,
          font: {
            size: 11
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: { label: string; parsed: number; dataset: { data: number[] }; }) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const dataset = context.dataset;
            const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value})`;
          }
        }
      }
    },
    cutout: '75%',
  };

  // Chart data for ratings distribution
  const ratingsData = {
    labels: ['5 Sterne', '4 Sterne', '3 Sterne', '2 Sterne', '1 Stern'],
    datasets: [
      {
        label: 'Anzahl der Bewertungen',
        data: [25, 8, 2, 0, 0],
        backgroundColor: ['#10b981', '#34d399', '#fcd34d', '#f97316', '#ef4444'],
        borderWidth: 0,
      },
    ],
  };

  const ratingsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          precision: 0,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    indexAxis: 'y' as const,
    barThickness: 12,
    maxBarThickness: 15,
    barPercentage: 0.8,
  };

  // Progress to next level
  const nextLevelProgress = 70;
  
  return (
    <div>
      {/* Header with greeting and balance */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Willkommen, {user.name}</h1>
          <p className="text-gray-600">{user.level} • Mitglied seit {new Date(user.memberSince).toLocaleDateString('de-DE')}</p>
        </div>
       
      </div>
      
      {/* Main stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <Link href={stat.href} key={index} className="block">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-gray-50">
                  {stat.icon}
                </div>
                <div className={`flex items-center text-sm font-medium ${stat.increased ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.increased ? <FiArrowUp className="h-3 w-3 mr-1" /> : <FiArrowDown className="h-3 w-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {/* Earnings Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Einnahmen-Übersicht</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeRange('week')} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-rose-100 text-rose-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Woche
              </button>
              <button 
                onClick={() => setTimeRange('month')} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-rose-100 text-rose-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Monat
              </button>
              <button 
                onClick={() => setTimeRange('year')} 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'year' ? 'bg-rose-100 text-rose-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                Jahr
              </button>
            </div>
          </div>
          <div className="h-[280px]">
            <Line options={earningsOptions} data={earningsData} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div className="p-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Gesamt</p>
              <p className="text-lg font-semibold text-gray-900">€{timeRange === 'week' ? '850' : timeRange === 'month' ? '1.740' : '24.700'}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Durchschnitt</p>
              <p className="text-lg font-semibold text-gray-900">€{timeRange === 'week' ? '121' : timeRange === 'month' ? '435' : '2.058'}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">Wachstum</p>
              <p className="text-lg font-semibold text-emerald-600">+{timeRange === 'week' ? '8' : timeRange === 'month' ? '12' : '15'}%</p>
            </div>
          </div>
        </div>
        
        {/* Order Sources Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Auftragsquellen</h2>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[250px] h-[260px]">
              <Doughnut options={orderSourcesOptions} data={orderSourcesData} />
              <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-3xl font-bold text-gray-900">35</p>
                <p className="text-xs text-gray-500">Aufträge gesamt</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <p className="text-sm text-gray-600">Durchschnittlicher Auftragswert</p>
              <p className="text-sm font-semibold text-gray-900">€143,50</p>
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="text-sm text-gray-600">Auftragsabschlussrate</p>
              <p className="text-sm font-semibold text-gray-900">68%</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Leistungsmetriken</h2>
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-start">
                <div className="p-2 bg-gray-50 rounded-lg mr-3">
                  {metric.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{metric.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-lg font-semibold text-gray-900 mr-2">{metric.value}</p>
                    <p className="text-xs text-emerald-600">{metric.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Level progress */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-900">Fortschritt zu Level 3</p>
              <p className="text-sm font-medium text-gray-900">{nextLevelProgress}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: `${nextLevelProgress}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Noch 30 Tage bis zur nächsten Bewertung</p>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Letzte Aktivitäten</h2>
            <Link href="/dashboard/activities" className="text-sm text-rose-600 hover:text-rose-700 font-medium flex items-center">
              Alle anzeigen
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center bg-gray-50 p-3.5 rounded-lg transition-colors border border-gray-100 hover:border-gray-200">
                <div className={`p-2.5 rounded-full mr-4 flex-shrink-0 ${
                  activity.type === 'order' ? 'bg-emerald-100 text-emerald-600' :
                  activity.type === 'message' ? 'bg-amber-100 text-amber-600' :
                  activity.type === 'review' ? 'bg-purple-100 text-purple-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {activity.type === 'order' && <FiPackage className="h-5 w-5" />}
                  {activity.type === 'message' && <FiMessageSquare className="h-5 w-5" />}
                  {activity.type === 'review' && <FiStar className="h-5 w-5" />}
                  {activity.type === 'payout' && <FiDollarSign className="h-5 w-5" />}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <div className="flex items-center ml-3">
                      {activity.amount && (
                        <p className="text-sm font-semibold text-gray-900 mr-2">{activity.amount}</p>
                      )}
                      {activity.status === 'pending' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          Offen
                        </span>
                      )}
                      {activity.status === 'unread' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                          Neu
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-500 ml-3 whitespace-nowrap">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-2 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700 font-medium inline-flex items-center">
              Mehr laden
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Ratings and quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Ratings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Bewertungs-Übersicht</h2>
          <div className="flex items-center justify-center gap-8 mb-5 pb-4 border-b border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 flex items-center justify-center">
                4.7 <FiStar className="h-5 w-5 text-amber-400 ml-1 fill-amber-400" />
              </p>
              <p className="text-sm text-gray-500">Durchschnitt</p>
            </div>
            <div className="h-10 border-r border-gray-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">35</p>
              <p className="text-sm text-gray-500">Bewertungen</p>
            </div>
          </div>
          <div className="h-[180px] w-full">
            <Bar options={ratingsOptions} data={ratingsData} />
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <Link 
              href="/dashboard/reviews" 
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Alle Bewertungen ansehen
            </Link>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Schnellzugriff</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Link href="/dashboard/services/new" className="group">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-colors text-center group-hover:shadow-sm">
                <FiPackage className="h-6 w-6 text-rose-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 group-hover:text-rose-700">Neues Angebot</p>
              </div>
            </Link>
            <Link href="/dashboard/messages" className="group">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors text-center group-hover:shadow-sm">
                <FiMessageSquare className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 group-hover:text-amber-700">Nachrichten</p>
              </div>
            </Link>
            <Link href="/dashboard/reviews" className="group">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-center group-hover:shadow-sm">
                <FiStar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Bewertungen</p>
              </div>
            </Link>
            <Link href="/dashboard/orders" className="group">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-center group-hover:shadow-sm">
                <FiUsers className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">Aufträge</p>
              </div>
            </Link>
            <Link href="/dashboard/analytics" className="group">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-center group-hover:shadow-sm">
                <FiBarChart2 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Statistiken</p>
              </div>
            </Link>
            <Link href="/dashboard/settings" className="group">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-100 transition-colors text-center group-hover:shadow-sm">
                <FiMoreHorizontal className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Mehr</p>
              </div>
            </Link>
          </div>
          
          {/* Upcoming tasks */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Anstehende Aufgaben</h3>
            <div className="space-y-2">
              <div className="flex items-center p-2 bg-amber-50 rounded-lg border border-amber-100">
                <FiAlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                <p className="text-sm text-amber-800">2 unbeantwortete Anfragen benötigen Ihre Aufmerksamkeit</p>
              </div>
              <div className="flex items-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                <FiCalendar className="h-5 w-5 text-blue-600 mr-2" />
                <p className="text-sm text-blue-800">Aktualisieren Sie Ihre Verfügbarkeit für nächste Woche</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 