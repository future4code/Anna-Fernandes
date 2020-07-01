import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const axiosConfig = {
    headers: {
        Authorization: "anna-fernandes-turing"
    }
}

const SignUpContainer = styled.div `
    width: 400px;
    padding: 24px;
    border: 2px solid #5EBFAD;
    border-radius: 5px;

    @media all and (max-width: 560px) {
        width: 300px;
    }
`
const BtnDefault = styled.button `
  margin: 16px auto;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #5EBFAD;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  
  &:hover {
      opacity: 0.6;
      }
`

const Input = styled.input `
    width: 100%;
    margin: 8px 0;
    display: block;
    padding: 8px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";

class SignUpPage extends React.Component {
    state = {
        name: "",
        email: ""
    }

    onChangeName = event => {
        this.setState({ name: event.target.value })
    }

    onChangeEmail = event => {
        this.setState({ email: event.target.value })
    }

    createUser = () => {
        const body = {
            name: this.state.name,
            email: this.state.email
        }

        axios
            .post(baseUrl, body, axiosConfig)
            .then(() => {
            alert("Usuário criado com sucesso")
            this.setState({ name:"", email: "" })
            })
            .catch( error => {
            console.log(error.message)
            })

    }
 
    render() {
        return (
        <SignUpContainer>
           <Input placeholder="Nome do usuário" value={this.state.name} onChange={this.onChangeName}/>
           <Input placeholder="Email do usuário" value={this.state.email} onChange={this.onChangeEmail}/>
           <BtnDefault onClick={this.createUser}>Enviar</BtnDefault>
        </SignUpContainer>
        );
    }
}

export default SignUpPage;
