import React from 'react';
import { Video, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TavusAvatarCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-white">Asistent Virtual</h3>
              <p className="text-white/80 text-sm">Conversație video interactivă</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-white/90 mb-6">
            Discută cu asistentul virtual care te poate ajuta cu întrebări despre educație și procesul de învățare.
          </p>
          
          <button
            onClick={() => navigate('/tavus-avatar')}
            className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
          >
            Începe conversația
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TavusAvatarCard;