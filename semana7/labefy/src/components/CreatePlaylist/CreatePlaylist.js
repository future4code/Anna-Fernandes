import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CreatePlaylistContainer = styled.div `
  
`
const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

const axiosConfig = {
    headers: {
        Authorization: "anna-fernandes-turing"
    }
};


class CreatePlaylist extends React.Component {
    state = {
        inputNewPlaylist: ""
    }

    onChangeInputNewPlaylist = event => {
        this.setState({ inputNewPlaylist: event.target.value })
    }

    createPlaylist = () => {
        const body = {
            name: this.state.inputNewPlaylist 
        }

        axios.post(baseUrl, body, axiosConfig )
        .then( () => {
            alert("Playlist criada com sucesso")
            this.setState({ inputNewPlaylist:"" })
        })
        .catch( err => {
            if ( err.message === "Request failed with status code 400") {
                alert("Ops, já existe uma playlist com esse nome");
            } else {
                alert("Ops, algo deu errado: " + err.message);
            }
        })
    }
  
    render() {
    return (
      <CreatePlaylistContainer>
          <input 
            value={this.state.inputNewPlaylist}
            onChange={this.onChangeInputNewPlaylist}
            placeholder="Nome da Playlist"/>
          <button onClick={this.createPlaylist}>Criar</button>
      </CreatePlaylistContainer>
    );
  }
}

export default CreatePlaylist;
