import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import useAuthStore from '../store/authStore';
import { Lightbulb } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex flex-col justify-center items-center p-4">
      
      <LoginForm />

      <p className="mt-8 text-center text-sm text-gray-500">
        Platformă educațională AI pentru elevi. <br />
        Învață în ritmul tău, cu ajutorul inteligenței artificiale.
      </p>
    </div>
  );
};

export default LoginPage;