import React from 'react';
import axios from 'axios';

import { Intro, PlaylistsContainer, SearchPlaylistContainer, Results, ResultsPlaylist, Playlists, PlaylistOnPlaylists, PlaylistListsContainer, PlaylistName, PlaylistTitle, Icon, Iconbtn, SearchTracksBtn } from './style';
import CreatePlaylist from '../CreatePlaylist/CreatePlaylist';
import Playlist from '../Playlist/Playlist';
import SearchTracks from '../SearchTrack/SearchTrack';

import iconDelete from '../../images/delete.svg';
import iconSearch from '../../images/search.svg';

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
        playlistName: "",
        playlistTracks: [],
        playlistQuantity: "",
        currentPage: "Home"
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

    onClickShowSearchTracks = () => {
        this.setState({ currentPage: "Search Tracks" })
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
        this.setState({ currentPage: "Playlist" })
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
        if ( window.confirm("Você tem certeza de que deseja deletar essa playlist?") ) {
            axios.delete(`${baseUrl}/${id}`, axiosConfig)
            .then( () => {
                alert("Playlist deletada com sucesso");
                this.getAllPlaylists();
            })
            .catch( err => {
                alert("Ops, algo deu errado: " + err.message);
            })
        }
    }

  render() {
      const page = () => {
          switch (this.state.currentPage) {
            case "Playlist":
              return <Playlist 
                updatePlaylist={() => this.getPlaylistTracks(this.state.clickedPlaylistId)} 
                playlistId={this.state.clickedPlaylistId}
                playlistName={this.state.playlistName}
                playlistQuantity={this.state.playlistQuantity} 
                playlistTracks={this.state.playlistTracks} 
              />;
            break;
            case "Search Tracks" :
                return <SearchTracks />;
                break;
            default:
                return <Intro>Bem-vinda(o) ao Labefy</Intro>
            }
        }

      const results = this.state.searchedPlaylists.length !== 0 ? 
      this.state.searchedPlaylists.map(playlist => {
          return <ResultsPlaylist 
            key={playlist.id} 
            onClick={() => this.getPlaylistTracks(playlist.id, playlist.name)}
            >
            <h4>{playlist.name}</h4> 
            </ResultsPlaylist>})
        : <p>Nenhuma playlist contendo <strong>{this.state.inputSearchPlaylist}</strong>  foi informada</p>;

    return (
        <PlaylistsContainer>
            <PlaylistListsContainer>
                <SearchTracksBtn onClick={this.onClickShowSearchTracks}>Buscar músicas</SearchTracksBtn>
               
                <SearchPlaylistContainer>
                    <input 
                        placeholder="Busque uma playlist"
                        value={this.state.inputSearchPlaylist}
                        onChange={this.onChangeInputSearchPlaylist}
                    />
                    <Iconbtn onClick={this.searchPlaylist}><Icon src={iconSearch} alt="ícone de buscar" /></Iconbtn>
                </SearchPlaylistContainer>
                <Results>
                    {this.state.hadSearched && results}
                </Results>
                <Playlists>
                    <PlaylistTitle>Minhas playlists</PlaylistTitle>
                    {this.state.playlists.map( playlist => {
                        return (
                        <PlaylistOnPlaylists 
                            key={playlist.id} 
                            onClick={() => this.getPlaylistTracks(playlist.id, playlist.name)}
                        >
                            <PlaylistName>{playlist.name}</PlaylistName>
                            <Iconbtn onClick={() => this.deletePlaylist(playlist.id)}><Icon src={iconDelete} alt="ícone de deletar" /></Iconbtn>
                        </PlaylistOnPlaylists>
                        )
                    })}
                </Playlists>
            <CreatePlaylist updatePlaylists={this.getAllPlaylists} />
            </PlaylistListsContainer>
            {page()}
        </PlaylistsContainer>
    );
  }
}

export default PlaylistsList;
