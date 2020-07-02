import React from 'react';
import styled from "styled-components";
import axios from "axios";

const StarWarsContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export class StarWarsApi extends React.Component {
  state = {
    starsPeopleList: [],
    personIdx: "",
    profile: "",
    planets: [],
    planetName: "",
  };

  componentDidMount = () => {
    this.getStarWarsPeople();
    this.getPlanets();
  }

  getStarWarsPeople = async () => {
    try {
      const response = await axios.get("http://swapi.dev/api/people/?search=a&page=1");
      const response2 = await axios.get("http://swapi.dev/api/people/?search=a&page=2");
      const response3 = await axios.get("http://swapi.dev/api/people/?search=a&page=3");
      const response4 = await axios.get("http://swapi.dev/api/people/?search=a&page=4");
      const response5 = await axios.get("http://swapi.dev/api/people/?search=a&page=5");
      const response6 = await axios.get("http://swapi.dev/api/people/?search=a&page=6");

      let allPagesPeople = [...response.data.results, ...response2.data.results, ...response3.data.results, response4.data.results, response5.data.results, response6.data.results];

      this.setState({ starsPeopleList: allPagesPeople });
    } catch (err) {
      console.log(err.message);
    }
  }

  getPlanets = async () => {
    try {
      const response = await axios.get("http://swapi.dev/api/planets");
      this.setState({ planets: response.data.results });
    } catch (err) {
        alert('Gezuz Chryst, whata mess: ' + err.message)
    }
  }

  onChangeStarWarsPerson = event => {
    const personIdx = Number(event.target.value) + 1;

    axios.get(`https://swapi.dev/api/people/${personIdx}`).then( response => {
      this.setState({ profile: response.data });
      this.findPlanetName();
    }).catch(err => {
        alert('Gezuz Chryst, whata mess: ' + err.message)
    })
  }

  findPlanetName = () => {
    const planetCode = this.state.planets.find((planet, idx) => {
        const url = "http://swapi.dev/api/planets/" + idx + "/";
        if(url === this.state.profile.homeworld) {
        return planet
        }
    });
    this.setState({ planetName: planetCode.name })
  } 

  render() {
      const profile = <div>
          <h3>{this.state.profile.name}</h3>
          <ul>
              <li><strong>Gênero:</strong> {this.state.profile.gender}</li>
              <li><strong>Ano de nascimento:</strong> {this.state.profile.birth_year}</li>
              <li><strong>Cor do cabelo:</strong> {this.state.profile.hair_color}</li>
              <li><strong>Altura:</strong> {this.state.profile.height}</li>
              <li><strong>Nacionalidade:</strong> {this.state.planetName}</li>
          </ul>
      </div>
    return (
      <StarWarsContainer>
        <select onChange={this.onChangeStarWarsPerson}>
          <option value="">Selecione a personagem</option>
          {this.state.starsPeopleList.map((person, idx) => {
            return <option key={idx} value={idx}>{person.name}</option>
          })}
        </select>
        {this.state.profile && profile}
      </StarWarsContainer>
    );
  }
}

export default StarWarsApi;
