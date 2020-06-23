import React from 'react';
import styled from 'styled-components';

import PerguntaAberta from './PerguntaAberta';
import PerguntaOpcoes from './PerguntaOpcoes';

const EtapaContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EtapaTitulo = styled.h2 `
  color: #163840;
`

const Alerta = styled.p `
  background-color: #D94141;
  border-radius: 5px;
  padding: 8px;
  color: #f2f2f2;
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
class Etapa1 extends React.Component {
  
  state = {
    temSuperior: false,
    inputNome: "",
    inputIdade: "",
    inputEmail: "",
    preenchidoNome: true,
    preenchidoIdade: true,
    preenchidoEmail: true,
  }

  handleInputValueNome = event => {
    this.setState({ inputNome: event.target.value })
  }

  handleInputValueIdade = event => {
    this.setState({ inputIdade: event.target.value })
  }

  handleInputValueEmail = event => {
    this.setState({ inputEmail: event.target.value })
  }
  
  onHandleChange = event => {
    if (event.target.value === "Ensino Superior Incompleto") {
      this.setState({ temSuperior: true })
    } else if (event.target.value === "Ensino Superior Completo") {
      this.setState({ temSuperior: true })
    } else {
      this.setState({ temSuperior: false })
    }
  }

  onClickChild = event => {
    if (this.state.inputNome === "") {
      this.setState({ preenchidoNome: false })
    } else {
      this.setState({ preenchidoNome: true })
    }

    if (this.state.inputIdade === "") {
      this.setState({ preenchidoIdade: false })
    } else {
      this.setState({ preenchidoIdade: true })
    }

    if (this.state.inputEmail === "") {
      this.setState({ preenchidoEmail: false })
    } else {
      this.setState({ preenchidoEmail: true })
    }

    if ((this.state.inputNome !== "" ) && (this.state.inputIdade !== "" ) && (this.state.inputEmail !== "")) {
      if (this.state.temSuperior) {
        this.props.onClickSuperior()
      } else {
        this.props.onClickSemSuperior()
      }
    } else {
      alert("Você deve preencher todas as perguntas antes de prosseguir")
      event.preventDefault();
    }
  }
  
  render() {
    const renderAlertaNome = this.state.preenchidoNome ? null : <Alerta>Você precisa preencher seu nome</Alerta>
    const renderAlertaIdade = this.state.preenchidoIdade ? null : <Alerta>Você precisa preencher sua idade</Alerta>
    const renderAlertaEmail = this.state.preenchidoEmail ? null : <Alerta>Você precisa preencher seu email</Alerta>

    return (
      <EtapaContainer>
            <EtapaTitulo>Etapa 1 – Dados Gerais</EtapaTitulo>
            <PerguntaAberta onInputChange={this.handleInputValueNome} pergunta={"1. Qual o seu nome?"} />
            <div>{renderAlertaNome}</div>
            <PerguntaAberta onInputChange={this.handleInputValueIdade} pergunta={"2. Qual é a sua idade?"} />
            <div>{renderAlertaIdade}</div>
            <PerguntaAberta onInputChange={this.handleInputValueEmail} pergunta={"3. Qual é o seu email?"} />
            <div>{renderAlertaEmail}</div>
            <PerguntaOpcoes
              pergunta={"4. Qual é a sua escolaridade?"} 
              opcoes={[
                "Ensino Médio Incompleto",
                "Ensino Médio Completo",
                "Ensino Superior Incompleto",
                "Ensino Superior Completo",
              ]
              }
              onHandleChange = {this.onHandleChange}
            />
            <Btn onClick={this.onClickChild}>Próxima etapa</Btn>
      </EtapaContainer>
    );
  }
}

export default Etapa1;
