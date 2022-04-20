export interface Pokemons {
  count: number;
  next: string;
  previous?: any;
  status: boolean;
  message: string;
  results: PokemonItem[];
  __typename: string;
}

export interface PokemonData {
  pokemons: Pokemons;
}

export interface PokemonItem {
  id: string;
  url: string;
  name: string;
  artwork: string;
  image: string;
  dreamworld: string;
  key: string;
}

export interface Species {
  name: string;
}

export interface Type {
  type: BaseName;
}

export interface Move {
  move: BaseName;
}

export interface BaseName {
  name: string;
}

export interface Stat {
  stat: BaseName;
  base_stat: number;
}

export interface Sprites {
  back_default: string;
  front_default: string;
}

export interface Pokemon {
  id?: number;
  name?: string;
  species?: Species;
  types?: Type[];
  moves?: Move[];
  stats?: Stat[];
  sprites?: Sprites;
  nickname?: string;
}
