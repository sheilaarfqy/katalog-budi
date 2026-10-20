import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { buatClientServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  let daftarProduk = [];
  let pesanError = null;

  try {
    const supabase = buatClientServer();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      pesanError = `Gagal memuat produk dari database: ${error.message}`;
    } else {
      daftarProduk = data || [];
    }
  } catch (err) {
    pesanError =
      err instanceof Error
        ? `Gagal memuat produk dari database: ${err.message}`
        : "Gagal memuat produk dari database. Periksa konfigurasi Supabase.";
  }

  return (
    <>
      <section className="py-12 sm:py-20">
        <p className="text-sm font-semibold tracking-wide text-utama">Dibuat segar setiap hari</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          {toko.nama}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-teks-lembut sm:text-lg">
          {toko.tagline}
        </p>
        <p className="mt-5 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-8 pb-12 sm:gap-10">
        <h2
          id="judul-produk"
          className="border-b border-garis pb-5 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Menu pilihan
        </h2>

        {pesanError ? (
          <p
            role="alert"
            className="rounded-xl border border-garis bg-permukaan p-4 text-sm text-bahaya"
          >
            {pesanError}
          </p>
        ) : daftarProduk.length === 0 ? (
          <p className="text-teks-lembut">Belum ada produk</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
