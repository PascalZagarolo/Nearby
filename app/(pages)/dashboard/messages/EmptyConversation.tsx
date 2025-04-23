import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

export default function EmptyConversation() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
          <FiMessageSquare className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ihre Nachrichten</h3>
        <p className="text-sm text-gray-600 max-w-md mb-6">
          Wählen Sie eine Konversation aus der Liste, um Nachrichten zu lesen und zu senden.
          Alle Ihre Kommunikationen zu Dienstleistungen werden hier angezeigt.
        </p>
        <p className="text-xs text-gray-500">
          Nachrichten werden für 90 Tage nach Abschluss eines Auftrags aufbewahrt.
        </p>
      </div>
    </div>
  );
} 