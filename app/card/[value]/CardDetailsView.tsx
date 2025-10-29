"use client";

import { useEffect, useState } from "react";
import type { CardDetail } from "@/app/types/cards";
import Image from "next/image";

import TCGdex from "@tcgdex/sdk";

const tcgdex = new TCGdex("de");

export default function CardDetailsView({ cardId }: { cardId: string }) {
  const [card, setCard] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      try {
        const card = await tcgdex.card.get(cardId); // Beispiel-ID

        if (!card) {
          setCard(null);
          return;
          setLoading(false);
        }
        setCard(card);
        setImgUrl(card.getImageURL("high", "png"));
        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Laden der Karte", error);
        alert(
          "Es ist ein Fehler aufgetreten. Bitte versuche es später erneut."
        );
        setCard(null);
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId]);

  return (
    <div>
      <div>Card Detail View</div>
      {loading ? <div>loading</div> : <Card imgUrl={imgUrl} card={card} />}
    </div>
  );
}

const Card = ({
  imgUrl,
  card,
}: {
  imgUrl: string | null;
  card: CardDetail | null;
}) => {
  if (!card) {
    return <div>No card found.</div>;
  }

  return (
    <div>
      <Image
        width={200}
        height={300}
        src={imgUrl || ""}
        alt={card.name}
        className="mt-2"
      />
      <div>Name: {card.name}</div>
      <div>Rarity: {card.rarity}</div>
      <div>Category: {card.category}</div>
      <div>Illustrator: {card.illustrator}</div>
      <div>
        Abilities:
        <ul>
          {card.abilities?.map((ability) => (
            <li key={ability.name}>{ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
