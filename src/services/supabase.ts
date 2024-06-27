import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mappiqdehxxdtqexpyyc.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
  ? process.env.NEXT_PUBLIC_SUPABASE_KEY
  : "";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
