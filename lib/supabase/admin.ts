import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Guard: Ensure this module cannot ever be imported or executed in browser client bundles
if (typeof window !== 'undefined') {
  throw new Error('FATAL SECURITY VIOLATION: lib/supabase/admin.ts cannot be imported or executed on the client!');
}

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is not defined. Admin actions will fall back to mock data.');
  }

  return createSupabaseClient(
    supabaseUrl,
    serviceRoleKey || 'placeholder_service_role_key',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
