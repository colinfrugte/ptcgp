"use client";
import { useEffect, useState } from "react";
import type { Payload } from "../types/cards";
import Link from "next/link";

type DisplayProps = {
  value: string; // Parent MUSS das übergeben
  onSelectionChange?: (ids: string[]) => void;
};

export default function DisplayPage({ value }: DisplayProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Payload | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setLoading(false);
      setData(null);
      setErr(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setErr(null);
    setData(null);

    (async () => {
      try {
        const res = await fetch(`/api/set/${value}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          const { error } = await res.json().catch(() => ({ error: null }));
          throw new Error(error ?? `HTTP ${res.status}`);
        }
        const json: Payload = await res.json();
        if (!controller.signal.aborted) {
          setData(json);
        }
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return;
        const message =
          error instanceof Error ? error.message : "Unbekannter Fehler";
        setErr(message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [value]);

  if (!value) {
    return (
      <p className="mt-4 text-sm text-gray-500">
        Bitte wähle zunächst ein Set aus.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-gray-600">
        <span className="animate-pulse rounded bg-gray-200 px-3 py-2">
          Lade Set …
        </span>
      </div>
    );
  }

  if (err) {
    return <p className="text-red-600">Fehler: {err}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="mt-4 text-lg">
      <p>
        Du hast gewählt: <b>{value}</b>
      </p>
      <div className="grid grid-cols-4 gap-4">
        {data.cards.map((card) => (
          <Link href={`/card/${card.id}`} key={card.id}>
            {card.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
