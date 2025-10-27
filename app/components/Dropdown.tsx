// app/components/SetsDropdown.tsx
"use client";
import { useEffect, useState } from "react";

type TcgSet = {
  id: string;
  name: string;
  releaseDate?: string;
  serie?: string;
  // ... weitere Felder bei Bedarf
};

type Props = {
  onChange?: (setId: string) => void;
};

export default function SetsDropdown({ onChange }: Props) {
  const [sets, setSets] = useState<TcgSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/sets");
        const data: TcgSet[] = await res.json();
        if (!mounted) return;
        setSets(data);
        if (data.length) {
          setSelected(data[0].id);
          onChange?.(data[0].id);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [onChange]);

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-gray-600">
        <span className="animate-pulse rounded bg-gray-200 px-3 py-2">
          Lade Sets…
        </span>
      </div>
    );
  }

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        TCG Sets
      </span>
      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onChange?.(e.target.value);
        }}
        className="block w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {sets.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} {s.releaseDate ? `(${s.releaseDate})` : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
