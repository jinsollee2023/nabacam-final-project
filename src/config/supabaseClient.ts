import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || "";
const supabaseKey: string = process.env.REACT_APP_ANON_KEY || "";
const supabaseServiceKey: string =
  process.env.REACT_APP_SUPABASE_SERVICE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
