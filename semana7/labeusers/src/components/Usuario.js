import React from "react";
import styled from "styled-components";

const UsuarioContainer = styled.div `
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 32px;
    border-radius: 5px;
    border: 2px solid #5086F2;
    position: relative;

    @media screen and (max-width: 400px) {
        max-width: 300px;
    }
`
const EditaContainer = styled.div `
    display: flex;
    flex-direction: column;
`
const BtnContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 16px;
    top: 16px;
`
const Title = styled.h2 `
    text-align: center;
    margin-bottom: 4px;
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

const BtnDeleta = styled.button `
    height: 24px;
    padding: 4px;
    margin-right: 8px;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: #F28585;
    font-weight: 700;
    cursor: pointer;
`

const UsuarioEmail = styled.p `
    text-align: center;
    margin: 0;
    padding: 0;
`

class Usuario extends React.Component {
    render() {
        const editar = id =>
            {
                return <EditaContainer>
                    <Label>Nome</Label>
                    <Input onChange={this.props.mudaInputEditarNome}/>
                    <Label>Email</Label>
                    <Input onChange={this.props.mudaInputEditarEmail}/>
                    <Btn color="#F28A2E" onClick={() => this.props.funcaoSalvaEdicao(id)}>Salvar</Btn>
                </EditaContainer>
        }
    return (
      <UsuarioContainer>
          <Title>{this.props.usuarioNome}</Title>
            <UsuarioEmail>{this.props.usuarioEmail}</UsuarioEmail>
            <BtnContainer>
                <BtnDeleta onClick={()=>this.props.funcaoDeleta(this.props.usuarioID)}>x</BtnDeleta>
                <BtnDeleta onClick={this.props.funcaoEdita}>editar</BtnDeleta>
            </BtnContainer>
            {this.props.abreEditar && editar(this.props.usuarioID)}
            <Btn  color="#5086F2" onClick={this.props.funcaoLista}>Voltar à lista</Btn>
   
      </UsuarioContainer>
    );
  }
}

export default Usuario;
