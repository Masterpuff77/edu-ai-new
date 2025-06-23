import React, { useState } from 'react';
import { debugSupabaseConnection, testInformaticaLessons } from '../../utils/debugSupabase';
import { Bug, Database, Play, AlertTriangle, CheckCircle } from 'lucide-react';

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const checkEnvironment = () => {
    addResult('🔧 Checking environment variables...');
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl) {
      addResult('❌ VITE_SUPABASE_URL is missing from .env');
      return false;
    } else {
      addResult(`✅ VITE_SUPABASE_URL found: ${supabaseUrl.substring(0, 30)}...`);
    }
    
    if (!supabaseKey) {
      addResult('❌ VITE_SUPABASE_ANON_KEY is missing from .env');
      return false;
    } else {
      addResult(`✅ VITE_SUPABASE_ANON_KEY found: ${supabaseKey.substring(0, 20)}...`);
    }
    
    return true;
  };

  const runDebug = async () => {
    setLoading(true);
    setResults([]);
    
    addResult('🔍 Starting comprehensive debug...');
    
    // Check environment first
    const envOk = checkEnvironment();
    if (!envOk) {
      addResult('💡 Solution: Check your .env file in the project root');
      addResult('💡 It should contain:');
      addResult('   VITE_SUPABASE_URL=your_supabase_url');
      addResult('   VITE_SUPABASE_ANON_KEY=your_anon_key');
      setLoading(false);
      return;
    }
    
    try {
      const connectionOk = await debugSupabaseConnection();
      if (connectionOk) {
        addResult('✅ Supabase connection successful');
        
        const informaticaData = await testInformaticaLessons();
        if (informaticaData && informaticaData.length > 0) {
          addResult(`✅ Found ${informaticaData.length} informatica lessons`);
          informaticaData.forEach(lesson => {
            addResult(`📚 ${lesson.id}: ${lesson.title}`);
          });
        } else {
          addResult('❌ No informatica lessons found in database');
          addResult('💡 Solution: Run the SQL migration in Supabase Dashboard');
        }
      } else {
        addResult('❌ Supabase connection failed');
        addResult('💡 Check your Supabase project settings');
      }
    } catch (error) {
      addResult(`💥 Error: ${error}`);
    }
    
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors animate-pulse"
        title="Debug Panel - Click to diagnose connection issues"
      >
        <Bug className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white rounded-lg shadow-xl border p-4 w-96 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Database className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-medium">Debug Panel</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>
      
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
          <span className="text-sm text-yellow-800">Connection Failed - Running Diagnostics</span>
        </div>
      </div>
      
      <button
        onClick={runDebug}
        disabled={loading}
        className="w-full mb-4 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        <Play className="h-4 w-4 mr-2" />
        {loading ? 'Diagnosing...' : 'Run Full Diagnosis'}
      </button>
      
      <div className="space-y-1 text-xs font-mono max-h-48 overflow-y-auto">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`p-2 rounded ${
              result.includes('❌') ? 'bg-red-50 text-red-700' :
              result.includes('✅') ? 'bg-green-50 text-green-700' :
              result.includes('💡') ? 'bg-blue-50 text-blue-700' :
              'bg-gray-100'
            }`}
          >
            {result}
          </div>
        ))}
      </div>
      
      {results.length === 0 && (
        <div className="text-center text-gray-500 text-sm py-4">
          Click "Run Full Diagnosis" to check your Supabase connection
        </div>
      )}
    </div>
  );
};

export default DebugPanel;