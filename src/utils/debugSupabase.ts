// Utility pentru debugging conexiunea Supabase
import supabase from '../config/supabase';

export const debugSupabaseConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('lessons')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Supabase connection error:', testError);
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
    
    if (!subjectsError) {
      const uniqueSubjects = [...new Set(allSubjects?.map(item => item.subject))];
      console.log('📖 All subjects in database:', uniqueSubjects);
    }
    
    return true;
  } catch (error) {
    console.error('💥 Unexpected error:', error);
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
      console.error('Error:', error);
      return null;
    }
    
    console.log('Informatica lessons:', data);
    return data;
  } catch (error) {
    console.error('Unexpected error:', error);
    return null;
  }
};