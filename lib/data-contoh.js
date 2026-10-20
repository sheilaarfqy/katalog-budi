// DATA CONTOH: dipakai sebagai pratinjau saat konfigurasi Supabase belum tersedia.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.

export const produkContoh = [
  {
    id: 1,
    nama: "Roti Sobek Cokelat",
    harga: 28000,
    deskripsi: "Roti lembut berisi cokelat lumer, cocok dinikmati hangat bersama keluarga.",
    foto_url: "/produk/roti-sobek.svg",
    kategori: "Makanan",
  },
  {
    id: 2,
    nama: "Croissant Butter",
    harga: 22000,
    deskripsi: "Pastry berlapis yang renyah di luar dan lembut di dalam, dibuat dengan butter.",
    foto_url: "/produk/croissant.svg",
    kategori: "Makanan",
  },
  {
    id: 3,
    nama: "Nastar Nanas",
    harga: 45000,
    deskripsi: "Kue kering lembut dengan selai nanas rumahan yang manis dan sedikit asam.",
    foto_url: "/produk/nastar.svg",
    kategori: "Makanan",
  },
  {
    id: 4,
    nama: "Es Kopi Susu Gula Aren",
    harga: 22000,
    deskripsi: "Espresso, susu segar, dan gula aren dengan rasa manis yang seimbang.",
    foto_url: "/produk/kopi-susu.svg",
    kategori: "Minuman",
  },
  {
    id: 5,
    nama: "Matcha Latte",
    harga: 25000,
    deskripsi: "Matcha pilihan dengan susu lembut, disajikan dingin untuk menemani harimu.",
    foto_url: "/produk/matcha-latte.svg",
    kategori: "Minuman",
  },
  {
    id: 6,
    nama: "Lemon Tea",
    harga: 18000,
    deskripsi: "Teh hitam segar dengan perasan lemon dan sentuhan manis yang ringan.",
    foto_url: "/produk/lemon-tea.svg",
    kategori: "Minuman",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}
