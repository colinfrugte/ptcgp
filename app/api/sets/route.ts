// app/api/sets/route.ts
import TCGdex from "@tcgdex/sdk";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1h cachen (ISR)

export async function GET() {
  try {
    const sdk = new TCGdex("en");
    const response = await sdk.fetchSets("tcgp");
    if (!response) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }
    const setList = response;

    return NextResponse.json(setList);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
