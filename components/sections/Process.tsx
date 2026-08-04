export function Process() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-auto">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/espresso-pour-poster.jpg"
            className="h-full w-full object-cover"
          >
            <source src="/videos/espresso-pour.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="flex flex-col gap-5">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Proses Kami
          </span>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
            Setiap Tetes, Penuh Perhatian
          </h2>
          <p className="text-balance leading-relaxed text-foreground/70">
            Dari penggilingan hingga ekstraksi, setiap cangkir di Rassa
            Coffee diseduh dengan presisi dan kesabaran — memastikan cita
            rasa biji kopi Gayo pilihan kami keluar sepenuhnya di setiap
            tegukan.
          </p>
        </div>
      </div>
    </section>
  );
}
