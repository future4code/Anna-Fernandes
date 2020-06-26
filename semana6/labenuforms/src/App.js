import React from 'react';
import styled from 'styled-components';

import Etapa1 from './components/Etapa1';
import Etapa2 from './components/Etapa2';
import Etapa3 from './components/Etapa3';
import Final from './components/Final';

const Header = styled.header `
  padding: 32px 8px;
  background-color: #6BB0BF;
`

const HeaderTitle = styled.h1 `
  text-align: center;
  color: #f2f2f2;
`

const Form = styled.form `
  min-height: calc(100vh - 150px);
  padding: 32px 8px;
  background-color: #f5f5f5;
`

class App extends React.Component {
  state = {
    etapa: 1,
    value: ""
  }
  
  onClickNext = () => {
    this.setState({ etapa: this.state.etapa + 1 })
  }

  onClickNextSemSuperior = () => {
    this.setState({ etapa: this.state.etapa + 2 })
  }

  render() {

    const renderEtapa = () => {
      switch (this.state.etapa) {
        case 1:
          return <Etapa1 onClickSuperior={this.onClickNext} onClickSemSuperior={this.onClickNextSemSuperior}
          />;
        case 2:
          return <Etapa2 onClickSuperior={this.onClickNext} onClickSemSuperior={this.onClickNextSemSuperior}/>;
        case 3:
          return <Etapa3 onClickSuperior={this.onClickNext} onClickSemSuperior={this.onClickNextSemSuperior}/>;
        case 4:
          return <Final />;
        default:
          return null;
      }
    }

    return (
      <div className="App">
        <Header><HeaderTitle>LabenuForms</HeaderTitle></Header>
        <Form>
          {renderEtapa()}
        </Form>
      </div>
    );
  }
}

export default App;
