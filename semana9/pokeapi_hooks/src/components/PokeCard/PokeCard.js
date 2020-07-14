import React, { useState, useEffect } from "react";
import axios from "axios";

import {PokeCardContainer, PokeTitle} from "./styles";

export default function PokeCard(props) {

  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    pegaPokemon(props.pokemon);
  }, [props.pokemon])

  const pegaPokemon = pokeName => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
      .then(response => {
        setPokemon(response.data );
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <PokeCardContainer>
      <PokeTitle>{pokemon.name}</PokeTitle>
      <p><strong>peso: </strong>{pokemon.weight} Kg</p>
      {pokemon.types && <p><strong>tipo: </strong>{pokemon.types[0].type.name}</p>}
      {pokemon.sprites && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
    </PokeCardContainer>
  );
}