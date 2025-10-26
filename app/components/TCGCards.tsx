// Example: Getting cards from a TCG Pocket set
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Cards = {
  id: string;
  name: string;
  series: string;
};

export default function TCGCards() {
  const [cards, setCards] = useState<Cards[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.tcgdex.net/v2/en/sets/A1", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const { cards } = await response.json();
      setCards(cards.slice(0, 20));
    } catch (err) {
      console.error("Fehler beim Laden der Karten", err);
      setCards([]);
      setError("Karten konnten nicht geladen werden.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const hasCards = useMemo(() => cards.length > 0, [cards]);

  return (
    <section
      id="cards"
      className="mx-auto mt-14 max-w-6xl rounded-3xl border border-slate-100 bg-white px-6 py-10 shadow-lg md:px-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Kartenübersicht
          </h2>
          <p className="mt-1 text-sm text-slate-500 md:text-base">
            Eine Auswahl aus dem A1 Basis-Set. Klicke auf eine Karte, um mehr zu
            erfahren.
          </p>
        </div>
        <button
          onClick={loadCards}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          {isLoading ? "Aktualisiert..." : "Neu laden"}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : hasCards ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <article
                key={card.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              >
                <span className="text-xs uppercase tracking-wide text-indigo-500">
                  {card.series}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-800 group-hover:text-indigo-600">
                  {card.name}
                </h3>
                <button className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition group-hover:translate-x-1">
                  Details ansehen
                  <span aria-hidden>→</span>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-slate-50 p-6 text-center text-sm font-medium text-slate-500">
            Keine Karten gefunden.
          </p>
        )}
      </div>
    </section>
  );
}
