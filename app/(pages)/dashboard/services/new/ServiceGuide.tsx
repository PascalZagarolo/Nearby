import React from 'react';
import { FiCheckCircle, FiPackage, FiDollarSign, FiLayers } from 'react-icons/fi';

const steps = [
  {
    title: 'Grundinformationen',
    description: 'Gib einen präzisen Titel und eine detaillierte Beschreibung deiner Dienstleistung an.'
  },
  {
    title: 'Preispakete erstellen',
    description: 'Definiere verschiedene Pakete (Basic, Standard, Premium) mit unterschiedlichen Leistungsumfängen und Preisen.'
  },
  {
    title: 'Pakete differenzieren',
    description: 'Stelle sicher, dass jedes Paket einen klaren Mehrwert bietet und sich deutlich voneinander unterscheidet.'
  },
  {
    title: 'Bilder hinzufügen',
    description: 'Lade qualitativ hochwertige Bilder hoch, die deine Dienstleistung am besten repräsentieren.'
  },
  {
    title: 'Leistungen definieren',
    description: 'Liste alle inkludierten Leistungen in jedem Paket auf für maximale Transparenz.'
  },
  {
    title: 'FAQ hinzufügen',
    description: 'Beantworte die häufigsten Fragen, um Vertrauen zu schaffen und den Kaufprozess zu vereinfachen.'
  },
];

export default function ServiceGuide() {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">So erstellst du ein erfolgreiches Angebot</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-medium">
                {index + 1}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">{step.title}</h3>
              <p className="text-xs text-gray-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Erfolgreiche Preispaket-Strategie:</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <FiPackage className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-medium text-gray-800">Basic-Paket</span>
              <p className="text-xs text-gray-700">Günstiger Einstiegspreis mit essentiellen Leistungen</p>
            </div>
          </li>
          <li className="flex items-start">
            <FiPackage className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-medium text-gray-800">Standard-Paket</span>
              <p className="text-xs text-gray-700">Mittlerer Preis mit mehr Leistungen (beliebteste Option)</p>
            </div>
          </li>
          <li className="flex items-start">
            <FiPackage className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-medium text-gray-800">Premium-Paket</span>
              <p className="text-xs text-gray-700">Höchster Preis mit vollständigem Leistungsumfang</p>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Tipps für erfolgreiche Angebote:</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">Verwende klare, präzise Beschreibungen für jedes Preispaket</span>
          </li>
          <li className="flex items-start">
            <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">Zeige professionelle Fotos deiner Arbeit</span>
          </li>
          <li className="flex items-start">
            <FiDollarSign className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">Ideal: Das mittlere Paket sollte 2-3x mehr wert sein als sein Preis</span>
          </li>
          <li className="flex items-start">
            <FiLayers className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">Setze das Premium-Paket bewusst höher an, damit das Standard-Paket attraktiver wirkt</span>
          </li>
          <li className="flex items-start">
            <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">Beantworte häufige Fragen, um Kaufbarrieren zu reduzieren</span>
          </li>
        </ul>
      </div>
    </div>
  );
} 