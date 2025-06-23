import React, { useState } from 'react';
import { User, Upload, Check } from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar: string | null;
  onSelect: (avatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onSelect }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Avatare ilustrate în stil modern - 3 fete și 3 băieți
  const avatarOptions = [
    // Fete ilustrate
    {
      id: 'girl-1',
      svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="75" fill="#FFE4E1"/>
        <circle cx="75" cy="65" r="35" fill="#FDBCB4"/>
        <path d="M50 45 Q75 25 100 45 Q100 65 75 65 Q50 65 50 45" fill="#8B4513"/>
        <circle cx="65" cy="60" r="2" fill="#000"/>
        <circle cx="85" cy="60" r="2" fill="#000"/>
        <path d="M70 70 Q75 75 80 70" stroke="#000" stroke-width="1" fill="none"/>
        <circle cx="60" cy="75" r="3" fill="#FF69B4"/>
        <circle cx="90" cy="75" r="3" fill="#FF69B4"/>
        <rect x="60" y="100" width="30" height="50" fill="#FF6B9D" rx="5"/>
      </svg>`,
      name: 'Fată 1'
    },
    {
      id: 'girl-2',
      svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="75" fill="#E6F3FF"/>
        <circle cx="75" cy="65" r="35" fill="#FDBCB4"/>
        <path d="M45 40 Q75 20 105 40 Q105 70 75 65 Q45 70 45 40" fill="#4A4A4A"/>
        <circle cx="65" cy="60" r="2" fill="#000"/>
        <circle cx="85" cy="60" r="2" fill="#000"/>
        <path d="M70 70 Q75 75 80 70" stroke="#000" stroke-width="1" fill="none"/>
        <circle cx="55" cy="50" r="8" fill="#FFD700"/>
        <circle cx="95" cy="50" r="8" fill="#FFD700"/>
        <rect x="60" y="100" width="30" height="50" fill="#4ECDC4" rx="5"/>
      </svg>`,
      name: 'Fată 2'
    },
    {
      id: 'girl-3',
      svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="75" fill="#FFF0E6"/>
        <circle cx="75" cy="65" r="35" fill="#FDBCB4"/>
        <path d="M50 35 Q75 15 100 35 Q100 75 75 65 Q50 75 50 35" fill="#D2691E"/>
        <rect x="40" y="35" width="70" height="30" fill="#D2691E" rx="15"/>
        <circle cx="65" cy="60" r="2" fill="#000"/>
        <circle cx="85" cy="60" r="2" fill="#000"/>
        <path d="M70 70 Q75 75 80 70" stroke="#000" stroke-width="1" fill="none"/>
        <rect x="60" y="100" width="30" height="50" fill="#98D8C8" rx="5"/>
        <circle cx="50" cy="45" r="4" fill="#FF1493"/>
        <circle cx="100" cy="45" r="4" fill="#FF1493"/>
      </svg>`,
      name: 'Fată 3'
    },
    // Băieți ilustrați
    {
      id: 'boy-1',
      svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="75" fill="#E1F5FE"/>
        <circle cx="75" cy="65" r="35" fill="#FDBCB4"/>
        <path d="M55 40 Q75 25 95 40 Q95 60 75 60 Q55 60 55 40" fill="#2E2E2E"/>
        <circle cx="65" cy="60" r="2" fill="#000"/>
        <circle cx="85" cy="60" r="2" fill="#000"/>
        <path d="M70 70 Q75 75 80 70" stroke="#000" stroke-width="1" fill="none"/>
        <rect x="60" y="100" width="30" height="50" fill="#2196F3" rx="5"/>
        <circle cx="75" cy="110" r="3" fill="#FFF"/>
      </svg>`,
      name: 'Băiat 1'
    },
    {
      id: 'boy-2',
      svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="75" fill="#F3E5F5"/>
        <circle cx="75" cy="65" r="35" fill="#FDBCB4"/>
        <path d="M50 45 Q75 30 100 45 Q100 65 75 60 Q50 65 50 45" fill="#8B4513"/>
        <circle cx="65" cy="60" r="2" fill="#000"/>
        <circle cx="85" cy="60" r="2" fill="#000"/>
        <path d="M70 70 Q75 75 80 70" stroke="#000" stroke-width="1" fill="none"/>
        <rect x="60" y="100" width="30" height="50" fill="#4CAF50" rx="5"/>
        <rect x="55" y="55" width="40" height="5" fill="#000" rx="2"/>
      </svg>`,
      name: 'Băiat 2'
    },
    {
      id: 'boy-3',
      svg: `<svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="75" r="75" fill="#FFF3E0"/>
        <circle cx="75" cy="65" r="35" fill="#FDBCB4"/>
        <path d="M60 35 Q75 20 90 35 Q90 55 75 55 Q60 55 60 35" fill="#654321"/>
        <circle cx="65" cy="60" r="2" fill="#000"/>
        <circle cx="85" cy="60" r="2" fill="#000"/>
        <path d="M70 70 Q75 75 80 70" stroke="#000" stroke-width="1" fill="none"/>
        <rect x="60" y="100" width="30" height="50" fill="#FF9800" rx="5"/>
        <rect x="65" y="105" width="20" height="3" fill="#FFF"/>
        <rect x="65" y="110" width="20" height="3" fill="#FFF"/>
      </svg>`,
      name: 'Băiat 3'
    }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validare fișier
    if (!file.type.startsWith('image/')) {
      setUploadError('Te rugăm să selectezi o imagine validă.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError('Imaginea este prea mare. Dimensiunea maximă este 5MB.');
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);

      // Convertim imaginea în base64 pentru stocare
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        onSelect(base64String);
        setUploading(false);
      };
      
      reader.onerror = () => {
        setUploadError('Eroare la citirea fișierului. Te rugăm să încerci din nou.');
        setUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Eroare la încărcarea imaginii. Te rugăm să încerci din nou.');
      setUploading(false);
    }
  };

  const isCustomAvatar = selectedAvatar && !avatarOptions.some(option => 
    selectedAvatar.includes(option.id) || selectedAvatar === `data:image/svg+xml;base64,${btoa(option.svg)}`
  );

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Alege un avatar</h3>
      
      {/* Avatare predefinite */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {avatarOptions.map((avatar) => {
          const avatarDataUrl = `data:image/svg+xml;base64,${btoa(avatar.svg)}`;
          const isSelected = selectedAvatar === avatarDataUrl || selectedAvatar?.includes(avatar.id);
          
          return (
            <button
              key={avatar.id}
              type="button"
              className={`relative overflow-hidden rounded-full h-20 w-20 mx-auto flex items-center justify-center border-2 transition-all duration-200 transform hover:scale-105 ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-300 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => onSelect(avatarDataUrl)}
            >
              <div 
                className="h-full w-full rounded-full"
                dangerouslySetInnerHTML={{ __html: avatar.svg }}
              />
              {isSelected && (
                <div className="absolute inset-0 bg-indigo-600 bg-opacity-20 flex items-center justify-center rounded-full">
                  <Check className="h-6 w-6 text-indigo-600" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Separator */}
      <div className="flex items-center mb-4">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-3 text-sm text-gray-500 bg-white">sau</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Upload personalizat */}
      <div className="space-y-4">
        {/* Preview pentru imaginea încărcată */}
        {isCustomAvatar && selectedAvatar && (
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={selectedAvatar}
                alt="Avatar personalizat"
                className="h-20 w-20 rounded-full object-cover border-2 border-indigo-600 ring-2 ring-indigo-300"
              />
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <Check className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Upload button */}
        <label
          htmlFor="custom-avatar"
          className={`flex items-center justify-center px-6 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
            uploading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50'
          }`}
        >
          <div className="text-center">
            {uploading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600 mr-2"></div>
                <span className="text-sm font-medium text-gray-600">Se încarcă...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Upload className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="text-sm font-medium text-indigo-600">
                  {isCustomAvatar ? 'Schimbă imaginea' : 'Încarcă propria imagine'}
                </span>
              </div>
            )}
          </div>
          <input
            id="custom-avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>

        {/* Error message */}
        {uploadError && (
          <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-md p-2">
            {uploadError}
          </div>
        )}

        {/* Info text */}
        <p className="text-xs text-gray-500 text-center">
          Formateele acceptate: JPG, PNG, GIF. Dimensiunea maximă: 5MB.
        </p>
      </div>
    </div>
  );
};

export default AvatarSelector;