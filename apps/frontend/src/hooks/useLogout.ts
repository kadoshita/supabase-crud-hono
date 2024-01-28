import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

export const useLogout = (): (() => Promise<{ error: AuthError | null }>) => {
  const logout = () => {
    return supabase.auth.signOut();
  };

  return logout;
};
