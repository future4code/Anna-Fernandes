import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "./components/PokeCard/PokeCard";
import {AppContainer, Container, Select, Title} from "./styles";
import {GlobalStyle} from "./global";

export default function App() {

  const [pokeList, setPokeList] = useState([]);
  const [pokeName, setPokeName] = useState("");

  useEffect(() => {
    getPokemons()
  }, [])

  const getPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(response => {
        setPokeList(response.data.results)
      })
      .catch(err => {
        console.log(err);
      });
  };

  const changePokeName = event => {
    setPokeName(event.target.value);
  };

  return (
    <>
    <GlobalStyle />
    <AppContainer>
      <Title>PokeApi</Title>
      <Container>
        <Select onChange={changePokeName}>
          <option value={""}>Nenhum</option>
          {pokeList.map(pokemon => {
            return (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            );
          })}
        </Select>
        {pokeName && <PokeCard pokemon={pokeName} />}
      </Container>
    </AppContainer>
    </>
  );
}
