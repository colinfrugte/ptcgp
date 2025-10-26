// types/pokemon.ts
export type Payload = {
  cardCount: CardCount;
  boosters: Array<Booster> | undefined;
  cards: Array<Card>;
  id: string;
  legal: {
    expanded: boolean;
    standard: boolean;
  };
  name: string;
  releaseDate: string;
  serie: {
    id: string;
    name: string;
  };
  symbol: string | undefined;
};

export type CardCount = {
  firstEd: number | undefined;
  holo: number;
  normal: number;
  official: number;
  reverse: number;
  total: number;
};

export type Booster = {
  id: string;
  name?: string;
};
export type Card = {
  id: string;
  name: string;
};
