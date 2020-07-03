import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Playlist from '../Playlist/Playlist';

const PlaylistsContainer = styled.div `
  width: 100%;
`
const SearchPlaylistContainer = styled.div `
  width: 100%;
`
const Results = styled.div `
  
`

const ResultsPlaylist = styled.div `
  
`
const Playlists = styled.div `
  
`
const PlaylistOnPlaylists = styled.div `
  max-width: 240px;
`

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

const axiosConfig = {
    headers: {
        Authorization: "anna-fernandes-turing"
    }
};


class PlaylistsList extends React.Component {
    state = {
        playlists: [],
        searchedPlaylists: [],
        inputSearchPlaylist: "",
        hadSearched: false,
        clickedPlaylistId: "",
        clickedPlaylist: "",
        playlistName: "",
        playlistTracks: [],
        playlistQuantity: "",
    }

    componentDidMount = () => {
        this.getAllPlaylists();
    }

    getAllPlaylists = () => {
        axios.get(baseUrl, axiosConfig)
        .then( response => {
            this.setState({ playlists: response.data.result.list })
        })
        .catch( err => {
            alert("Ops, algo deu errado:" + err.message);
        })
    }

    onChangeInputSearchPlaylist = event => {
        this.setState({ inputSearchPlaylist: event.target.value })
    }

    searchPlaylist = () => {
        const search = this.state.inputSearchPlaylist;

        axios.get(`${baseUrl}/search?name=${search}`, axiosConfig)
        .then( response => {
            this.setState({ searchedPlaylists: response.data.result.playlist, hadSearched: true })
        })
        .catch( err => {
            if ( err.message === "Request failed with status code 400") {
                alert("Ops, você tem que digitar alguma coisa");
            } else {
                alert("Ops, algo deu errado: " + err.message);
            }
        })
    }

    getPlaylistTracks = (id, name) => {
        this.setState({ clickedPlaylist: true })
        this.setState({ clickedPlaylistId: id })
        this.setState({ playlistName: name })

        axios.get(`${baseUrl}/${id}/tracks`, axiosConfig)
        .then( response => {
            this.setState({ playlistTracks: response.data.result.tracks })
            this.setState({ playlistQuantity: response.data.result.quantity })
        })
        .catch( err => {
            if ( err.message === "Request failed with status code 404") {
                alert("Ops, não foram encontradas músicas");
            } else {
                alert("Ops, algo deu errado: " + err.message);
            }
        })
    }

    deletePlaylist = id => {
        axios.delete(`${baseUrl}/${id}`, axiosConfig)
        .then( () => {
            alert("Playlist deletada com sucesso");
            this.getAllPlaylists();
        })
        .catch( err => {
            alert("Ops, algo deu errado: " + err.message);
        })
    }

  render() {
      const results = this.state.searchedPlaylists.length !== 0 ? 
      this.state.searchedPlaylists.map(playlist => {
          return <ResultsPlaylist key={playlist.id}>
            <h4>{playlist.name}</h4> 
            </ResultsPlaylist>})
        : <p>Nenhuma playlist contendo <strong>{this.state.inputSearchPlaylist}</strong>  foi informada</p>;

    return (
        <PlaylistsContainer>
            <SearchPlaylistContainer>
                <input 
                    placeholder="Busque uma playlist"
                    value={this.state.inputSearchPlaylist}
                    onChange={this.onChangeInputSearchPlaylist}
                />
                <button onClick={this.searchPlaylist}>Buscar</button>
                <Results>
                    {this.state.hadSearched && results}
                </Results>
            </SearchPlaylistContainer>
            <Playlists>
                <h2>Suas playlists</h2>
                {this.state.playlists.map( playlist => {
                    return (
                    <PlaylistOnPlaylists 
                        key={playlist.id} 
                        onClick={() => this.getPlaylistTracks(playlist.id, playlist.name)}
                    >
                        <h4>{playlist.name}</h4>
                        <button onClick={() => this.deletePlaylist(playlist.id)}>Deletar</button>
                    </PlaylistOnPlaylists>
                    )
                })}
            </Playlists>
            {this.state.clickedPlaylist &&
            <Playlist 
                updatePlaylist={() => this.getPlaylistTracks(this.state.clickedPlaylistId)} 
                playlistId={this.state.clickedPlaylistId}
                playlistName={this.state.playlistName}
                playlistQuantity={this.state.playlistQuantity} 
                playlistTracks={this.state.playlistTracks} 
            />}
        </PlaylistsContainer>
    );
  }
}

export default PlaylistsList;
