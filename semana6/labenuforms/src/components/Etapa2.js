import React from 'react';
import styled from 'styled-components';

import PerguntaAberta from './PerguntaAberta';

const EtapaContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EtapaTitulo = styled.h2 `
  color: #163840;
`

const Btn = styled.button `
  display: block;
  margin: 24px auto;
  padding: 16px;
  background-color: #163840;
  color: #f2f2f2;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  text-transform: uppercase;
`

const Alerta = styled.p `
  background-color: #D94141;
  border-radius: 5px;
  padding: 8px;
  color: #f2f2f2;
`

class Etapa1 extends React.Component {
  state = {
    inputCurso: "",
    inputUnidade: "",
    preenchidoCurso: true,
    preenchidoUnidade: true,
  }

  handleInputValueCurso = event => {
    this.setState({ inputCurso: event.target.value })
  }

  handleInputValueUnidade = event => {
    this.setState({ inputUnidade: event.target.value })
  }

  onClickChild = event => {
    if (this.state.inputCurso === "") {
      this.setState({ preenchidoCurso: false })
    } else {
      this.setState({ preenchidoCurso: true })
    }

    if (this.state.inputUnidade === "") {
      this.setState({ preenchidoUnidade: false })
    } else {
      this.setState({ preenchidoUnidade: true })
    }

    if ((this.state.inputCurso !== "" ) && (this.state.inputUnidade !== "" )) {
      this.props.onClickSemSuperior()
    } else {
      alert("Você deve preencher todas as perguntas antes de prosseguir")
      event.preventDefault();
    }
  }
  

  render() {

    const renderAlertaCurso = this.state.preenchidoCurso ? null : <Alerta>Você precisa preencher o curso</Alerta>
    const renderAlertaUnidade = this.state.preenchidoUnidade ? null : <Alerta>Você precisa preencher a unidade</Alerta>

    return (
      <EtapaContainer>
        <EtapaTitulo>Etapa 2 – Educação</EtapaTitulo>
        <PerguntaAberta onInputChange={this.handleInputValueCurso} pergunta={"1. Qual é O seu curso?"} />
          <div>{renderAlertaCurso}</div>
        <PerguntaAberta onInputChange={this.handleInputValueUnidade}  pergunta={"2. Qual é a unidade de ensino?"} />
          <div>{renderAlertaUnidade}</div>
          <Btn onClick={this.onClickChild}>Próxima etapa</Btn>
      </EtapaContainer>
    );

  }
}

export default Etapa1;
