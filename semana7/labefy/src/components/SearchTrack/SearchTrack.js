import React from 'react';
import axios from 'axios';

import SpotifyWebApi from 'spotify-web-api-js';
import auth, { getAuth } from './auth';


import { SearchTracksContainer, Icon, Iconbtn, ResultsContainer, TrackTitle, TrackResult } from './style';

import iconSearch from '../../images/search.svg';
import iconAdd from '../../images/add.svg';

const token = getAuth();

const headersSearchSpotify = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${token}`
    }
}

const urlSearchSpotify = "https://api.spotify.com/v1/search";

const spotifyApi = new SpotifyWebApi();

const baseUrlLabefy = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

const axiosConfig = {
    headers: {
        Authorization: "anna-fernandes-turing"
    }
};


class SearchTracks extends React.Component {

    constructor(){
        super();
        const params = this.getHashParams();
        const getToken = token;
        if( getToken ) {
            spotifyApi.setAccessToken(getToken);
        }

        this.state = {
            searchResults: [],
            inputSearchPlaylist: "",
            addTrack: false,
            trackName: "",
            trackArtist: "",
            trackUrl: "",
            playlists: [],
            playlitId: "",
            trackClickedId: ""
        }
    }


    onChangeInputSearchPlaylist = event => {
        this.setState({ inputSearchPlaylist: event.target.value })
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    // spotifySearchTracks = async () => {
    //         try {
    //           const response = await axios.get(
    //             urlSearchSpotify + `?q=${this.state.inputSearchPlaylist}&type=track&market=BR`,
    //             headersSearchSpotify
    //           );
    //           console.log(response);
    //         } catch (err) {
    //           console.log(err);
    //         }
    // }

    spotifySearchTracks = () => {
        
        spotifyApi.searchTracks(this.state.inputSearchPlaylist)
        .then( response => {
            this.setState({ searchResults: response.tracks.items })
        })
        .catch( err => {
            alert("Ops, algo deu errado: " + err.message);
        })
    }

    spotifyGetTrack = id => {
        
        spotifyApi.getTrack(id)
        .then( response => {

            const trackArtist = response.artists.map( artist => {
                return artist.name;
            })
            
            this.setState({ trackName: response.name, trackArtist: trackArtist, trackUrl: response.preview_url, addTrack: true, trackClickedId: response.id });
            this.getAllPlaylists();
        })
        .catch( err => {
            alert("Ops, algo deu errado: " + err.message);
        })
    }

    getAllPlaylists = () => {
        axios.get(baseUrlLabefy, axiosConfig)
        .then( response => {
            this.setState({ playlists: response.data.result.list });
        })
        .catch( err => {
            alert("Ops, algo deu errado:" + err.message);
        })
    }
    
    addTrack = event => {
        const playlistId = event.target.value;
        
        const body = {
          name: this.state.trackName,
          artist: this.state.trackArtist,
          url: this.state.trackUrl
        }
  
        axios.post(`${baseUrlLabefy}/${playlistId}/tracks`, body, axiosConfig)
        .then( () => {
          alert("Música adicionada com sucesso");
          this.setState({ trackName: "", trackArtist: "", trackUrl: "", inputSearchPlaylist: "", isAdding: false });
        })
        .catch(err => {
          alert("Ops, algo deu errado: " + err.message)
        })
      }
    

  render() {

    const isAdding = id => {
        if ( this.state.trackClickedId === id ) {
            return <select onChange={this.addTrack}>
                <option>Selecione uma playlist</option>
                {this.state.playlists.map( playlist => {
                    return <option  value={playlist.id} key={playlist.id}>
                        {playlist.name}
                    </option>
                })}
            </select>
        }
    } 

    return (
        <div>
            <SearchTracksContainer>
                <input 
                    placeholder="Busque uma música"
                    value={this.state.inputSearchPlaylist}
                    onChange={this.onChangeInputSearchPlaylist}
                />
                <Iconbtn onClick={this.spotifySearchTracks}><Icon src={iconSearch} alt="ícone de buscar" /></Iconbtn>
                {/* <a href="http://localhost:8888"><button>Logar com Spotify</button></a> */}
            </SearchTracksContainer>
            <ResultsContainer>
                {this.state.searchResults.map( track => {
                    return <TrackResult key={track.id}>
                            <Iconbtn onClick={() => this.spotifyGetTrack(track.id)}><Icon src={iconAdd} alt="ícone de Adicionar" /></Iconbtn>
                            <TrackTitle>{track.name}</TrackTitle>
                            {track.artists.map(artist => {
                                return <p>{artist.name}</p>
                            })}
                            
                            {isAdding(track.id)}
                        </TrackResult>
                })}
            </ResultsContainer>
        </div>
    );
  }
}

export default SearchTracks;
