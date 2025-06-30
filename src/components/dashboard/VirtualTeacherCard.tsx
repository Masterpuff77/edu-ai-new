import React, { useState } from 'react';
import { Video, User, Lightbulb, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const VirtualTeacherCard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOpenVirtualTeacher = () => {
    setLoading(true);
    // Navigate to the virtual teacher page
    navigate('/virtual-teacher');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
              <Video className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-white">Profesorul Virtual</h3>
            <p className="mt-1 text-sm text-white text-opacity-90">
              Învață mai eficient cu ajutorul profesorului virtual care îți explică conceptele prin videoclipuri personalizate.
            </p>
            
            <div className="mt-4 flex items-center text-sm text-white text-opacity-90">
              <User className="h-4 w-4 mr-1" />
              <span>Profesor: AI Assistant</span>
            </div>

            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleOpenVirtualTeacher}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-indigo-700 disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                Deschide profesorul virtual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTeacherCard;