import Image from "next/image";

const photos = [
  {
    src: "/images/gallery-interior-wide.jpeg",
    alt: "Suasana interior gallery kopi Rassa Coffee",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/gallery-coffee-cup.jpeg",
    alt: "Secangkir kopi Rassa Coffee di atas meja kayu",
    className: "",
  },
  {
    src: "/images/gallery-product-bag.jpeg",
    alt: "Kemasan biji kopi Rassa Coffee Gayo",
    className: "",
  },
  {
    src: "/images/gallery-bags-storefront.jpeg",
    alt: "Kemasan kopi Rassa Coffee di depan kedai",
    className: "",
  },
  {
    src: "/images/gallery-atmosphere.jpeg",
    alt: "Suasana santai di gallery kopi Rassa Coffee",
    className: "",
  },
];

export function Gallery() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Gallery Kami
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Sudut-Sudut Rassa Coffee
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance leading-relaxed text-foreground/70">
            Dari mobil kopi keliling, kini menjadi sebuah gallery kopi —
            begini suasananya dari dekat.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
          {photos.map(({ src, alt, className }) => (
            <div
              key={src}
              className={`relative aspect-square overflow-hidden rounded-2xl ${className}`}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
