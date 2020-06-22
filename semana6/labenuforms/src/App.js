import React from 'react';
import styled from 'styled-components';

import Etapa1 from './components/Etapa1';
import Etapa2 from './components/Etapa2';
import Etapa3 from './components/Etapa3';
import Final from './components/Final';

const HeaderTitle = styled.h1 `
  text-align: center;
`
const Btn = styled.button `
  display: block;
  margin: 24px auto;
`

class App extends React.Component {
  state = {
    etapa: 1,
  }

  onClinkNext = () => {
    this.setState({ etapa: this.state.etapa + 1 })
  }

  render() {

    const renderEtapa = () => {
      switch (this.state.etapa) {
        case 1:
          return <Etapa1 />;
        case 2:
          return <Etapa2 />;
        case 3:
          return <Etapa3 />;
        case 4:
          return <Final />;
        default:
          return null;
      }
    }

    const renderBtn = this.state.etapa < 4 ? <Btn onClick={this.onClinkNext}>Próxima etapa</Btn> : null;

    return (
      <div className="App">
        <header><HeaderTitle>LabenuForms</HeaderTitle></header>
        <div className="form-container">
          {renderEtapa()}
          {renderBtn}
        </div>
      </div>
    );
  }
}

export default App;
