'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  FiEdit2, FiUser, FiMail, FiBriefcase, FiMapPin, FiSave, 
  FiLoader, FiCheck, FiUpload, FiCamera, FiAward, FiGlobe, 
  FiBookOpen, FiHeart, FiCoffee, FiPlus, FiX
} from 'react-icons/fi';

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    role: '',
    avatar: '',
    skills: [] as string[],
    languages: [] as string[],
    education: [] as {institution: string, degree: string, year: string}[],
    certifications: [] as string[]
  });
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    year: ''
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin');
    }
    
    if (user) {
      // Fetch additional profile data
      fetchProfileData();
    }
  }, [isLoading, isAuthenticated, user, router]);

  const fetchProfileData = async () => {
    try {
      if (!user) return;
      
      // Combine user data with additional profile data from API
      const response = await fetch(`/api/profile/${user.id}`);
      
      if (response.ok) {
        const additionalData = await response.json();
        
        setProfileData({
          name: user.name || '',
          email: user.email || '',
          bio: additionalData.bio || '',
          location: additionalData.location || '',
          role: user.role || '',
          avatar: user.avatar || additionalData.avatar || '',
          skills: additionalData.skills || [],
          languages: additionalData.languages || [],
          education: additionalData.education || [],
          certifications: additionalData.certifications || []
        });
      } else {
        // If profile not found, use basic user data
        setProfileData({
          name: user.name || '',
          email: user.email || '',
          bio: '',
          location: '',
          role: user.role || '',
          avatar: user.avatar || '',
          skills: [],
          languages: [],
          education: [],
          certifications: []
        });
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const response = await fetch(`/api/profile/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setIsEditing(false);
      } else {
        console.error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    setIsUploadingAvatar(true);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Upload the file
      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update profile data with new avatar URL
        setProfileData(prev => ({
          ...prev,
          avatar: data.avatar,
        }));
        
        // Also update the user context
        if (user) {
          user.avatar = data.avatar;
        }
      } else {
        console.error('Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const addSkill = () => {
    if (newSkill && !profileData.skills.includes(newSkill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addLanguage = () => {
    if (newLanguage && !profileData.languages.includes(newLanguage)) {
      setProfileData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };

  const addCertification = () => {
    if (newCertification && !profileData.certifications.includes(newCertification)) {
      setProfileData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (cert: string) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== cert)
    }));
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
      setNewEducation({
        institution: '',
        degree: '',
        year: ''
      });
    }
  };

  const removeEducation = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect to login from useEffect
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero banner and profile image */}
      <div className="relative">
        {/* Banner image */}
        <div className="h-64 w-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 bg-repeat"></div>
        </div>
        
        {/* Profile header with avatar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            {/* Avatar */}
            <div className="relative h-40 w-40 rounded-xl overflow-hidden border-4 border-white bg-white shadow-lg">
              {profileData.avatar ? (
                <Image 
                  src={profileData.avatar} 
                  alt={profileData.name} 
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <FiUser className="h-16 w-16 text-gray-400" />
                </div>
              )}
              
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity">
                  <button
                    onClick={triggerFileInput}
                    className="cursor-pointer bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-all"
                    disabled={isUploadingAvatar}
                  >
                    {isUploadingAvatar ? (
                      <FiLoader className="h-6 w-6 animate-spin" />
                    ) : (
                      <FiCamera className="h-6 w-6" />
                    )}
                    <input 
                      ref={fileInputRef}
                      id="avatar-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </button>
                </div>
              )}
            </div>
            
            {/* Profile name and basic details */}
            <div className="flex-1 pb-4">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
                    <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-4">
                      <div className="flex items-center">
                        <FiMail className="mr-2 text-gray-400" />
                        <span className="text-gray-800">{profileData.email}</span>
                      </div>
                      {profileData.location && (
                        <div className="flex items-center">
                          <FiMapPin className="mr-2 text-gray-400" />
                          <span className="text-gray-800">{profileData.location}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <FiBriefcase className="mr-2 text-gray-400" />
                        <span className="text-gray-800 capitalize">
                          {profileData.role === 'service_provider' ? 'Dienstleister' : 
                          profileData.role === 'admin' ? 'Administrator' : 'Benutzer'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-md transition-colors"
                      >
                        <FiEdit2 className="h-4 w-4" /> Bearbeiten
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className={`flex items-center gap-2 px-4 py-2 ${isSaving ? 'bg-gray-400' : 'bg-rose-600 hover:bg-rose-700'} text-white font-medium rounded-md transition-colors`}
                      >
                        {isSaving ? (
                          <>
                            <FiLoader className="h-4 w-4 animate-spin" /> Speichern...
                          </>
                        ) : (
                          <>
                            <FiSave className="h-4 w-4" /> Speichern
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Success notification */}
                {saveSuccess && (
                  <div className="mt-4 flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md">
                    <FiCheck className="h-4 w-4" /> Profil erfolgreich gespeichert
                  </div>
                )}
                
                {/* Navigation tabs */}
                <div className="mt-8 border-b border-gray-200">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('info')}
                      className={`pb-3 px-1 ${
                        activeTab === 'info'
                          ? 'border-b-2 border-rose-500 text-rose-600 font-medium'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Persönliche Informationen
                    </button>
                    <button
                      onClick={() => setActiveTab('skills')}
                      className={`pb-3 px-1 ${
                        activeTab === 'skills'
                          ? 'border-b-2 border-rose-500 text-rose-600 font-medium'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Fähigkeiten & Sprachen
                    </button>
                    <button
                      onClick={() => setActiveTab('education')}
                      className={`pb-3 px-1 ${
                        activeTab === 'education'
                          ? 'border-b-2 border-rose-500 text-rose-600 font-medium'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Ausbildung & Zertifikate
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'info' && (
          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FiUser className="mr-3 text-rose-500" />
              Über mich
            </h2>
            
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={8}
                placeholder="Erzähle etwas über dich..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
              />
            ) : (
              <div className="prose prose-rose max-w-none text-gray-800">
                {profileData.bio ? (
                  <p className="whitespace-pre-line">{profileData.bio}</p>
                ) : (
                  <p className="text-gray-500 italic">Keine Biografie vorhanden. Klicke auf "Bearbeiten", um Informationen über dich hinzuzufügen.</p>
                )}
              </div>
            )}
            
            {isEditing && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <FiMapPin className="mr-2 text-rose-500" />
                  Standort
                </h3>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  placeholder="z.B. Berlin, Deutschland"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                />
              </div>
            )}
          </div>
        )}
        
        {/* Skills & Languages Tab */}
        {activeTab === 'skills' && (
          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Skills */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiAward className="mr-3 text-rose-500" />
                  Fähigkeiten
                </h3>
                
                {isEditing && (
                  <div className="flex items-center mb-6">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Neue Fähigkeit hinzufügen"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-3 bg-rose-600 text-white rounded-r-lg hover:bg-rose-700 transition-colors"
                    >
                      <FiPlus className="h-5 w-5" />
                    </button>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="bg-rose-50 text-rose-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                      >
                        {skill}
                        {isEditing && (
                          <button 
                            onClick={() => removeSkill(skill)} 
                            className="ml-2 text-rose-600 hover:text-rose-800"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Keine Fähigkeiten angegeben</p>
                  )}
                </div>
              </div>
              
              {/* Languages */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiGlobe className="mr-3 text-rose-500" />
                  Sprachen
                </h3>
                
                {isEditing && (
                  <div className="flex items-center mb-6">
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      placeholder="Neue Sprache hinzufügen"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                      onKeyDown={(e) => e.key === 'Enter' && addLanguage()}
                    />
                    <button
                      onClick={addLanguage}
                      className="px-4 py-3 bg-rose-600 text-white rounded-r-lg hover:bg-rose-700 transition-colors"
                    >
                      <FiPlus className="h-5 w-5" />
                    </button>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.length > 0 ? (
                    profileData.languages.map((language, index) => (
                      <div 
                        key={index} 
                        className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                      >
                        {language}
                        {isEditing && (
                          <button 
                            onClick={() => removeLanguage(language)} 
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Keine Sprachen angegeben</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Education & Certifications Tab */}
        {activeTab === 'education' && (
          <div className="bg-white shadow-sm rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiBookOpen className="mr-3 text-rose-500" />
                  Ausbildung
                </h3>
                
                {isEditing && (
                  <div className="mb-6 bg-gray-50 p-5 rounded-lg space-y-4">
                    <input
                      type="text"
                      placeholder="Institution"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                    />
                    <input
                      type="text"
                      placeholder="Abschluss / Studiengang"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Jahr"
                        value={newEducation.year}
                        onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                        className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                      />
                      <button
                        onClick={addEducation}
                        className="flex-1 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors px-4 py-3 flex items-center justify-center"
                      >
                        <FiPlus className="h-5 w-5 mr-2" />
                        Hinzufügen
                      </button>
                    </div>
                  </div>
                )}
                
                {profileData.education.length > 0 ? (
                  <div className="space-y-4">
                    {profileData.education.map((edu, index) => (
                      <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg relative hover:shadow-md transition-shadow">
                        {isEditing && (
                          <button 
                            onClick={() => removeEducation(index)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 bg-white rounded-full p-1"
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                        )}
                        <h4 className="font-bold text-gray-900 mb-1">{edu.institution}</h4>
                        <p className="text-gray-800 mb-1">{edu.degree}</p>
                        {edu.year && <p className="text-gray-600">{edu.year}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Keine Ausbildung angegeben</p>
                )}
              </div>
              
              {/* Certifications */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FiAward className="mr-3 text-rose-500" />
                  Zertifizierungen
                </h3>
                
                {isEditing && (
                  <div className="flex items-center mb-6">
                    <input
                      type="text"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      placeholder="Neue Zertifizierung hinzufügen"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                      onKeyDown={(e) => e.key === 'Enter' && addCertification()}
                    />
                    <button
                      onClick={addCertification}
                      className="px-4 py-3 bg-rose-600 text-white rounded-r-lg hover:bg-rose-700 transition-colors"
                    >
                      <FiPlus className="h-5 w-5" />
                    </button>
                  </div>
                )}
                
                {profileData.certifications.length > 0 ? (
                  <div className="space-y-3">
                    {profileData.certifications.map((cert, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center">
                          <FiAward className="h-5 w-5 text-rose-500 mr-3" />
                          <span className="text-gray-800">{cert}</span>
                        </div>
                        {isEditing && (
                          <button 
                            onClick={() => removeCertification(cert)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Keine Zertifizierungen angegeben</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 