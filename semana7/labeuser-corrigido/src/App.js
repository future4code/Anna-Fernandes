import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/global';

import UsersListPage from './components/UsersListPage';
import SignUpPage from './components/SignUpPage';

const AppContainer = styled.div `
  height: 100vh;
  background-color: #F2F2F2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

`

const BtnDefault = styled.button `
  margin: 16px;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #5EBFAD;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`

class App extends React.Component {
  state = {
    currentPage: "signUpPage",
  }

  changePage = () => {
    if (this.state.currentPage === "signUpPage") {
      this.setState({ currentPage: "usersListPage"})
    } else {
      this.setState({ currentPage: "signUpPage"})
    }

  }

  render() {
    const page = this.state.currentPage === "signUpPage" ? <SignUpPage /> : <UsersListPage />
    const btnText = this.state.currentPage === "signUpPage" ? "Ir para a lista de usuários" : "Voltar para o cadastro"
    return (
      <AppContainer>
        <GlobalStyle />
        {page}
        <BtnDefault onClick={this.changePage}>{btnText}</BtnDefault>
      </AppContainer>
    );
  }
}

export default App;
