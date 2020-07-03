import React from 'react';
import styled from "styled-components";

import PokeApi from "./components/PokeApi";
import StarWarsApi from "./components/StarWarsApi";
import ChuckNorrisApi from "./components/ChuckNorrisApi";

const AppContainer = styled.div `
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f5f5f5;
`

const BtnsContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
`

const PageContainer = styled.div `
  margin: 24px auto;
`

export class App extends React.Component {
  state = {
    currentPage: "Home",
  };

  goToPokeApi = () => {
    this.setState({ currentPage: "PokeApi" })
  }
  goToStarWarsApi = () => {
    this.setState({ currentPage: "StarWarsApi" })
  }
  goToChuckNorrisApi = () => {
    this.setState({ currentPage: "ChuckNorrisApi" })
  }

  render() {
    const page = this.state.currentPage === "PokeApi" ? <PokeApi /> : <StarWarsApi />

    return (
      <AppContainer>
        <h1>Meus Apis</h1>
        <BtnsContainer>
          <button onClick={this.goToPokeApi}>PokeApi</button>
          <button onClick={this.goToStarWarsApi}>StarWarsApi</button>
          <button onClick={this.goToChuckNorrisApi}>ChuckNorrisApi</button>
        </BtnsContainer>
        <PageContainer>
          {this.state.currentPage === "Home" && <div>
            <p>Selecione uma api para testar</p>
            </div>}
          {this.state.currentPage === "PokeApi" && <PokeApi />}
          {this.state.currentPage === "StarWarsApi" && <StarWarsApi />}
          {this.state.currentPage === "ChuckNorrisApi" && <ChuckNorrisApi />}
        </PageContainer>
      </AppContainer>
    );
  }
}

export default App;
