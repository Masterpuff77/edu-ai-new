import React, { useState } from 'react';
import { Video, User, AlertCircle } from 'lucide-react';

interface TavusPersonaChatProps {
  activeSubject: string;
}

const TavusPersonaChat: React.FC<TavusPersonaChatProps> = ({ activeSubject }) => {
  const [showInfo, setShowInfo] = useState(false);

  const getSubjectName = (subject: string) => {
    const names: { [key: string]: string } = {
      matematica: 'Matematică',
      romana: 'Limba Română',
      fizica: 'Fizică',
      chimie: 'Chimie',
      biologie: 'Biologie',
      informatica: 'Informatică',
      geografie: 'Geografie',
      istorie: 'Istorie'
    };
    return names[subject] || subject;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Profesor Virtual AI</h3>
              <p className="text-sm text-gray-600">
                Funcționalitate în dezvoltare
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center mb-4">
                <Video className="h-12 w-12 text-white" />
              </div>
              <h4 className="text-white text-lg font-medium mb-2">Profesor Virtual AI</h4>
              <p className="text-white text-opacity-80 text-sm mb-6">
                Funcționalitatea de chat video cu profesorul virtual este în curs de dezvoltare și va fi disponibilă în curând.
              </p>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="inline-flex items-center px-6 py-3 rounded-lg font-medium bg-white text-purple-900 hover:bg-gray-100 transition-colors"
              >
                <AlertCircle className="h-5 w-5 mr-2" />
                Află mai multe
              </button>
            </div>
          </div>
        </div>

        {showInfo && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Despre Profesorul Virtual AI</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Profesorul Virtual AI va fi un asistent educațional avansat care va putea:
                </p>
                <ul className="text-blue-800 text-sm space-y-1 mb-3">
                  <li>• Să explice concepte complexe în mod interactiv</li>
                  <li>• Să răspundă la întrebări în timp real</li>
                  <li>• Să se adapteze la stilul tău de învățare</li>
                  <li>• Să ofere feedback personalizat</li>
                </ul>
                <p className="text-blue-700 text-sm">
                  Această funcționalitate va fi lansată în următoarea actualizare a platformei.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-900 mb-2">Alternativă disponibilă</h4>
              <p className="text-amber-800 text-sm mb-3">
                În timp ce profesorul virtual nu este disponibil, poți folosi asistentul AI din secțiunea Dashboard pentru întrebări despre {getSubjectName(activeSubject)}.
              </p>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="text-amber-700 hover:text-amber-900 text-sm font-medium underline"
              >
                Mergi la Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border-2 border-purple-200 mt-4">
          <h4 className="font-medium text-purple-900 mb-2">Funcționalități planificate:</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Chat video interactiv cu profesor AI</li>
            <li>• Explicații personalizate pentru {getSubjectName(activeSubject)}</li>
            <li>• Sesiuni de întrebări și răspunsuri în timp real</li>
            <li>• Adaptare la nivelul de cunoștințe al elevului</li>
            <li>• Suport pentru exerciții și probleme practice</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TavusPersonaChat;