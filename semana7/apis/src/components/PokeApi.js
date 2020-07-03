import React from 'react';
import styled from "styled-components";
import axios from "axios";

const PokeContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export class PokeApi extends React.Component {
  state = {
    pokeList: [],
    pokeImage: "",
    pokeName: ""
  };

  componentDidMount = () => {
    this.pegaPokemons()
  }

  pegaPokemons = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151");
      this.setState({ pokeList: response.data.results });
    } catch (err) {
      console.log(err.message);
    }
  }

  onChangePokemon = event => {
    const pokeName = event.target.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`).then( response => {
      this.setState({ pokeImage: response.data.sprites.front_default, pokeName: pokeName })
    }).catch(err => {
      console.log(err.message)
    })
  }


  render() {
    const pokemon = <div>
      <h3>{this.state.pokeName}</h3>
      <img src={this.state.pokeImage} alt="Pokemon" />
    </div>
    return (
      <PokeContainer>
        <select onChange={this.onChangePokemon}>
          <option value="">Selecione o pokemon</option>
          {this.state.pokeList.map(pokemon => {
            return <option key={pokemon.name} value={pokemon.name}>{pokemon.name}</option>
          })}
        </select>
        <div>
          {this.state.pokeImage && pokemon}
        </div>
      </PokeContainer>
    );
  }
}

export default PokeApi;
