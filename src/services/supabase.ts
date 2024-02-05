import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mappiqdehxxdtqexpyyc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcHBpcWRlaHh4ZHRxZXhweXljIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDQ2OTYzNiwiZXhwIjoyMDIwMDQ1NjM2fQ.XsIsZPcr717KsW_mAXh05vLdz5WUmRa8yNX69bCjTwc";

console.log(supabaseKey, supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
