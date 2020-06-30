import React from "react";
import axios from "axios";
import styled from "styled-components";

const CadastroContainer = styled.div `
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 32px;
    border-radius: 5px;
    border: 2px solid #5086F2;

    @media screen and (max-width: 400px) {
        max-width: 300px;
    }
`
const Title = styled.h2 `
    text-align: center;
`
const Label = styled.label `
    margin-top: 16px;
    margin-bottom: 4px;
`
const Input = styled.input `
    padding: 4px 8px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`
const Btn = styled.button `
    width: 100%;
    margin: 16px auto;
    padding: 8px;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: ${props => props.color};
    font-weight: 700;
    cursor: pointer;
`

class Cadastro extends React.Component {
  render() {
    return (
        <CadastroContainer>
            <Title>Novo cadastro</Title>
            <Label>Nome</Label>
            <Input
              value={this.props.usuarioValue}
              onChange={this.props.mudaInputNome}
            />
            <Label>Email</Label>
            <Input
              value={this.props.emailValue}
              onChange={this.props.mudaInputEmail}
            />
            <Btn color="#F28585" onClick={this.props.funcao}>Enviar</Btn>
            <Btn color="#5086F2" onClick={this.props.botao}>{this.props.textoBotao}</Btn>
        </CadastroContainer>
    );
  }
}

export default Cadastro;
