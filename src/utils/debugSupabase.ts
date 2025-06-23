// Utility pentru debugging conexiunea Supabase
import supabase from '../config/supabase';

export const debugSupabaseConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test basic connection with timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Connection timeout')), 10000)
    );
    
    const connectionPromise = supabase
      .from('lessons')
      .select('count')
      .limit(1);
    
    const { data: testData, error: testError } = await Promise.race([
      connectionPromise,
      timeoutPromise
    ]) as any;
    
    if (testError) {
      console.error('❌ Supabase connection error:', testError);
      console.error('Error details:', {
        message: testError.message,
        details: testError.details,
        hint: testError.hint,
        code: testError.code
      });
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    
    // Test informatica lessons specifically
    const { data: informaticaLessons, error: informaticaError } = await supabase
      .from('lessons')
      .select('*')
      .eq('subject', 'informatica');
    
    if (informaticaError) {
      console.error('❌ Error fetching informatica lessons:', informaticaError);
      return false;
    }
    
    console.log('📚 Informatica lessons found:', informaticaLessons?.length || 0);
    console.log('📋 Informatica lessons:', informaticaLessons);
    
    // Test all subjects
    const { data: allSubjects, error: subjectsError } = await supabase
      .from('lessons')
      .select('subject')
      .distinct();
    
    if (!subjectsError && allSubjects) {
      const uniqueSubjects = [...new Set(allSubjects.map(item => item.subject))];
      console.log('📖 All subjects in database:', uniqueSubjects);
    }
    
    return true;
  } catch (error) {
    console.error('💥 Unexpected error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
};

export const testInformaticaLessons = async () => {
  try {
    const { data, error } = await supabase
      .from('lessons')
      .select('id, title, subject')
      .eq('subject', 'informatica')
      .order('id');
    
    if (error) {
      console.error('Error fetching informatica lessons:', error);
      return null;
    }
    
    console.log('Informatica lessons:', data);
    return data;
  } catch (error) {
    console.error('Unexpected error in testInformaticaLessons:', error);
    return null;
  }
};

export const testEnvironmentVariables = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('Environment check:');
  console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'Present' : 'Missing');
  
  return {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    url: supabaseUrl,
    key: supabaseKey
  };
};