"use client";

import TCGdex from "@tcgdex/sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Payload } from "../types/cards";

const tcgdex = new TCGdex("de");

export default function TCGSets() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiSet = await tcgdex.set.get("A1");
      if (!apiSet) {
        throw new Error("Das gewünschte Set wurde nicht gefunden.");
      }

      setPayload({
        cardCount: {
          firstEd: apiSet.cardCount.firstEd,
          holo: apiSet.cardCount.holo,
          normal: apiSet.cardCount.normal,
          official: apiSet.cardCount.official,
          reverse: apiSet.cardCount.reverse,
          total: apiSet.cardCount.total,
        },
        boosters:
          apiSet.boosters?.map((booster) => ({
            id: booster.id,
            name: booster.name,
          })) ?? [],
        cards:
          apiSet.cards?.map((card) => ({
            id: card.id,
            name: card.name,
          })) ?? [],
        id: apiSet.id,
        legal: {
          expanded: apiSet.legal.expanded,
          standard: apiSet.legal.standard,
        },
        name: apiSet.name,
        releaseDate: apiSet.releaseDate,
        serie: {
          id: apiSet.serie.id,
          name: apiSet.serie.name,
        },
        symbol: apiSet.symbol,
      });
    } catch (err) {
      console.error("Fehler beim Laden des Sets", err);
      setPayload(null);
      setError("Beim Laden der Sets ist ein Fehler aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSets();
  }, [loadSets]);

  const topCards = useMemo(() => payload?.cards.slice(0, 12) ?? [], [payload]);

  return (
    <section
      id="sets"
      className="mx-auto mt-10 max-w-6xl rounded-3xl border border-slate-100 bg-white px-6 py-10 shadow-lg md:px-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Aktuelle Sets
          </h2>
          <p className="mt-1 text-sm text-slate-500 md:text-base">
            Ein Einblick in das Set der Karmesin &amp; Purpur Serie (A1).
          </p>
        </div>
        <button
          onClick={loadSets}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >
          {isLoading ? "Lädt..." : "Aktualisieren"}
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,1.5fr]">
        <div className="space-y-4 rounded-2xl bg-slate-50 p-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-slate-800">
              {payload?.name ?? "Set"}
            </p>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              {payload?.serie.name ?? "Serie"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center text-sm font-semibold text-slate-600">
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs uppercase text-slate-400">Release</p>
              <p className="mt-1 text-base text-slate-800">
                {payload?.releaseDate ?? "–"}
              </p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs uppercase text-slate-400">Karten</p>
              <p className="mt-1 text-base text-slate-800">
                {payload?.cardCount.total ?? "–"}
              </p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs uppercase text-slate-400">Legal (Std.)</p>
              <p className="mt-1 text-base text-slate-800">
                {payload?.legal.standard ? "Ja" : "Nein"}
              </p>
            </div>
            <div className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-xs uppercase text-slate-400">Legal (Exp.)</p>
              <p className="mt-1 text-base text-slate-800">
                {payload?.legal.expanded ? "Ja" : "Nein"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Booster
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(payload?.boosters ?? []).length === 0 && !isLoading ? (
                <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-400 shadow-inner">
                  Keine Booster verfügbar
                </span>
              ) : (
                (payload?.boosters ?? []).map((booster) => (
                  <span
                    key={booster.id}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow"
                  >
                    {booster.name ?? booster.id}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topCards.map((card) => (
                <article
                  key={card.id}
                  className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <p className="text-xs uppercase text-indigo-500">
                    {payload?.id}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-slate-800 group-hover:text-indigo-600">
                    {card.name}
                  </h3>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
