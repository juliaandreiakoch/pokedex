import axios from "axios";

interface PokemonRequestProps {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonAbilityRequestProps {
  effect_entries: Effect[];
  version_group: { name: string; url: string };
}

export interface Effect {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface FormattedPokemon {
  id: string;
  name: string;
  url: string;
}

const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export const pokemonRequest = async (): Promise<PokemonRequestProps> => {
  const response = await instance.get("pokemon");

  return response.data;
};

export const pokemonAbilityRequest = async (
  id: string
): Promise<PokemonAbilityRequestProps> => {
  const response = await instance.get(`ability/${id}`);

  return response.data;
};
