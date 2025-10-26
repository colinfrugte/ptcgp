import React from "react";

export default function Header() {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" />
      <div className="relative z-10 px-8 py-12 md:px-16">
        <p className="mb-4 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
          Pokémon TCG Explorer
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Finde deine nächste Lieblingskarte
        </h1>
        <p className="mt-4 max-w-2xl text-sm font-medium text-white/80 md:text-base">
          Durchstöbere Sets, entdecke Karten und sammle Inspiration für dein
          nächstes Deck. Alles an einem Ort, direkt aus der TCGdex API – schnell
          und zuverlässig.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
          <a
            href="#cards"
            className="rounded-full bg-white px-5 py-2 text-indigo-700 transition hover:bg-indigo-50"
          >
            Karten entdecken
          </a>
          <a
            href="#sets"
            className="rounded-full border border-white/50 px-5 py-2 text-white transition hover:border-white hover:bg-white/10"
          >
            Sets durchsuchen
          </a>
        </div>
      </div>
    </header>
  );
}
