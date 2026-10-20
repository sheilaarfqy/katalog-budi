"use server";

import { redirect } from "next/navigation";
import { buatClientSesiAdmin } from "@/lib/supabase/server";

export async function login(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const isActionState = formData instanceof FormData;

  const email = data?.get("email");
  const password = data?.get("password");

  if (!email || !password) {
    const pesan = "Email dan password wajib diisi.";
    if (isActionState) {
      return { error: pesan };
    }
    redirect(`/admin/login?error=${encodeURIComponent(pesan)}`);
  }

  try {
    const supabase = await buatClientSesiAdmin();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(email).trim(),
      password: String(password),
    });

    if (error) {
      const pesan = "Email atau password salah.";
      if (isActionState) {
        return { error: pesan };
      }
      redirect(`/admin/login?error=${encodeURIComponent(pesan)}`);
    }
  } catch (err) {
    // Jika err adalah redirect Next.js, biarkan melempar
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    const pesan = err instanceof Error ? err.message : "Gagal masuk. Coba lagi nanti.";
    if (isActionState) {
      return { error: pesan };
    }
    redirect(`/admin/login?error=${encodeURIComponent(pesan)}`);
  }

  redirect("/admin");
}

export async function keluar() {
  const supabase = await buatClientSesiAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

