import { useEffect, useState } from "react";
import "./App.css";
import { FormattedPokemon, Pokemon, pokemonRequest } from "./axiosConfig";
import Card from "./components/Card";

function App() {
  const [results, setResults] = useState<FormattedPokemon[]>([]);
  const pokemonURL = (pokemon: Pokemon[]): FormattedPokemon[] =>
    pokemon.map((pokemon) => {
      return {
        id: getPokemonId(pokemon.url),
        name: pokemon.name,
        url: formatterUrl(pokemon.url),
      };
    });

  const formatterUrl = (url: string) => {
    const pokemonId = getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  };

  const getPokemonId = (url: string) => {
    const pokemonId = url.split("/")[6];
    return pokemonId;
  };

  useEffect(() => {
    const request = async () => {
      const pokemons = await pokemonRequest();
      const url = pokemonURL(pokemons.results);

      setResults(url);
    };
    request();
  }, []);

  return (
    <div>
      {results.map((pokemon) => {
        console.log("id: ", pokemon.id);
        return (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            url={pokemon.url}
            id={pokemon.id}
          />
        );
      })}
    </div>
  );
}

export default App;
