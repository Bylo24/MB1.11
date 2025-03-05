import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Use the correct URL and API key from environment variables
const supabaseUrl = 'https://yzfnrdcuafamsjkppmka.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6Zm5yZGN1YWZhbXNqa3BwbWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MjAyMTUsImV4cCI6MjA1NjE5NjIxNX0.1SSzASgQcrQAGFa4RxraBdROcwIbRknmBmU6Und3iOM';

console.log('Initializing Supabase client with:');
console.log('URL:', supabaseUrl);
console.log('API Key:', supabaseAnonKey ? 'Set' : 'Not set');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce', // Use PKCE flow for better security
  },
  global: {
    // Set a longer timeout of 30 seconds to prevent fetch aborts
    fetch: (url, options) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      return fetch(url, {
        ...options,
        signal: controller.signal,
      }).finally(() => {
        clearTimeout(timeoutId);
      });
    },
  },
});