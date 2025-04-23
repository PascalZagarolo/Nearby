'use client';

import React, { useState } from 'react';
import { 
  FiUser, 
  FiBell, 
  FiLock, 
  FiCreditCard, 
  FiChevronRight, 
  FiToggleRight, 
  FiToggleLeft,
  FiEdit,
  FiSave,
  FiX,
  FiShield,
  FiImage,
  FiGlobe,
  FiFileText,
  FiActivity,
  FiDownload,
  FiUpload,
  FiDollarSign,
  FiCheckCircle,
  FiAlertCircle,
  FiPercent,
  FiInfo
} from 'react-icons/fi';

// Mock user data with more detailed information
const mockUserData = {
  name: 'Max Mustermann',
  email: 'max.mustermann@example.com',
  avatar: '/avatars/profile.jpg',
  coverImage: '/images/cover-default.jpg',
  phone: '+49 123 456789',
  location: 'Berlin, Deutschland',
  bio: 'Professioneller Grafikdesigner mit 5 Jahren Erfahrung in Logo-Design, Branding und Illustration. Ich helfe Unternehmen, ihre Markenidentität durch kreative visuelle Lösungen zu stärken.',
  language: 'Deutsch',
  timeZone: 'Europe/Berlin',
  memberSince: '2021-06-15',
  lastLogin: '2023-05-10T08:22:00Z',
  skills: ['Logo Design', 'Branding', 'Illustration', 'Printdesign', 'Social Media Design'],
  social: {
    website: 'https://maxmustermann.de',
    github: 'maxmustermann',
    twitter: 'maxmustermann',
    linkedin: 'max-mustermann',
    instagram: 'max.mustermann.design'
  },
  emailNotifications: {
    messages: true,
    orders: true,
    updates: false,
    marketing: false,
    newOffers: true,
    securityAlerts: true,
    pricingChanges: false,
    reviews: true
  },
  pushNotifications: {
    messages: true,
    orders: true,
    updates: false
  },
  twoFactorEnabled: true,
  twoFactorMethod: 'sms',
  lastPasswordChange: '2023-02-15T10:30:00Z',
  apiAccess: false,
  loginHistory: [
    { device: 'Windows PC - Chrome', location: 'Berlin, DE', time: '2023-05-10T08:22:00Z', status: 'success' },
    { device: 'iPhone - Safari', location: 'München, DE', time: '2023-05-08T19:45:00Z', status: 'success' },
    { device: 'Unknown Device', location: 'Frankfurt, DE', time: '2023-05-05T12:30:00Z', status: 'blocked' }
  ],
  paymentMethods: [
    {
      id: 'pm_1',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2024,
      isDefault: true
    },
    {
      id: 'pm_2',
      type: 'card',
      brand: 'mastercard',
      last4: '8888',
      expMonth: 9,
      expYear: 2025,
      isDefault: false
    }
  ],
  billingAddress: {
    name: 'Max Mustermann',
    street: 'Musterstraße 123',
    city: 'Berlin',
    zip: '10115',
    country: 'Deutschland',
    vatId: 'DE123456789'
  },
  subscription: {
    plan: 'Premium',
    status: 'active',
    renewDate: '2023-12-31T23:59:59Z',
    amount: 29.99,
    interval: 'monthly',
    features: ['Unbegrenzte Angebote', 'Bevorzugte Platzierung', 'Prioritätssupport', 'Erweiterte Statistiken']
  },
  dataExports: [
    { id: 'exp_1', date: '2023-04-10T14:30:00Z', type: 'Alle Auftragsdaten', status: 'completed' }
  ],
  statistics: {
    activeListings: 8,
    completedOrders: 47,
    averageRating: 4.8,
    responseRate: 98,
    averageResponseTime: 2.5, // hours
    cancelRate: 2, // percent
    earnings: {
      thisMonth: 1250.50,
      lastMonth: 980.75,
      total: 15780.25
    }
  }
};

