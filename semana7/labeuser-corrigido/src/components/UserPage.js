import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import deleteIcon from '../images/delete.svg';
import editIcon from '../images/edit.svg';

const axiosConfig = {
    headers: {
        Authorization: "anna-fernandes-turing"
    }
};

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";

const Spinner = styled.div `
    margin: auto;
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left-color: #6FBF8B;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`
const BtnDelete = styled.button `
    height: 24px;
    width: 24px;
    border: none;
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

const BtnDefault = styled.button `
  margin: 16px auto;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #F22929;
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  } 

  &:hover {
      opacity: 0.6;
      }
`

const User = styled.div `
    margin: 8px auto;
    min-width: 400px;
    
    @media all and (max-width: 560px) {
        min-width: 240px;
    }
`

const UserContainer = styled.div `
    margin: 8px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Edit = styled.div `
    margin: 8px auto;
`

class UsersListPage extends React.Component {
    state = {
        user: {
            name: "",
            emil:""
        },
        id: this.props.id,
        editInput: false,
        inputName: "",
        inputMail: ""
    }

    componentDidMount = () => {
        this.getUserById();
    }

    onChangeInputName = event => {
        this.setState({ inputName: event.target.value })
    }

    onChangeInputMail = event => {
        this.setState({ inputMail: event.target.value })
    }

    showEditInput = () => {
        this.setState({ editInput: true })
    }

    getUserById = () => {
        axios
            .get(`${baseUrl}/${this.state.id}` , axiosConfig)
            .then( response => {
                this.setState({ user: response.data })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    editUser = () => {
        const body = {
            name: this.state.inputName,
            email: this.state.inputMail
        }

        axios
            .put(`${baseUrl}/${this.state.id}` , body, axiosConfig)
            .then( response => {
                if ( window.confirm( "Você tem certeza de que deseja alterar esse usuário?") ) {
                    this.setState({ user: response.data, inputName: "", inputMail: "", editInput: false })
                    alert("Usuário alterado com sucesso");
                    this.getUserById()
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    deleteUser = () => {
        axios
            .delete(`${baseUrl}/${this.state.id}` , axiosConfig)
            .then( () => {
                if ( window.confirm( "Você tem certeza de que deseja deletar esse usuário?") ) {
                    alert("Usuário deletado com sucesso");
                    this.setState({ user: { name: "", email: ""} })
                    this.props.backToList()
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    
    render() {

        const userContainer = <UserContainer>
            <div>
                <h3>{this.state.user.name}</h3>
                <p>{this.state.user.email}</p>
            </div>
            <div>
                <BtnDelete onClick={this.showEditInput}><img src={editIcon} /></BtnDelete>
                <BtnDelete onClick={() => this.deleteUser(this.state.user.id)}><img src={deleteIcon} /></BtnDelete>
            </div>
        </UserContainer>

        const edit = <Edit>
            <Input value={this.state.inputName} onChange={this.onChangeInputName} placeholder="Novo nome"/>
            <Input  value={this.state.inputMail} onChange={this.onChangeInputMail} placeholder="Novo email"/>
            <BtnDefault onClick={this.editUser}>Alterar</BtnDefault>
        </Edit>


        return (
        <User>
            {this.state.user.name === "" && <Spinner />}
            {this.state.user.name !== "" && userContainer}
            {this.state.editInput && edit}
        </User>
        );
    }
}

export default UsersListPage;
