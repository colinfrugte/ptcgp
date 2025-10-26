import React from "react";

const quickFilters = [
  { label: "Legendär", href: "#legendary" },
  { label: "EX Karten", href: "#ex" },
  { label: "Trainer", href: "#trainer" },
  { label: "Basis", href: "#basic" },
];

export default function Filter() {
  return (
    <section className="mx-auto -mt-6 w-full max-w-6xl rounded-3xl border border-slate-100 bg-white px-6 py-6 shadow-lg md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
            Filter &amp; Suche
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Suche nach Namen, Seltenheit oder Kartentyp, um schnell das passende
            Set zu finden.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <a
              key={filter.label}
              href={filter.href}
              className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
            >
              {filter.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <label className="group flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 shadow-inner transition focus-within:border-indigo-300 focus-within:bg-white">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Suche
          </span>
          <input
            type="search"
            placeholder="Kartennamen oder ID eingeben"
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </label>

        <label className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-indigo-300">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Seltenheit
          </span>
          <select className="w-full bg-transparent text-sm text-slate-700 focus:outline-none">
            <option value="">Alle</option>
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="ultra-rare">Ultra Rare</option>
          </select>
        </label>

        <label className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-indigo-300">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Typ
          </span>
          <select className="w-full bg-transparent text-sm text-slate-700 focus:outline-none">
            <option value="">Alle</option>
            <option value="pokemon">Pokémon</option>
            <option value="trainer">Trainer</option>
            <option value="energy">Energie</option>
          </select>
        </label>
      </div>
    </section>
  );
}
