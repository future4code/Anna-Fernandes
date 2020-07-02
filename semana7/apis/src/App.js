import React from 'react';
import styled from "styled-components";

import PokeApi from "./components/PokeApi";

const AppContainer = styled.div `
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`

export class App extends React.Component {
  state = {
    currentPage: "Home",
  };

  goToPokeApi = () => {
    this.setState({ currentPage: "PokeApi" })
  }

  render() {
    const page = this.state.currentPage === "PokeApi" ? <PokeApi /> : null

    return (
      <AppContainer>
        <h1>Meus Apis</h1>
        <button onClick={this.goToPokeApi}>PokeApi</button>
        {page}
      </AppContainer>
    );
  }
}

export default App;
