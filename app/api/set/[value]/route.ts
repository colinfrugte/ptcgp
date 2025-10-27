// app/api/set/[value]/route.ts
import TCGdex from "@tcgdex/sdk";
import { NextResponse } from "next/server";
import type { Payload } from "@/app/types/cards";

type ApiSet = NonNullable<
  Awaited<ReturnType<InstanceType<typeof TCGdex>["set"]["get"]>>
>;
const sdk = new TCGdex("en");
export const revalidate = 3600; // 1h cache (ISR)

const mapSetToPayload = (set: ApiSet): Payload => ({
  cardCount: {
    firstEd: set.cardCount?.firstEd,
    holo: set.cardCount?.holo ?? 0,
    normal: set.cardCount?.normal ?? 0,
    official: set.cardCount?.official ?? 0,
    reverse: set.cardCount?.reverse ?? 0,
    total: set.cardCount?.total ?? 0,
  },
  boosters:
    set.boosters?.map((booster) => ({
      id: booster.id,
      name: booster.name,
    })) ?? [],
  cards:
    set.cards?.map((card) => ({
      id: card.id,
      name: card.name,
    })) ?? [],
  id: set.id,
  legal: {
    expanded: set.legal?.expanded ?? false,
    standard: set.legal?.standard ?? false,
  },
  name: set.name,
  releaseDate: set.releaseDate,
  serie: {
    id: set.serie.id,
    name: set.serie.name,
  },
  symbol: set.symbol,
});

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ value: string }> }
) {
  try {
    const value = await ctx.params;

    const setId = value.value?.trim();

    if (!setId) {
      return NextResponse.json({ error: "Missing set id" }, { status: 400 });
    }

    const apiSet = await sdk.set.get(setId);

    if (!apiSet) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(mapSetToPayload(apiSet));
  } catch (error) {
    console.error("[api/set] fetch failed", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