export default function SettingsPage() {
  const [user, setUser] = useState(mockUserData);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    location: user.location
  });
  
  // More state variables
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [coverPreview, setCoverPreview] = useState(user.coverImage);
  const [activeSection, setActiveSection] = useState('personal');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleToggleNotification = (key: keyof typeof user.emailNotifications) => {
    setUser({
      ...user,
      emailNotifications: {
        ...user.emailNotifications,
        [key]: !user.emailNotifications[key]
      }
    });
  };

  const handleTogglePushNotification = (key: keyof typeof user.pushNotifications) => {
    setUser({
      ...user,
      pushNotifications: {
        ...user.pushNotifications,
        [key]: !user.pushNotifications[key]
      }
    });
  };

  const handleToggle2FA = () => {
    setUser({
      ...user,
      twoFactorEnabled: !user.twoFactorEnabled
    });
  };

  const handleToggleApiAccess = () => {
    setUser({
      ...user,
      apiAccess: !user.apiAccess
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      location: formData.location
    });
    setEditMode(false);
  };

  const cancelEdit = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      location: user.location
    });
    setEditMode(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSetDefaultPayment = (paymentId: string) => {
    setUser({
      ...user,
      paymentMethods: user.paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === paymentId
      }))
    });
  };

  const handleRemovePayment = (paymentId: string) => {
    setUser({
      ...user,
      paymentMethods: user.paymentMethods.filter(method => method.id !== paymentId)
    });
  };

  // Placeholder for file upload functions
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Einstellungen</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Sidebar - making it wider */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-6">
            <div className="relative">
              <div className="h-24 bg-gradient-to-r from-rose-500 to-pink-600 w-full"></div>
              <div className="absolute -bottom-10 left-0 w-full flex justify-center">
                <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden bg-white">
                  {user.avatar ? (
                    <img 
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-rose-100 text-rose-500 text-xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-4 pt-12 pb-4 text-center border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                {user.subscription.plan} Plan
              </div>
            </div>
            
            <nav className="divide-y divide-gray-200">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full px-5 py-3 flex items-center text-sm font-medium ${activeTab === 'profile' ? 'bg-rose-50 text-rose-600 border-l-4 border-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <FiUser className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3">Profil</span>
                <FiChevronRight className={`ml-auto h-5 w-5 ${activeTab === 'profile' ? 'text-rose-600' : 'text-gray-400'}`} />
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full px-5 py-3 flex items-center text-sm font-medium ${activeTab === 'notifications' ? 'bg-rose-50 text-rose-600 border-l-4 border-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <FiBell className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3">Benachrichtigungen</span>
                <FiChevronRight className={`ml-auto h-5 w-5 ${activeTab === 'notifications' ? 'text-rose-600' : 'text-gray-400'}`} />
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full px-5 py-3 flex items-center text-sm font-medium ${activeTab === 'security' ? 'bg-rose-50 text-rose-600 border-l-4 border-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <FiLock className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3">Sicherheit</span>
                <FiChevronRight className={`ml-auto h-5 w-5 ${activeTab === 'security' ? 'text-rose-600' : 'text-gray-400'}`} />
              </button>
              
              <button
                onClick={() => setActiveTab('payment')}
                className={`w-full px-5 py-3 flex items-center text-sm font-medium ${activeTab === 'payment' ? 'bg-rose-50 text-rose-600 border-l-4 border-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <FiCreditCard className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3">Zahlungen & Auszahlungen</span>
                <FiChevronRight className={`ml-auto h-5 w-5 ${activeTab === 'payment' ? 'text-rose-600' : 'text-gray-400'}`} />
              </button>
              
              <button
                onClick={() => setActiveTab('subscription')}
                className={`w-full px-5 py-3 flex items-center text-sm font-medium ${activeTab === 'subscription' ? 'bg-rose-50 text-rose-600 border-l-4 border-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <FiDollarSign className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3">Verkäufer-Level</span>
                <FiChevronRight className={`ml-auto h-5 w-5 ${activeTab === 'subscription' ? 'text-rose-600' : 'text-gray-400'}`} />
              </button>
              
              <button
                onClick={() => setActiveTab('data')}
                className={`w-full px-5 py-3 flex items-center text-sm font-medium ${activeTab === 'data' ? 'bg-rose-50 text-rose-600 border-l-4 border-rose-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <FiFileText className="h-5 w-5 flex-shrink-0" />
                <span className="ml-3">Auftrags- & Verkaufsdaten</span>
                <FiChevronRight className={`ml-auto h-5 w-5 ${activeTab === 'data' ? 'text-rose-600' : 'text-gray-400'}`} />
              </button>
            </nav>
            
            <div className="p-4 border-t border-gray-200 mt-auto">
              <div className="text-xs text-gray-700 mb-1 font-medium">Mitglied seit</div>
              <div className="text-sm font-medium text-gray-900">{new Date(user.memberSince).toLocaleDateString('de-DE')}</div>
            </div>
          </div>
        </div>
        
        {/* Main Content - adjusted for new sidebar width */}
        <div className="lg:col-span-4">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Cover Image - redesigned with better hover effect */}
              <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100 group">
                {coverPreview ? (
                  <img 
                    src={coverPreview} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-rose-50 to-pink-50">
                    <div className="text-rose-300 flex flex-col items-center">
                      <FiImage className="h-12 w-12 mb-2" />
                      <span className="text-sm font-medium">Kein Cover-Foto vorhanden</span>
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200"></div>
                  <label className="cursor-pointer z-10 flex items-center justify-center gap-2 text-white font-medium bg-rose-600 px-4 py-2 rounded-md shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <FiImage className="h-5 w-5" />
                    Cover-Foto ändern
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleCoverChange}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              
              {/* Profile Info Card with Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Tabs for profile sections */}
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveSection('personal')}
                      className={`px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap ${
                        activeSection === 'personal' 
                          ? 'border-rose-600 text-rose-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Persönliche Informationen
                    </button>
                    <button
                      onClick={() => setActiveSection('profile')}
                      className={`px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap ${
                        activeSection === 'profile' 
                          ? 'border-rose-600 text-rose-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Profildetails
                    </button>
                    <button
                      onClick={() => setActiveSection('skills')}
                      className={`px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap ${
                        activeSection === 'skills' 
                          ? 'border-rose-600 text-rose-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Fähigkeiten & Dienstleistungen
                    </button>
                    <button
                      onClick={() => setActiveSection('social')}
                      className={`px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap ${
                        activeSection === 'social' 
                          ? 'border-rose-600 text-rose-600' 
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Social Media
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {activeSection === 'personal' && 'Persönliche Informationen'}
                      {activeSection === 'profile' && 'Öffentliches Profil'}
                      {activeSection === 'skills' && 'Fähigkeiten & Expertise'}
                      {activeSection === 'social' && 'Social Media Links'}
                    </h2>
                    {!editMode ? (
                      <button 
                        onClick={() => setEditMode(true)}
                        className="text-rose-600 hover:text-rose-800 flex items-center text-sm font-medium"
                      >
                        <FiEdit className="mr-1" /> Bearbeiten
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleSaveProfile}
                          className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
                        >
                          <FiSave className="mr-1" /> Speichern
                        </button>
                        <button 
                          onClick={cancelEdit}
                          className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md text-sm flex items-center border border-gray-300"
                        >
                          <FiX className="mr-1" /> Abbrechen
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {activeSection === 'personal' && (
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className="mr-6">
                          <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                            {avatarPreview ? (
                              <img 
                                src={avatarPreview} 
                                alt={user.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-rose-100 text-rose-500 text-2xl font-bold">
                                {user.name.charAt(0)}
                              </div>
                            )}
                            {editMode && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <label className="cursor-pointer">
                                  <FiEdit className="h-6 w-6 text-white" />
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={handleAvatarChange} 
                                    accept="image/*"
                                  />
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            {editMode ? (
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-2.5 px-3"
                              />
                            ) : (
                              <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">E-Mail</label>
                            {editMode ? (
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-2.5 px-3"
                              />
                            ) : (
                              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Telefon</label>
                          {editMode ? (
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-2.5 px-3"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Standort</label>
                          {editMode ? (
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-2.5 px-3"
                            />
                          ) : (
                            <p className="mt-1 text-sm text-gray-900">{user.location}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Über mich</label>
                        {editMode ? (
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-2.5 px-3"
                            placeholder="Beschreiben Sie Ihre Dienstleistungen, Erfahrung und Expertise..."
                          />
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{user.bio}</p>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-base font-medium text-gray-900 mb-3">Regionale Einstellungen</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Sprache</label>
                            <select 
                              disabled={!editMode}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-3 px-4"
                            >
                              <option>Deutsch</option>
                              <option>Englisch</option>
                              <option>Französisch</option>
                              <option>Spanisch</option>
                              <option>Italienisch</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Zeitzone</label>
                            <select 
                              disabled={!editMode}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-3 px-4"
                            >
                              <option>Europe/Berlin (UTC+01:00)</option>
                              <option>Europe/London (UTC+00:00)</option>
                              <option>Europe/Paris (UTC+01:00)</option>
                              <option>America/New_York (UTC-05:00)</option>
                              <option>Asia/Tokyo (UTC+09:00)</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700">Währung für Auszahlungen</label>
                          <select 
                            disabled={!editMode}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-3 px-4"
                          >
                            <option>EUR (€) - Euro</option>
                            <option>USD ($) - US-Dollar</option>
                            <option>GBP (£) - Britisches Pfund</option>
                            <option>CHF (Fr.) - Schweizer Franken</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'skills' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Angebotene Dienstleistungen</label>
                        <p className="text-xs text-gray-500 mb-3">Fügen Sie Ihre wichtigsten Dienstleistungen hinzu, damit Kunden Sie leichter finden können.</p>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, index) => (
                            <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800">
                              {skill}
                              {editMode && (
                                <button className="ml-1.5 text-rose-600 hover:text-rose-800">
                                  <FiX className="h-3 w-3" />
                                </button>
                              )}
                            </div>
                          ))}
                          {editMode && (
                            <button className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-dashed border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400">
                              + Dienstleistung hinzufügen
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {editMode && (
                        <div className="border bg-gray-50 rounded-md p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Neue Dienstleistung hinzufügen</h4>
                          <p className="text-xs text-gray-500 mb-3">Wählen Sie Dienstleistungen, die Ihre Expertise am besten repräsentieren.</p>
                          <div className="flex">
                            <input
                              type="text"
                              placeholder="z.B. Logo Design, Website-Entwicklung, Content Writing..."
                              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm bg-gray-50 text-gray-900 py-2.5 px-3"
                            />
                            <button
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                            >
                              Hinzufügen
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-base font-medium text-gray-900 mb-3">Sprachen</h3>
                        <p className="text-sm text-gray-500 mb-3">Geben Sie an, welche Sprachen Sie beherrschen und auf welchem Niveau.</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Deutsch</p>
                              <p className="text-xs text-gray-500">Muttersprache</p>
                            </div>
                            {editMode && (
                              <button className="text-sm text-gray-500 hover:text-gray-700">
                                <FiEdit className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Englisch</p>
                              <p className="text-xs text-gray-500">Fließend (C1)</p>
                            </div>
                            {editMode && (
                              <button className="text-sm text-gray-500 hover:text-gray-700">
                                <FiEdit className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          
                          {editMode && (
                            <button className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 text-sm font-medium rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-400">
                              + Sprache hinzufügen
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'social' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Website</label>
                        {editMode ? (
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              https://
                            </span>
                            <input
                              type="text"
                              defaultValue={user.social.website.replace('https://', '')}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                              placeholder="www.example.com"
                            />
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">{user.social.website}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">GitHub</label>
                        {editMode ? (
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              github.com/
                            </span>
                            <input
                              type="text"
                              defaultValue={user.social.github}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                              placeholder="username"
                            />
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">github.com/{user.social.github}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Twitter</label>
                        {editMode ? (
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              twitter.com/
                            </span>
                            <input
                              type="text"
                              defaultValue={user.social.twitter}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                              placeholder="username"
                            />
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">twitter.com/{user.social.twitter}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                        {editMode ? (
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                              linkedin.com/in/
                            </span>
                            <input
                              type="text"
                              defaultValue={user.social.linkedin}
                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                              placeholder="username"
                            />
                          </div>
                        ) : (
                          <p className="mt-1 text-sm text-gray-900">linkedin.com/in/{user.social.linkedin}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                  <h2 className="text-lg font-semibold text-gray-900">Benachrichtigungseinstellungen</h2>
                  <p className="text-sm text-gray-500 mt-1">Legen Sie fest, worüber Sie informiert werden möchten.</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                        <FiBell className="mr-2 h-5 w-5 text-blue-500" />
                        E-Mail-Benachrichtigungen
                      </h3>
                      <div className="space-y-4 divide-y divide-gray-100">
                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Neue Nachrichten</p>
                            <p className="text-xs text-gray-500">Benachrichtigung bei neuen Nachrichten von Kunden</p>
                          </div>
                          <button 
                            onClick={() => handleToggleNotification('messages')}
                            className={`${user.emailNotifications.messages ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                          >
                            <span
                              className={`${user.emailNotifications.messages ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Auftragsbestätigungen</p>
                            <p className="text-xs text-gray-500">Benachrichtigung bei neuen Aufträgen</p>
                          </div>
                          <button 
                            onClick={() => handleToggleNotification('orders')}
                            className={`${user.emailNotifications.orders ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                          >
                            <span
                              className={`${user.emailNotifications.orders ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Plattform-Updates</p>
                            <p className="text-xs text-gray-500">Benachrichtigung bei wichtigen Updates der Plattform</p>
                          </div>
                          <button 
                            onClick={() => handleToggleNotification('updates')}
                            className={`${user.emailNotifications.updates ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                          >
                            <span
                              className={`${user.emailNotifications.updates ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Marketing</p>
                            <p className="text-xs text-gray-500">Angebote, Tipps und Neuigkeiten</p>
                          </div>
                          <button 
                            onClick={() => handleToggleNotification('marketing')}
                            className={`${user.emailNotifications.marketing ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                          >
                            <span
                              className={`${user.emailNotifications.marketing ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Neue Bewertungen</p>
                            <p className="text-xs text-gray-500">Benachrichtigung bei neuen Bewertungen Ihrer Dienstleistungen</p>
                          </div>
                          <button 
                            onClick={() => handleToggleNotification('reviews')}
                            className={`${user.emailNotifications.reviews ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                          >
                            <span
                              className={`${user.emailNotifications.reviews ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900 flex items-center">
                        <FiActivity className="mr-2 h-5 w-5 text-blue-500" />
                        Push-Benachrichtigungen
                      </h3>
                      <div className="bg-rose-50 border border-rose-100 rounded-md p-4 text-sm text-rose-700">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FiInfo className="h-5 w-5 text-rose-400" />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-rose-800">Wichtige Information</p>
                            <p className="mt-1">Als Freelancer auf unserer Plattform sollten Sie regelmäßig Ihre Preise und Dienstleistungen aktualisieren, um wettbewerbsfähig zu bleiben.</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 divide-y divide-gray-100">
                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Neue Nachrichten</p>
                            <p className="text-xs text-gray-500">Push-Benachrichtigung bei neuen Nachrichten</p>
                          </div>
                          <button 
                            onClick={() => handleTogglePushNotification('messages')}
                            className={`${user.pushNotifications.messages ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                          >
                            <span
                              className={`${user.pushNotifications.messages ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Neue Aufträge</p>
                            <p className="text-xs text-gray-500">Push-Benachrichtigung bei neuen Aufträgen</p>
                          </div>
                          <button 
                            onClick={() => handleTogglePushNotification('orders')}
                            className={`${user.pushNotifications.orders ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                          >
                            <span
                              className={`${user.pushNotifications.orders ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex justify-end">
                        <button
                          className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-4 py-2 rounded-md text-sm"
                        >
                          Alle Einstellungen speichern
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                  <h2 className="text-lg font-semibold text-gray-900">Sicherheitseinstellungen</h2>
                  <p className="text-sm text-gray-500 mt-1">Verwalten Sie Ihre Kontozugriffssicherheit.</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 flex items-center">
                            <FiLock className="mr-2 h-5 w-5 text-blue-500" />
                            Passwort
                          </h3>
                          <p className="text-sm text-gray-500">Zuletzt geändert: {formatDate(user.lastPasswordChange)}</p>
                        </div>
                        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 text-sm rounded-md font-medium">
                          Passwort ändern
                        </button>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-sm text-blue-700">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <FiInfo className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-blue-800">Sicherheitshinweis</p>
                            <p className="mt-1">Es wird empfohlen, Ihr Passwort alle 3 Monate zu ändern und einzigartige Passwörter für unterschiedliche Dienste zu verwenden.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 flex items-center">
                            <FiShield className="mr-2 h-5 w-5 text-blue-500" />
                            Zwei-Faktor-Authentifizierung
                          </h3>
                          <p className="text-sm text-gray-500">Erhöhen Sie die Sicherheit Ihres Accounts mit 2FA</p>
                        </div>
                        <button 
                          onClick={handleToggle2FA}
                          className={`${user.twoFactorEnabled ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                        >
                          <span
                            className={`${user.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </button>
                      </div>
                      
                      {user.twoFactorEnabled && (
                        <div className="bg-green-50 border border-green-100 rounded-md p-4 flex items-start mb-4">
                          <div className="flex-shrink-0 pt-0.5">
                            <FiCheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-green-800">Aktiviert via {user.twoFactorMethod === 'sms' ? 'SMS' : 'Authenticator App'}</h4>
                            <p className="mt-1 text-sm text-green-700">
                              Zwei-Faktor-Authentifizierung ist aktiviert. Bei jedem Login wird ein Code an Ihr Handy gesendet.
                            </p>
                            <div className="mt-3">
                              <button className="inline-flex items-center px-3 py-1.5 border border-green-600 text-xs font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100">
                                Methode ändern
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {!user.twoFactorEnabled && (
                        <div className="bg-red-50 border border-red-100 rounded-md p-4 flex items-start mb-4">
                          <div className="flex-shrink-0 pt-0.5">
                            <FiAlertCircle className="h-5 w-5 text-red-500" />
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-red-800">Nicht aktiviert</h4>
                            <p className="mt-1 text-sm text-red-700">
                              Für maximale Sicherheit empfehlen wir die Aktivierung der Zwei-Faktor-Authentifizierung.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 flex items-center">
                            <FiGlobe className="mr-2 h-5 w-5 text-blue-500" />
                            Aktive Sitzungen
                          </h3>
                          <p className="text-sm text-gray-500">Geräte, auf denen Sie angemeldet sind</p>
                        </div>
                        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 text-sm rounded-md font-medium">
                          Alle abmelden
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {user.loginHistory.map((login, index) => (
                          <div 
                            key={index} 
                            className={`bg-gray-50 rounded-md p-4 border-l-4 ${
                              login.status === 'success' ? 'border-green-500' : 'border-red-500'
                            } flex items-center justify-between`}
                          >
                            <div>
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-900">{login.device}</p>
                                {index === 0 && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Aktuell
                                  </span>
                                )}
                                {login.status === 'blocked' && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Blockiert
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {login.location} - {formatDate(login.time)}
                              </p>
                            </div>
                            {index !== 0 && login.status === 'success' && (
                              <button className="text-xs text-red-600 hover:text-red-800 font-medium">
                                Abmelden
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 flex items-center">
                            <FiFileText className="mr-2 h-5 w-5 text-blue-500" />
                            API-Zugriff
                          </h3>
                          <p className="text-sm text-gray-500">Verwalten Sie den Zugriff auf Ihre Daten über die API</p>
                        </div>
                        <button 
                          onClick={handleToggleApiAccess}
                          className={`${user.apiAccess ? 'bg-rose-600' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                        >
                          <span
                            className={`${user.apiAccess ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                          />
                        </button>
                      </div>
                      
                      {user.apiAccess && (
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-700">API-Schlüssel</h4>
                            <button
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="text-xs font-medium text-blue-600 hover:text-blue-800"
                            >
                              {showApiKey ? 'Verbergen' : 'Anzeigen'}
                            </button>
                          </div>
                          <div className="flex items-center">
                            <input
                              type={showApiKey ? "text" : "password"}
                              readOnly
                              value={showApiKey ? "sk_live_51KxYt2CL6A8wPdvXdeSNx1X3PmDlKJ" : "••••••••••••••••••••••••••••"}
                              className="flex-grow mr-2 bg-gray-100 border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                            <button className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap font-medium">
                              Kopieren
                            </button>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Erstellt am: 15.03.2023 - Nächste Rotation: 15.03.2024
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiAlertCircle className="mr-2 h-5 w-5 text-red-500" />
                        Konto löschen
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Das Löschen Ihres Kontos ist dauerhaft und kann nicht rückgängig gemacht werden. Alle Ihre Daten werden dauerhaft gelöscht.
                      </p>
                      <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-white border border-red-300 text-red-600 hover:bg-red-50 font-medium px-4 py-2 rounded-md text-sm"
                      >
                        Konto löschen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Delete Account Modal - This would typically be a modal component */}
              {showDeleteModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* Background overlay */}
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                    
                    {/* Modal panel */}
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <FiAlertCircle className="h-6 w-6 text-red-600" />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                              Konto löschen
                            </h3>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Alle Ihre Daten werden dauerhaft entfernt. Diese Aktion kann nicht rückgängig gemacht werden.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button 
                          type="button" 
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Konto löschen
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setShowDeleteModal(false)}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Abbrechen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Payment Methods */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                  <h2 className="text-lg font-semibold text-gray-900">Zahlungsmethoden</h2>
                  <p className="text-sm text-gray-500 mt-1">Verwalten Sie Ihre Zahlungsmethoden und Abrechnungsdetails.</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-medium text-gray-900 flex items-center">
                          <FiCreditCard className="mr-2 h-5 w-5 text-blue-500" />
                          Hinterlegte Zahlungsmethoden
                        </h3>
                        <button className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 text-sm rounded-md font-medium flex items-center">
                          <span className="mr-1">+</span> Neue hinzufügen
                        </button>
                      </div>
                      
                      {user.paymentMethods.length > 0 ? (
                        <div className="space-y-3">
                          {user.paymentMethods.map(method => (
                            <div 
                              key={method.id} 
                              className={`border rounded-md overflow-hidden ${method.isDefault ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}
                            >
                              <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-12 w-20 bg-gray-100 rounded flex items-center justify-center mr-4">
                                    {method.brand === 'visa' ? (
                                      <svg className="h-8 w-auto" viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 0L15.3 15.2H20.3L22.5 0H17.5Z" fill="#00579F"/>
                                        <path d="M10.2 0L5.4 10.4L4.5 5.8L4.5 5.8L3.1 1.2C3.1 1.2 3 0 1.5 0H0L0 0.4C0 0.4 2.1 0.8 4.5 3.5L6.8 15.2H12L19.5 0H10.2Z" fill="#00579F"/>
                                        <path d="M45.8 0H41.5C40.2 0 39.4 0.8 39 2L33 15.2H38L38.8 12.8H44.5L45 15.2H49.5L45.8 0ZM40 9.2L42.2 4L43.5 9.2H40Z" fill="#00579F"/>
                                        <path d="M34.5 5.2L35 2.8C35 2.8 32.8 1.5 30.3 1.5C27.5 1.5 22 2.8 22 7.8C22 12.5 28.2 12.2 28.2 14.2C28.2 16.2 22.8 15.8 20.8 14L20.2 16.5C20.2 16.5 22.5 18 26.2 18C30 18 33.8 15.5 33.8 11.8C33.8 7.2 27.5 7 27.5 5.2C27.5 3.5 32 4 34.5 5.2Z" fill="#00579F"/>
                                      </svg>
                                    ) : (
                                      <svg className="h-8 w-auto" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.3 9.5H30.7V20.6H19.3V9.5Z" fill="#FF5F00"/>
                                        <path d="M20.2 15C20.2 12.8 21.2 10.9 22.8 9.5C21.7 8.6 20.2 8 18.7 8C14.9 8 11.8 11.2 11.8 15C11.8 18.8 14.9 22 18.7 22C20.2 22 21.7 21.4 22.8 20.5C21.2 19.2 20.2 17.2 20.2 15Z" fill="#EB001B"/>
                                        <path d="M38.2 15C38.2 18.8 35.1 22 31.3 22C29.8 22 28.3 21.4 27.2 20.5C28.9 19.2 29.8 17.2 29.8 15C29.8 12.8 28.8 10.9 27.2 9.5C28.3 8.6 29.8 8 31.3 8C35.1 8 38.2 11.3 38.2 15Z" fill="#F79E1B"/>
                                      </svg>
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center">
                                      <p className="text-sm font-medium text-gray-900">
                                        {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}
                                      </p>
                                      {method.isDefault && (
                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                          Standard
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Läuft ab: {method.expMonth < 10 ? `0${method.expMonth}` : method.expMonth}/{method.expYear}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  {!method.isDefault && (
                                    <button 
                                      onClick={() => handleSetDefaultPayment(method.id)}
                                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                      Als Standard
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => handleRemovePayment(method.id)}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                                  >
                                    Entfernen
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
                          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                            <FiCreditCard className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">Keine Zahlungsmethoden hinterlegt</h3>
                          <p className="text-sm text-gray-500 mb-4">Fügen Sie eine Kreditkarte oder ein Bankkonto hinzu, um Zahlungen vornehmen zu können.</p>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                            Zahlungsmethode hinzufügen
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiFileText className="mr-2 h-5 w-5 text-blue-500" />
                        Rechnungsadresse
                      </h3>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.billingAddress.name}</p>
                            <p className="text-sm text-gray-500 mt-1">{user.billingAddress.street}</p>
                            <p className="text-sm text-gray-500">{user.billingAddress.zip} {user.billingAddress.city}</p>
                            <p className="text-sm text-gray-500">{user.billingAddress.country}</p>
                            {user.billingAddress.vatId && (
                              <p className="text-sm text-gray-500 mt-2">USt-ID: {user.billingAddress.vatId}</p>
                            )}
                          </div>
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium h-fit">
                            Bearbeiten
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiDownload className="mr-2 h-5 w-5 text-blue-500" />
                        Rechnungsübersicht
                      </h3>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-200 bg-gray-100 text-sm font-medium">
                          <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-2">Rechnung</div>
                            <div>Datum</div>
                            <div>Betrag</div>
                            <div className="text-right">Download</div>
                          </div>
                        </div>
                        
                        <div className="divide-y divide-gray-200">
                          <div className="px-4 py-3 text-sm">
                            <div className="grid grid-cols-5 gap-4 items-center">
                              <div className="col-span-2 font-medium text-gray-900">Rechnung #INV-2023-05</div>
                              <div className="text-gray-500">01.05.2023</div>
                              <div className="text-gray-900">29,99 €</div>
                              <div className="text-right">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <FiDownload className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="px-4 py-3 text-sm">
                            <div className="grid grid-cols-5 gap-4 items-center">
                              <div className="col-span-2 font-medium text-gray-900">Rechnung #INV-2023-04</div>
                              <div className="text-gray-500">01.04.2023</div>
                              <div className="text-gray-900">29,99 €</div>
                              <div className="text-right">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <FiDownload className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="px-4 py-3 text-sm">
                            <div className="grid grid-cols-5 gap-4 items-center">
                              <div className="col-span-2 font-medium text-gray-900">Rechnung #INV-2023-03</div>
                              <div className="text-gray-500">01.03.2023</div>
                              <div className="text-gray-900">29,99 €</div>
                              <div className="text-right">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <FiDownload className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Subscription Tab renamed to Seller Level */}
          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                  <h2 className="text-lg font-semibold text-gray-900">Verkäufer-Level & Statistiken</h2>
                  <p className="text-sm text-gray-500 mt-1">Übersicht über Ihren aktuellen Verkäufer-Status und Ihre Leistungsindikatoren.</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Current Level */}
                    <div>
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiDollarSign className="mr-2 h-5 w-5 text-rose-500" />
                        Aktueller Level
                      </h3>
                      
                      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <h4 className="text-lg font-semibold text-gray-900">Level 2 Verkäufer</h4>
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Aktiv
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Seit: 15.03.2023</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Nächste Bewertung: 15.06.2023
                            </p>
                            <div className="mt-3">
                              <p className="text-sm text-gray-600">Als Level 2 Verkäufer genießen Sie folgende Vorteile:</p>
                              <ul className="space-y-2 mt-2">
                                <li className="flex items-center text-sm text-gray-600">
                                  <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                  Bessere Sichtbarkeit in den Suchergebnissen
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                  <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                  Zugriff auf mehr Angebotserweiterungen
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                  <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                  Schnellere Bearbeitungszeit bei Auszahlungen
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="h-20 w-20 rounded-full bg-rose-100 border-4 border-rose-300 flex items-center justify-center">
                              <span className="text-xl font-bold text-rose-600">L2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="border border-gray-200 rounded-md p-4 bg-white">
                          <div className="text-xl font-semibold text-gray-900">{user.statistics.completedOrders}</div>
                          <div className="text-sm text-gray-500">Abgeschlossene Aufträge</div>
                        </div>
                        <div className="border border-gray-200 rounded-md p-4 bg-white">
                          <div className="text-xl font-semibold text-gray-900">{user.statistics.averageRating.toFixed(1)} / 5.0</div>
                          <div className="text-sm text-gray-500">Durchschnittliche Bewertung</div>
                        </div>
                        <div className="border border-gray-200 rounded-md p-4 bg-white">
                          <div className="text-xl font-semibold text-gray-900">{user.statistics.responseRate}%</div>
                          <div className="text-sm text-gray-500">Antwortrate</div>
                        </div>
                        <div className="border border-gray-200 rounded-md p-4 bg-white">
                          <div className="text-xl font-semibold text-gray-900">{user.statistics.averageResponseTime}h</div>
                          <div className="text-sm text-gray-500">Durchschnittliche Antwortzeit</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Level Progress */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiActivity className="mr-2 h-5 w-5 text-rose-500" />
                        Level Fortschritt
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-gray-700">Fortschritt zu Level 3</h4>
                            <span className="text-sm font-medium text-gray-700">70%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Anforderungen für Level 3</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">60+ Tage als Level 2 Verkäufer</p>
                                <p className="text-xs text-gray-500">Status: 45 von 60 Tagen (Erfüllt zu 75%)</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Mindestens 50 abgeschlossene Aufträge</p>
                                <p className="text-xs text-gray-500">Status: 47 von 50 Aufträgen (Erfüllt zu 94%)</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Durchschnittliche Bewertung von 4.7+</p>
                                <p className="text-xs text-gray-500">Status: 4.8 von 4.7 (Erfüllt zu 100%)</p>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Antwortrate von min. 90%</p>
                                <p className="text-xs text-gray-500">Status: 98% (Erfüllt zu 100%)</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Earnings */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiDollarSign className="mr-2 h-5 w-5 text-rose-500" />
                        Einnahmenübersicht
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                          <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <h4 className="text-sm font-medium text-gray-900">Aktueller Monat</h4>
                          </div>
                          <div className="p-4">
                            <div className="text-2xl font-bold text-gray-900">{user.statistics.earnings.thisMonth.toFixed(2)} €</div>
                            <p className="text-sm text-gray-500 mt-1">Aus 8 abgeschlossenen Aufträgen</p>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                          <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <h4 className="text-sm font-medium text-gray-900">Letzter Monat</h4>
                          </div>
                          <div className="p-4">
                            <div className="text-2xl font-bold text-gray-900">{user.statistics.earnings.lastMonth.toFixed(2)} €</div>
                            <p className="text-sm text-gray-500 mt-1">Aus 6 abgeschlossenen Aufträgen</p>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-md overflow-hidden">
                          <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <h4 className="text-sm font-medium text-gray-900">Gesamteinnahmen</h4>
                          </div>
                          <div className="p-4">
                            <div className="text-2xl font-bold text-gray-900">{user.statistics.earnings.total.toFixed(2)} €</div>
                            <p className="text-sm text-gray-500 mt-1">Seit Ihrer Anmeldung</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Data Management Tab */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 p-4">
                  <h2 className="text-lg font-semibold text-gray-900">Datenverwaltung</h2>
                  <p className="text-sm text-gray-500 mt-1">Verwalten und exportieren Sie Ihre persönlichen Daten.</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiDownload className="mr-2 h-5 w-5 text-blue-500" />
                        Datenexport
                      </h3>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                        <p className="text-sm text-gray-600 mb-4">
                          Sie können eine Kopie Ihrer persönlichen Daten herunterladen, die auf unserer Plattform gespeichert sind.
                          Der Export enthält Ihre Profildaten, Projekt- und Auftragsdaten sowie Ihre Kommunikation mit Kunden.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                            <FiDownload className="mr-2 h-4 w-4" />
                            Vollständigen Datenexport anfordern
                          </button>
                          <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                            Profildata exportieren
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Letzte Datenexporte</h4>
                        
                        {user.dataExports.length > 0 ? (
                          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                            <div className="divide-y divide-gray-200">
                              {user.dataExports.map((export_, index) => (
                                <div key={index} className="px-4 py-3 text-sm flex items-center justify-between">
                                  <div>
                                    <div className="font-medium text-gray-900">{export_.type}</div>
                                    <div className="text-gray-500">{formatDate(export_.date)}</div>
                                  </div>
                                  <div className="flex items-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                                      export_.status === 'completed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {export_.status === 'completed' ? 'Abgeschlossen' : 'In Bearbeitung'}
                                    </span>
                                    {export_.status === 'completed' && (
                                      <button className="text-blue-600 hover:text-blue-800">
                                        <FiDownload className="h-5 w-5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic">
                            Keine Datenexporte gefunden
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiUpload className="mr-2 h-5 w-5 text-blue-500" />
                        Datenimport
                      </h3>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                        <p className="text-sm text-gray-600 mb-4">
                          Sie können Daten aus anderen Plattformen importieren, um Ihre Erfahrung zu verbessern.
                          Unterstützte Formate: CSV, JSON, XML.
                        </p>
                        
                        <div className="border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                              >
                                <span>Datei auswählen</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">oder hierher ziehen</p>
                            </div>
                            <p className="text-xs text-gray-500">bis zu 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-base font-medium text-gray-900 flex items-center mb-4">
                        <FiActivity className="mr-2 h-5 w-5 text-blue-500" />
                        Datenschutzoptionen
                      </h3>
                      
                      <div className="space-y-4 divide-y divide-gray-100">
                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Nutzungsstatistiken teilen</p>
                            <p className="text-xs text-gray-500">Hilft uns, unsere Dienste zu verbessern</p>
                          </div>
                          <button 
                            className="bg-blue-600 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
                          >
                            <span
                              className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Werbe-Cookies zulassen</p>
                            <p className="text-xs text-gray-500">Ermöglicht personalisierte Werbung</p>
                          </div>
                          <button 
                            className="bg-gray-200 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
                          >
                            <span
                              className="translate-x-1 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
                            />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Suchverlauf speichern</p>
                            <p className="text-xs text-gray-500">Verbessert Ihre Suchergebnisse</p>
                          </div>
                          <button 
                            className="bg-blue-600 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
                          >
                            <span
                              className="translate-x-6 inline-block w-4 h-4 transform bg-white rounded-full transition-transform"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 