import React from "react";
import axios from "axios";
import styled from "styled-components";

import Cadastro from "./components/Cadastro";
import Lista from "./components/Lista";
import Usuario from "./components/Usuario";

const AppContainer = styled.div `
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F2EEB6;
`

class App extends React.Component {
  state = {
    usuarios: [],
    usuarioValue: "",
    emailValue: "",
    abreCadastro: true,
    abreLista: false,
    abreUsuario: false,
    abreEditar: false,

    editarUsuarioValue: "",
    editarEmailValue: "",
    inputBuscaValue: "",

    usuarioClicado: ""
  };

  componentDidMount = () => {
    this.pegarListaUsuarios();
  };

  pegarListaUsuarios = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        {
          headers: {
            Authorization: "anna-fernandes-turing",
          }
        }
      )
      .then(response => {
        this.setState({usuarios: response.data});
      })
      .catch(error => {
        console.log(error)
        console.log(error.data);
      });
  };

  criarUsuario = () => {
    const body = {
      name: this.state.usuarioValue,
      email: this.state.emailValue
    };

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
        body,
        {
          headers: {
            Authorization: "anna-fernandes-turing"
          }
        }
      )
      .then(response => {
        this.pegarListaUsuarios();
        this.setState({ usuarioValue: "" });
        this.setState({ emailValue: "" });
        alert("Usuário criado com sucesso");
      })
      .catch(error => {
        alert(error.data);
      });

  };

  deletarUsuario = id => {
    if ( window.confirm("Você tem certeza de que deseja deletar este usuário?")) {
      axios
        .delete(
          "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/" + id,
          {
            headers: {
              Authorization: "anna-fernandes-turing"
            }
          }
        )
        .then(response => {
          this.pegarListaUsuarios();
          alert("Usuário deletado com sucesso");
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  editarUsuario = id => {
    this.setState({ abreEditar: false });
    console.log(this.state.editarUsuarioValue)

    const body = {
      name: this.state.editarUsuarioValue,
      email: this.state.editarEmailValue
    };

      axios
        .get(
          "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/" + id,
          body,
          {
            headers: {
              Authorization: "anna-fernandes-turing"
            }
          }
        )
        .then(response => {
          alert("Usuário buscado com sucesso");
        })
        .catch(error => {
          alert(error);
        });
  };

  buscarUsuario = () => {
    this.setState({ abreEditar: false });
    const busca = this.state.inputBuscaValue;
      axios
        .put(
          "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/search?name=" + busca + "&email=" ,
          {
            headers: {
              Authorization: "anna-fernandes-turing"
            }
          }
        )
        .then(response => {
          this.setState({usuarios: response.data});
          alert("Usuário editado com sucesso");
        })
        .catch(error => {
          alert(error);
        });
  };

  abreEditar = () => {
    this.setState({ abreEditar: true })
  }

  abrirUsuario = id => {
    this.setState({ abreUsuario: true })
    this.setState({ usuarioClicado: id })

    this.setState({ abreCadastro: false })
    this.setState({ abreLista: false })
  }

  abrirLista = () => {
    this.setState({ abreLista: true })

    this.setState({ abreCadastro: false })
    this.setState({ abreUsuario: false })
  }

  abrirCadastro = () => {
    this.setState({ abreCadastro: true })
    this.setState({ abreLista: false })
    this.setState({ abreUsuario: false })
  }

  onChangeUsuarioValue = event => {
    this.setState({ usuarioValue: event.target.value })
  }

  onChangeEmailValue = event => {
    this.setState({ emailValue: event.target.value })
  }

  onChangeEditarUsuarioValue = event => {
    this.setState({ editarUsuarioValue: event.target.value })
  }

  onChangeEditarEmailValue = event => {
    this.setState({ editarEmailValue: event.target.value })
  }

  onChangeInputBuscaValue = event => {
    this.setState({ inputBuscaValue: event.target.value })
  }

  render() {
    const lista = <Lista lista={this.state.usuarios} botao={this.abrirCadastro} textoBotao= "Ir para a página de registro" funcaoDeleta={this.deletarUsuario} funcaoAbreUsuario={this.abrirUsuario} funcaoBusca={this.buscarUsuario} inputBusca={this.onChangeInputBuscaValue} />

    const usuario = <Usuario lista={this.state.usuarios} usuarioId={this.state.usuarioClicado} funcaoLista={this.abrirLista} funcaoDeleta={this.deletarUsuario} funcaoEdita={this.abreEditar} abreEditar={this.state.abreEditar} funcaoSalvaEdicao={this.editarUsuario} mudaInputEditarNome={this.onChangeEditarUsuarioValue} mudaInputEditarEmail={this.onChangeEditarEmailValue}/>

    const cadastro = <Cadastro usuarioValue={this.state.usuarioValue} emailValue={this.state.emailValue} funcao={this.criarUsuario} botao={this.abrirLista} textoBotao= "Ir para a página da lista" mudaInputNome={this.onChangeUsuarioValue} mudaInputEmail={this.onChangeEmailValue}/>
        
    return (
      <AppContainer>
        {this.state.abreCadastro && cadastro}
        {this.state.abreLista && lista}
        {this.state.abreUsuario && usuario}
      </AppContainer>
    );
  }
}

export default App;
