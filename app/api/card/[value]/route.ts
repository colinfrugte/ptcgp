// app/api/set/[value]/route.ts
import TCGdex from "@tcgdex/sdk";
import { NextResponse } from "next/server";
import type { CardDetail } from "@/app/types/cards";

type ApiSet = NonNullable<
  Awaited<ReturnType<InstanceType<typeof TCGdex>["card"]["get"]>>
>;
const sdk = new TCGdex("en");
export const revalidate = 3600; // 1h cache (ISR)

const mapCardToPayload = (card: ApiSet): CardDetail => ({
  name: card.name,
  id: card.id,
  image: card.image,
  rarity: card.rarity,
  category: card.category,
  attacks: card.attacks,
  abilities: card.abilities,
  weaknesses: card.weaknesses,
  legal: card.legal,
  illustrator: card.illustrator,
});

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ value: string }> }
) {
  try {
    const value = await ctx.params;

    const cardId = value.value.trim();

    if (!cardId) {
      return NextResponse.json({ error: "Missing card id" }, { status: 400 });
    }

    const apiSet = await sdk.card.get(cardId);

    if (!apiSet) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(mapCardToPayload(apiSet));
  } catch (error) {
    console.error("[api/set] fetch failed", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
