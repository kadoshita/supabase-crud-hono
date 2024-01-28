import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT = import.meta.env.VITE_SUPABASE_PROJECT ?? '';
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY ?? '';

export const supabase = createClient(
  `https://${SUPABASE_PROJECT}.supabase.co`,
  SUPABASE_API_KEY
);
