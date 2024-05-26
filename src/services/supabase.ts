import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mappiqdehxxdtqexpyyc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcHBpcWRlaHh4ZHRxZXhweXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0Njk2MzYsImV4cCI6MjAyMDA0NTYzNn0.kM47im37u47hZOgd1kk6ap3mH5BAZEHWjaPTcl9ozp0";

console.log(supabaseKey, supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
