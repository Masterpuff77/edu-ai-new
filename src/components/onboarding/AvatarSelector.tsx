import React, { useState } from 'react';
import { User, Upload, Check } from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar: string | null;
  onSelect: (avatar: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onSelect }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Avatare ilustrate - 3 fete și 3 băieți
  const avatarOptions = [
    // Fete ilustrate
    'https://images.pexels.com/photos/8923533/pexels-photo-8923533.jpeg?auto=compress&cs=tinysrgb&w=150', // Ilustrație fată 1
    'https://images.pexels.com/photos/8923534/pexels-photo-8923534.jpeg?auto=compress&cs=tinysrgb&w=150', // Ilustrație fată 2
    'https://images.pexels.com/photos/8923535/pexels-photo-8923535.jpeg?auto=compress&cs=tinysrgb&w=150', // Ilustrație fată 3
    
    // Băieți ilustrați
    'https://images.pexels.com/photos/8923536/pexels-photo-8923536.jpeg?auto=compress&cs=tinysrgb&w=150', // Ilustrație băiat 1
    'https://images.pexels.com/photos/8923537/pexels-photo-8923537.jpeg?auto=compress&cs=tinysrgb&w=150', // Ilustrație băiat 2
    'https://images.pexels.com/photos/8923538/pexels-photo-8923538.jpeg?auto=compress&cs=tinysrgb&w=150', // Ilustrație băiat 3
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

      // Convertim imaginea în base64 pentru stocare temporară
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

  const isCustomAvatar = selectedAvatar && !avatarOptions.includes(selectedAvatar);

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Alege un avatar</h3>
      
      {/* Avatare predefinite */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {avatarOptions.map((avatar, index) => (
          <button
            key={index}
            type="button"
            className={`relative overflow-hidden rounded-full h-20 w-20 mx-auto flex items-center justify-center border-2 transition-all duration-200 transform hover:scale-105 ${
              selectedAvatar === avatar
                ? 'border-indigo-600 ring-2 ring-indigo-300 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => onSelect(avatar)}
          >
            <img
              src={avatar}
              alt={`Avatar ilustrat ${index + 1}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback pentru avatare ilustrate
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" fill="#e5e7eb"/>
                    <circle cx="40" cy="30" r="12" fill="#9ca3af"/>
                    <path d="M20 65 C20 55, 28 50, 40 50 C52 50, 60 55, 60 65" fill="#9ca3af"/>
                  </svg>
                `)}`;
              }}
            />
            {selectedAvatar === avatar && (
              <div className="absolute inset-0 bg-indigo-600 bg-opacity-20 flex items-center justify-center">
                <Check className="h-6 w-6 text-indigo-600" />
              </div>
            )}
          </button>
        ))}
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
        {isCustomAvatar && (
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