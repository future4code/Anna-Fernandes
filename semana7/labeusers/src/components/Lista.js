import React from "react";
import styled from "styled-components";

const ListaContainer = styled.div `
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
const UsuarioLista = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    margin: 8px auto;
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
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: #F28585;
    font-weight: 700;
    cursor: pointer;
`

const UsuarioNome = styled.p `
    cursor: pointer;
`

class Lista extends React.Component {
  render() {
    return (
      <ListaContainer>
          <Title>Usuários cadastrados</Title>
          <Label>Buscar por nome</Label>
          <Input onChange={this.props.inputBusca}/>
          <Btn color="#F28585" onClick={this.props.funcaoBusca}>Buscar</Btn>
          <Btn color="#5086F2" onClick={this.props.funcaoLimparBusca}>Limpar Busca</Btn>
          {this.props.lista.map(usuario => {
              return (
                <UsuarioLista key={usuario.id}>
                    <UsuarioNome onClick={()=>this.props.funcaoAbreUsuario(usuario.id)}>{usuario.name}</UsuarioNome>
                    <BtnDeleta onClick={()=>this.props.funcaoDeleta(usuario.id)}>X</BtnDeleta>
                </UsuarioLista>
            )
        })}
        <Btn color="#5086F2" onClick={this.props.botao}>{this.props.textoBotao}</Btn>
      </ListaContainer>
    );
  }
}

export default Lista;