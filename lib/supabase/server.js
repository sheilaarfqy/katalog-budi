import { createClient } from "@supabase/supabase-js";

export function buatClientServer() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  // Bersihkan URL dari spasi, trailing slash, atau path /rest/v1 jika tidak sengaja tertempel
  const cleanedUrl = supabaseUrl
    .trim()
    .replace(/\/rest\/v1\/?$/, "")
    .replace(/\/+$/, "");

  return createClient(cleanedUrl, supabaseSecretKey.trim(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export default buatClientServer;
