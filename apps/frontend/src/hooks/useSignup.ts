import { Session } from '@supabase/supabase-js';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export const useSignup = (): [
  Session | null,
  (email: string, password: string) => void
] => {
  const [session, setSession] = useState<Session | null>(null);

  const signup = (email: string, password: string) => {
    supabase.auth
      .signUp({
        email,
        password,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        setSession(data.session);
      });
  };

  return [session, signup];
};
