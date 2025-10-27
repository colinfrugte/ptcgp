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

interface Variants {
  normal?: boolean;
  reverse?: boolean;
  holo?: boolean;
  firstEdition?: boolean;
}

export type CardDetail = {
  id: string;
  name: string;
  image?: string;
  illustrator?: string;
  localId?: string;
  /**
   * Card Rarity
   *
   * - None https://www.tcgdex.net/database/sm/smp/SM01
   * - Common https://www.tcgdex.net/database/xy/xy9/1
   * - Uncommon https://www.tcgdex.net/database/xy/xy9/2
   * - Rare https://www.tcgdex.net/database/xy/xy9/3
   * - Ultra Rare
   * - Secret Rare
   */
  rarity: string;
  /**
   * Card Category
   *
   * - Pokemon
   * - Trainer
   * - Energy
   */
  category: string;
  /**
   * Card Variants (Override Set Variants)
   */
  variants?: Variants;
  /**
   * Card Set
   */
  /**
   * Pokemon only elements
   */
  /**
   * Pokemon Pokedex ID
   */
  dexId?: Array<number>;
  /**
   * Pokemon HP
   */
  hp?: number;
  /**
   * Pokemon Types
   * ex for multiple https://www.tcgdex.net/database/ex/ex13/17
   */
  types?: Array<string>;
  /**
   * Pokemon Sub Evolution
   */
  evolveFrom?: string;
  /**
   * Pokemon Weight
   */
  weight?: string;
  /**
   * Pokemon Description
   */
  description?: string;
  /**
   * Level of the Pokemon
   *
   * NOTE: can be equal to 'X' when the pokemon is a LEVEL-UP one
   */
  level?: number | string;
  /**
   * Pokemon Stage
   *
   * - Basic https://www.tcgdex.net/database/xy/xy9/1
   * - BREAK https://www.tcgdex.net/database/xy/xy9/18
   * - LEVEL-UP https://www.tcgdex.net/database/dp/dp1/121
   * - MEGA https://www.tcgdex.net/database/xy/xy1/2
   * - RESTORED https://www.tcgdex.net/database/bw/bw5/53
   * - Stage1 https://www.tcgdex.net/database/xy/xy9/2
   * - Stage2 https://www.tcgdex.net/database/xy/xy9/3
   * - VMAX https://www.tcgdex.net/database/swsh/swsh1/50
   */
  stage?: string;
  /**
   * Card Suffix
   *
   * - EX https://www.tcgdex.net/database/ex/ex2/94
   * - GX https://www.tcgdex.net/database/sm/sm12/4
   * - V https://www.tcgdex.net/database/swsh/swsh1/1
   * - Legend https://www.tcgdex.net/database/hgss/hgss1/114
   * - Prime https://www.tcgdex.net/database/hgss/hgss2/85
   * - SP https://www.tcgdex.net/database/pl/pl1/7
   * - TAG TEAM-GX https://www.tcgdex.net/database/sm/sm12/226
   */
  suffix?: string;
  /**
   * Pokemon Held Item
   *
   * ex https://www.tcgdex.net/database/dp/dp2/75
   */
  item?: {
    name: string;
    effect: string;
  };
  /**
   * Pokemon Abilities
   *
   * multi abilities ex https://www.tcgdex.net/database/ex/ex15/10
   */
  abilities?: Array<{
    type: string;
    name: string;
    effect: string;
  }>;
  /**
   * Pokemon Attacks
   */
  attacks?: Array<{
    cost?: Array<string>;
    name: string;
    effect?: string;
    damage?: string | number;
  }>;
  /**
   * Pokemon Weaknesses
   */
  weaknesses?: Array<{
    type: string;
    value?: string;
  }>;
  resistances?: Array<{
    type: string;
    value?: string;
  }>;
  retreat?: number;
  effect?: string;
  trainerType?: string;
  energyType?: string;
  /**
   * Define the rotation mark on cards >= Sword & Shield
   */
  regulationMark?: string;
  /**
   * Card ability to be played in official tournaments
   *
   * Note: all cards are avaialable to play in unlimited tournaments
   */
  legal: {
    /**
     * Ability to play in standard tournaments
     */
    standard: boolean;
    /**
     * Ability to play in expanded tournaments
     */
    expanded: boolean;
  };
  boosters?: Array<Booster>;
};
