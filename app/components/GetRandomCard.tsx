"use client";

import { useState } from "react";
import TCGdex from "@tcgdex/sdk";
import Image from "next/image";

const tcgdex = new TCGdex("de");

type Card = {
  name: string;
  category: string;
  id: string;
  illustrator: string;
  localId: string;
  rarity: string;
};

export default function RandomCard() {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [card, setCard] = useState<Card | null>(null);

  async function fetchCard() {
    try {
      const card = await tcgdex.card.get("swsh3-100"); // Beispiel-ID

      if (!card) {
        alert("Karte nicht gefunden");
        setCard(null);
        return;
      }

      alert("Karte geladen: " + card.name); // TODO: Entfernen
      setCard({
        name: card.name ?? "Unbekannt",
        category: card.category ?? "Unbekannt",
        id: card.id ?? "Unbekannt",
        illustrator: card.illustrator ?? "Unbekannt",
        localId: card.localId ?? "Unbekannt",
        rarity: card.rarity ?? "Unbekannt",
      });
      setImgUrl(card.getImageURL("high", "png"));
    } catch (error) {
      console.error("Fehler beim Laden der Karte", error);
      alert("Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.");
      setCard(null);
    }
  }

  return (
    <div className="p-4 text-center">
      <button
        onClick={fetchCard}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg active:scale-95 transition-transform"
      >
        Neue Karte anzeigen
      </button>

      {card && (
        <div>
          <h2 className="mt-4 text-xl font-semibold">{card.name}</h2>
          <p className="text-gray-600">Kategorie: {card.category}</p>
          <p className="text-gray-600">ID: {card.id}</p>
          <p className="text-gray-600">Illustrator: {card.illustrator}</p>
          <Image
            width={200}
            height={300}
            src={imgUrl || ""}
            alt={card.name}
            className="mt-2"
          />
          <p className="text-gray-600">Lokale ID: {card.localId}</p>
          <p className="text-gray-600">Seltenheit: {card.rarity}</p>
        </div>
      )}
    </div>
  );
}
