"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { buatClientSesiAdmin } from "@/lib/supabase/server";

export async function periksaLoginAdmin() {
  const supabase = await buatClientSesiAdmin();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Akses ditolak. Silakan login terlebih dahulu.");
  }

  return { supabase, user };
}

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

export async function gantiPassword(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;

  const passwordBaru = data?.get("password_baru");
  const konfirmasiPassword = data?.get("konfirmasi_password");

  if (!passwordBaru || String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password tidak sama." };
  }

  try {
    const { supabase } = await periksaLoginAdmin();

    const { error } = await supabase.auth.updateUser({
      password: String(passwordBaru),
    });

    if (error) {
      return { error: `Gagal mengganti password: ${error.message}` };
    }

    return { success: "Password berhasil diganti." };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Terjadi kesalahan saat mengganti password.",
    };
  }
}

export async function tambahProduk(formData) {
  const { supabase } = await periksaLoginAdmin();

  const nama = formData.get("nama");
  const hargaRaw = formData.get("harga");
  const harga = parseInt(hargaRaw, 10);
  const kategori = formData.get("kategori");
  const foto_url = formData.get("foto_url");
  const deskripsi = formData.get("deskripsi");

  if (!nama || isNaN(harga) || harga < 0) {
    throw new Error("Nama dan harga produk valid wajib diisi.");
  }

  const { error } = await supabase.from("produk").insert({
    nama: String(nama).trim(),
    harga,
    kategori: kategori ? String(kategori).trim() : null,
    foto_url: foto_url ? String(foto_url).trim() : null,
    deskripsi: deskripsi ? String(deskripsi).trim() : null,
  });

  if (error) {
    throw new Error(`Gagal menambah produk: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
