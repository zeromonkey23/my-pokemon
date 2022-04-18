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
