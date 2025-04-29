'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CATEGORIES from '@/app/constants/categories';
import { FiUpload, FiX, FiPlus,  FiTrash } from 'react-icons/fi';

// Interface for price package
interface PricePackage {
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
  revisions: string;
  features: string[];
}

export default function NewServiceForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceImages, setServiceImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>(['']);
  const [activeTab, setActiveTab] = useState(0);
  
  // Default package templates
  const defaultPackages: PricePackage[] = [
    {
      title: 'Basic',
      description: 'Grundlegende Dienstleistung für einfache Anforderungen',
      price: '',
      deliveryTime: '',
      revisions: '1',
      features: ['']
    },
    {
      title: 'Standard',
      description: 'Umfassendere Dienstleistung mit zusätzlichen Funktionen',
      price: '',
      deliveryTime: '',
      revisions: '2',
      features: ['']
    },
    {
      title: 'Premium',
      description: 'Vollständige Dienstleistung mit allen verfügbaren Optionen',
      price: '',
      deliveryTime: '',
      revisions: '3',
      features: ['']
    }
  ];
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    tags: '',
    availability: 'flexible',
    location: '',
    faq: [{question: '', answer: ''}]
  });

  // Packages state
  const [pricePackages, setPricePackages] = useState<PricePackage[]>(defaultPackages);
  
  // Handle file selection for images
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, we'd upload the file to a server/cloud storage
      // For now, just create a URL for preview
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      setServiceImages([...serviceImages, newImageUrl]);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...serviceImages];
    newImages.splice(index, 1);
    setServiceImages(newImages);
  };

  // Add a new feature field
  const addFeature = () => {
    setFeatures([...features, '']);
  };

  // Update feature
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Remove feature
  const removeFeature = (index: number) => {
    if (features.length > 1) {
      const newFeatures = [...features];
      newFeatures.splice(index, 1);
      setFeatures(newFeatures);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle package changes
  const handlePackageChange = (index: number, field: keyof PricePackage, value: string) => {
    const updatedPackages = [...pricePackages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [field]: value
    };
    setPricePackages(updatedPackages);
  };

  // Add package feature
  const addPackageFeature = (packageIndex: number) => {
    const updatedPackages = [...pricePackages];
    updatedPackages[packageIndex].features.push('');
    setPricePackages(updatedPackages);
  };

  // Update package feature
  const updatePackageFeature = (packageIndex: number, featureIndex: number, value: string) => {
    const updatedPackages = [...pricePackages];
    updatedPackages[packageIndex].features[featureIndex] = value;
    setPricePackages(updatedPackages);
  };

  // Remove package feature
  const removePackageFeature = (packageIndex: number, featureIndex: number) => {
    if (pricePackages[packageIndex].features.length > 1) {
      const updatedPackages = [...pricePackages];
      updatedPackages[packageIndex].features.splice(featureIndex, 1);
      setPricePackages(updatedPackages);
    }
  };

  // Add FAQ item
  const addFaqItem = () => {
    setFormData({
      ...formData,
      faq: [...formData.faq, {question: '', answer: ''}]
    });
  };

  // Update FAQ item
  const updateFaqItem = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaq = [...formData.faq];
    updatedFaq[index][field] = value;
    setFormData({
      ...formData,
      faq: updatedFaq
    });
  };

  // Remove FAQ item
  const removeFaqItem = (index: number) => {
    if (formData.faq.length > 1) {
      const updatedFaq = [...formData.faq];
      updatedFaq.splice(index, 1);
      setFormData({
        ...formData,
        faq: updatedFaq
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare data for API call
      const serviceData = {
        ...formData,
        packages: pricePackages.map(pkg => ({
          ...pkg,
          price: parseFloat(pkg.price),
          deliveryTime: parseInt(pkg.deliveryTime),
          revisions: parseInt(pkg.revisions),
          features: pkg.features.filter(f => f.trim() !== '')
        })),
        generalFeatures: features.filter(f => f.trim() !== ''),
        images: serviceImages,
        status: 'draft' // Default to draft
      };

      // Here we would make an API call to save the service
      console.log('Submitting service:', serviceData);
      
      // For now, just simulate a successful save
      setTimeout(() => {
        setIsSubmitting(false);
        // Redirect to success page
        router.push('/dashboard/services/success');
      }, 1500);
      
    } catch (error) {
      console.error('Error creating service:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info Section */}
      <div className="border border-gray-200 rounded-md p-5 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grundinformationen</h3>
        
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-800">
            Titel *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="z.B. Professionelle Gartenarbeit"
          />
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-800">
            Beschreibung *
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Beschreibe deine Dienstleistung detailliert..."
          />
        </div>
        
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-800">
            Kategorie *
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            value={formData.categoryId}
            onChange={handleChange}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Kategorie auswählen</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-800">
            Tags (kommagetrennt)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="z.B. Garten, Rasen, Bäume, Hecken"
          />
          <p className="mt-1 text-xs text-gray-600">Hilft Kunden, dein Angebot besser zu finden</p>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-800">
            Standort / Einsatzgebiet
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="z.B. Berlin und Umgebung (30km)"
          />
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label htmlFor="availability" className="block text-sm font-medium text-gray-800">
            Verfügbarkeit
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="flexible">Flexibel</option>
            <option value="weekdays">Werktags</option>
            <option value="weekends">Wochenenden</option>
            <option value="evenings">Abends</option>
            <option value="limited">Eingeschränkt</option>
          </select>
        </div>
      </div>

      {/* Images */}
      <div className="border border-gray-200 rounded-md p-5 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bilder</h3>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Bilder hochladen (max. 5)
          </label>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-4">
            {serviceImages.map((image, index) => (
              <div key={index} className="relative border rounded-md overflow-hidden h-24">
                <img src={image} alt={`Service image ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
            
            {serviceImages.length < 5 && (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center h-24">
                <label className="cursor-pointer text-center">
                  <FiUpload className="mx-auto h-6 w-6 text-gray-600" />
                  <span className="mt-2 block text-sm text-gray-700">Bild hochladen</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-600">Zeige deine Arbeit mit professionellen Bildern, um mehr Kunden zu überzeugen.</p>
        </div>
      </div>

      {/* Price Packages */}
      <div className="border border-gray-200 rounded-md p-5 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preispakete</h3>
        
        {/* Package tabs */}
        <div className="border-b border-gray-200 mb-5">
          <nav className="flex -mb-px">
            {pricePackages.map((pkg, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`py-2 px-4 text-sm font-medium ${activeTab === index 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {pkg.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Package forms */}
        {pricePackages.map((pkg, packageIndex) => (
          <div key={packageIndex} className={`${activeTab === packageIndex ? 'block' : 'hidden'} space-y-4`}>
            <div>
              <label className="block text-sm font-medium text-gray-800">
                Titel des Pakets *
              </label>
              <input
                type="text"
                required
                value={pkg.title}
                onChange={(e) => handlePackageChange(packageIndex, 'title', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="z.B. Basic, Standard, Premium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Beschreibung des Pakets
              </label>
              <textarea
                rows={2}
                value={pkg.description}
                onChange={(e) => handlePackageChange(packageIndex, 'description', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Kurze Beschreibung des Pakets..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Preis (€) *
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(packageIndex, 'price', e.target.value)}
                  className="block w-full pr-12 border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-700 sm:text-sm">€</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Lieferzeit (Tage) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={pkg.deliveryTime}
                  onChange={(e) => handlePackageChange(packageIndex, 'deliveryTime', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">
                  Anzahl der Überarbeitungen
                </label>
                <input
                  type="number"
                  min="0"
                  value={pkg.revisions}
                  onChange={(e) => handlePackageChange(packageIndex, 'revisions', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-800">
                  Im Paket enthaltene Leistungen
                </label>
                <button
                  type="button"
                  onClick={() => addPackageFeature(packageIndex)}
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
              
              {pkg.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex mt-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updatePackageFeature(packageIndex, featureIndex, e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="z.B. Inklusive Material"
                  />
                  {pkg.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePackageFeature(packageIndex, featureIndex)}
                      className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* General Features */}
      <div className="border border-gray-200 rounded-md p-5 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Allgemeine Leistungen</h3>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-800">
              Was ist generell in allen Paketen enthalten?
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
          
          {features.map((feature, index) => (
            <div key={index} className="flex mt-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="z.B. Kostenlose Beratung"
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border border-gray-200 rounded-md p-5 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Häufige Fragen (FAQ)</h3>
          <button
            type="button"
            onClick={addFaqItem}
            className="inline-flex items-center py-1 px-2 text-sm border border-transparent rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="h-4 w-4 mr-1" />
            Frage hinzufügen
          </button>
        </div>
        
        {formData.faq.map((faqItem, index) => (
          <div key={index} className="mb-4 border border-gray-200 rounded-md p-4 bg-white">
            <div className="flex justify-between items-start mb-2">
              <label className="block text-sm font-medium text-gray-800">
                Frage {index + 1}
              </label>
              {formData.faq.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaqItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash className="h-4 w-4" />
                </button>
              )}
            </div>
            <input
              type="text"
              value={faqItem.question}
              onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-2 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="z.B. Welche Materialien verwenden Sie?"
            />
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Antwort
            </label>
            <textarea
              rows={2}
              value={faqItem.answer}
              onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Deine Antwort auf die Frage..."
            />
          </div>
        ))}
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Wird gespeichert...' : 'Als Entwurf speichern'}
        </button>
      </div>
    </form>
  );
} 