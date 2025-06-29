import React, { useState } from 'react';
import { User } from 'lucide-react';
import TavusAvatar from './TavusAvatar';

const TavusAvatarButton: React.FC = () => {
  const [showAvatar, setShowAvatar] = useState(false);

  const toggleAvatar = () => {
    setShowAvatar(!showAvatar);
  };

  return (
    <>
      <button
        onClick={toggleAvatar}
        className="fixed bottom-20 right-4 z-40 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white"
        aria-label="Open professor avatar"
      >
        <User className="h-6 w-6" />
      </button>

      {showAvatar && <TavusAvatar onClose={() => setShowAvatar(false)} />}
    </>
  );
};

export default TavusAvatarButton;