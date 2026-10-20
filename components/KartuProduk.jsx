import Link from "next/link";
import { formatRupiah } from "@/lib/format";

export default function KartuProduk({ produk }) {
  return (
    <Link
      href={`/produk/${produk.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-garis bg-latar transition-shadow hover:shadow-lg hover:shadow-teks/5"
    >
      <img
        src={produk.foto_url}
        alt={produk.nama}
        className="aspect-[4/3] w-full bg-permukaan object-cover sm:aspect-square"
      />
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <p className="text-xs font-medium text-teks-lembut">{produk.kategori}</p>
        <h3 className="font-semibold leading-snug group-hover:text-utama">{produk.nama}</h3>
        <p className="mt-auto self-start pt-1 text-sm font-bold text-harga">
          {formatRupiah(produk.harga)}
        </p>
      </div>
    </Link>
  );
}
