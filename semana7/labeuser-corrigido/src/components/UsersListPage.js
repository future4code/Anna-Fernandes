import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserPage from './UserPage';
import deleteIcon from '../images/delete.svg';

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
    float: right;
    height: 24px;
    width: 24px;
    border: none;
    cursor: pointer;
`

const SearchContainer = styled.ul `
    min-width: 304px;
    margin: 16px 0;
    padding: 0;
    list-style: none;

    @media all and (max-width: 560px) {
        min-width: 240px;
    }
`

const UserList = styled.ul `
    padding: 24px;
    list-style: none;
    border: 2px solid #5EBFAD;
    border-radius: 5px;
`

const User = styled.li `
    margin: 8px auto;

    &:nth-child(even) {
        background-color: rgba(94, 191, 173, 0.25);
    }
`

const UserName = styled.p `
    margin: 8px 0;
    font-size: 1.1rem;
    cursor: pointer;
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
  margin: 16px 0;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background-color: #5EBFAD;
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  &:nth-child(3) {
    margin-left: 8px;
    background-color: #F22929;
  }
  
  &:hover {
      opacity: 0.6;
      }
`

class UsersListPage extends React.Component {
    state = {
        usersList: [],
        currentPage: "usersListPage",
        userId: "",
        inputSearch: ""
    }

    componentDidMount = () => {
        this.getAllUsers();
    }

    changePage = id => {
      if (this.state.currentPage === "usersListPage") {
        this.setState({ currentPage: "userPage", userId: id})
      } else {
        this.setState({ currentPage: "usersListPage", userId: ""})
        this.getAllUsers();
      }
    }

    onChangeInputSearch = event => {
        this.setState({ inputSearch: event.target.value })
    }

    getAllUsers = () => {
        axios
            .get(baseUrl , axiosConfig)
            .then( response => {
                this.setState({ usersList: response.data })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    searchUsers = () => {
        const userName = this.state.inputSearch;

        axios
        .get(`${baseUrl}/search?name=${userName}&email=` , axiosConfig)
        .then( response => {
                console.log(userName)
                this.setState({ usersList: response.data, inputSearch: "" })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    deleteUser = userId => {
        if ( window.confirm( "Você tem certeza de que deseja deletar esse usuário?") ) {
            axios
                .delete(`${baseUrl}/${userId}` , axiosConfig)
                .then( () => {
                        this.getAllUsers()
                    })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }
    
    render() {
        const search = <SearchContainer>
            <Input value={this.state.inputSearch} onChange={this.onChangeInputSearch} placeholder="Busque pelo nome de usuário"/>
            <BtnDefault onClick={this.searchUsers}>Buscar</BtnDefault>
            <BtnDefault onClick={this.getAllUsers}>Limpar busca</BtnDefault>

        </SearchContainer>

        const page = this.state.currentPage === "userPage" ? <UserPage id={this.state.userId} goToListPage={this.changePage} backToList={this.changePage}/> : null;

        const btnText = this.state.currentPage === "userPage" ? <BtnDefault onClick={this.changePage}>Voltar para a lista</BtnDefault> : null

        return (
        <UserList>
            {this.state.currentPage === "usersListPage" && search}
            {this.state.usersList.length === 0 && <Spinner />}
            {this.state.currentPage === "usersListPage" && this.state.usersList.map(user => {
                return <User key={user.id}><BtnDelete onClick={() => this.deleteUser(user.id)}><img src={deleteIcon}/></BtnDelete><UserName onClick={() => this.changePage(user.id)}>{user.name}</UserName></User>
            })}
            {page}
            {btnText}
        </UserList>
        );
    }
}

export default UsersListPage;
