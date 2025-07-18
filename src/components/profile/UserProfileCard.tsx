import React, { useState } from 'react';
import { User, Edit2, Save, Upload, Check } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const UserProfileCard: React.FC = () => {
  const { user, updateUser, uploadAvatar, loading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    class: user?.class || '',
    school: user?.school || '',
    personalGoals: user?.personalGoals || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validare fișier
    if (!file.type.startsWith('image/')) {
      alert('Te rugăm să selectezi o imagine validă.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Imaginea este prea mare. Dimensiunea maximă este 5MB.');
      return;
    }

    try {
      setUploadingAvatar(true);
      await uploadAvatar(file);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Eroare la încărcarea imaginii. Te rugăm să încerci din nou.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const renderAvatar = () => {
    if (!user?.avatar) {
      return (
        <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
          <User className="h-12 w-12 text-indigo-400" />
        </div>
      );
    }

    // Dacă este SVG (avatar ilustrat)
    if (user.avatar.startsWith('data:image/svg+xml')) {
      return (
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          dangerouslySetInnerHTML={{ __html: atob(user.avatar.split(',')[1]) }}
        />
      );
    }

    // Dacă este imagine obișnuită
    return (
      <img 
        src={user.avatar} 
        alt="User avatar" 
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col items-center">
          {/* Avatar cu opțiune de upload */}
          <div className="relative group mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 flex items-center justify-center">
              {renderAvatar()}
            </div>
            
            {/* Upload overlay */}
            <label
              htmlFor="avatar-upload"
              className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                uploadingAvatar ? 'opacity-100' : ''
              }`}
            >
              {uploadingAvatar ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <Upload className="h-6 w-6 text-white" />
              )}
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
              />
            </label>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mb-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" /> Salvează
              </>
            ) : (
              <>
                <Edit2 className="mr-2 h-4 w-4" /> Editează profil
              </>
            )}
          </button>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nume
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                    Clasa
                  </label>
                  <input
                    id="class"
                    name="class"
                    type="text"
                    value={formData.class}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                    Școala
                  </label>
                  <input
                    id="school"
                    name="school"
                    type="text"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="personalGoals" className="block text-sm font-medium text-gray-700 mb-1">
                    Obiective personale
                  </label>
                  <textarea
                    id="personalGoals"
                    name="personalGoals"
                    rows={3}
                    value={formData.personalGoals}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="mr-3 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                  >
                    Anulare
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Salvare
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="w-full border border-gray-200 rounded-lg p-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-600 font-medium">Nume:</td>
                    <td className="py-2 text-gray-800 text-right">{user?.name || 'Nedefinit'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600 font-medium">Clasa:</td>
                    <td className="py-2 text-gray-800 text-right">{user?.class || 'Nedefinit'}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600 font-medium">Școala:</td>
                    <td className="py-2 text-gray-800 text-right">{user?.school || 'Nedefinit'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;