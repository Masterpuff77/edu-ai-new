import React, { useState } from 'react';
import { debugSupabaseConnection, testInformaticaLessons } from '../../utils/debugSupabase';
import { Bug, Database, Play } from 'lucide-react';

const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const runDebug = async () => {
    setLoading(true);
    setResults([]);
    
    addResult('🔍 Starting debug...');
    
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
        }
      } else {
        addResult('❌ Supabase connection failed');
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
        className="fixed bottom-4 left-4 z-50 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
        title="Debug Panel"
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
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      
      <button
        onClick={runDebug}
        disabled={loading}
        className="w-full mb-4 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        <Play className="h-4 w-4 mr-2" />
        {loading ? 'Running...' : 'Test Informatica'}
      </button>
      
      <div className="space-y-1 text-xs font-mono">
        {results.map((result, index) => (
          <div key={index} className="p-1 bg-gray-100 rounded">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugPanel;