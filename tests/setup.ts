// Vitest setup configuration
import { beforeAll } from 'vitest';

beforeAll(() => {
  // Mock environment variables if not present during test execution
  process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock_anon_key';
});
