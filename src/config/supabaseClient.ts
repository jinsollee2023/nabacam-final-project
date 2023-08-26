import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey: string = process.env.REACT_APP_ANON_KEY as string;
const supabaseServiceKey: string = process.env
  .REACT_APP_SUPABASE_SERVICE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
