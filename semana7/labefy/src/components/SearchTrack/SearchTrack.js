import React from 'react';
import axios from 'axios';

import SpotifyWebApi from 'spotify-web-api-js';
import auth, {
    getAuth
} from './auth';


import {
    SearchTracksContainer,
    Icon,
    Iconbtn,
    ResultsContainer,
    TrackTitle,
    TrackResult
} from './style';

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
const urlGetSpotify = "https://api.spotify.com/v1/tracks/";

const spotifyApi = new SpotifyWebApi();

const baseUrlLabefy = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

const axiosConfig = {
    headers: {
        Authorization: "anna-fernandes-turing"
    }
};


class SearchTracks extends React.Component {

    constructor() {
        super();
        const params = this.getHashParams();
        const getToken = token;
        if (getToken) {
            spotifyApi.setAccessToken(getToken);
        }

        this.state = {
            searchResults: [],
            inputSearchPlaylist: "",
            trackName: "",
            trackArtist: "",
            trackUrl: "",
            playlists: [],
            playlitId: "",
            trackClickedId: ""
        }
    }

    onChangeInputSearchPlaylist = event => {
        this.setState({
            inputSearchPlaylist: event.target.value
        })
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    spotifySearchTracks = async () => {
        const token = await getAuth();
        const headersSearchSpotify = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.get(
                urlSearchSpotify + `?q=${this.state.inputSearchPlaylist}&type=track&market=BR`,
                headersSearchSpotify
            );
            this.setState({
                searchResults: response.data.tracks.items
            })
        } catch (err) {
            console.log(err);
        }
    }

    spotifyGetTrack = async (id) => {
        const token = await getAuth();
        const headersSearchSpotify = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.get(
                urlGetSpotify + id,
                headersSearchSpotify
            );
            const trackArtist = response.data.artists.map(artist => {
                return artist.name;
            })

            this.setState({
                trackName: response.data.name,
                trackArtist: trackArtist,
                trackUrl: response.data.external_urls,
                trackClickedId: response.data.id
            });
            
            this.getAllPlaylists();

        } catch (err) {
            alert("Ops, algo deu errado: " + err.message);
        }
    }


    getAllPlaylists = () => {
        axios.get(baseUrlLabefy, axiosConfig)
            .then(response => {
                this.setState({
                    playlists: response.data.result.list
                });
            })
            .catch(err => {
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
            .then(() => {
                alert("Música adicionada com sucesso");
                this.setState({
                    trackName: "",
                    trackArtist: "",
                    trackUrl: "",
                    inputSearchPlaylist: "",
                });
            })
            .catch(err => {
                alert("Ops, algo deu errado: " + err.message)
            })
    }


    render() {

        const isAdding = id => {
            if (this.state.trackClickedId === id) {
                return <select onChange = {this.addTrack} >
                    <option> Selecione uma playlist </option> {
                        this.state.playlists.map( playlist => {
                            return <option value = {playlist.id} key = {playlist.id}> {
                                    playlist.name
                                } </option>
                            })
                    } </select>
            }
        }

        return ( 
            <div>
                <SearchTracksContainer>
                    <input placeholder = "Busque uma música"
                    value = {this.state.inputSearchPlaylist}
                    onChange = {this.onChangeInputSearchPlaylist}
                    />
                    <Iconbtn onClick = {this.spotifySearchTracks}>
                        <Icon src={iconSearch} alt = "ícone de buscar" />
                    </Iconbtn>
                    </SearchTracksContainer> 
                    <ResultsContainer> {this.state.searchResults.map(track => {
                        return <TrackResult key={track.id}>
                        <Iconbtn onClick = {() => this.spotifyGetTrack(track.id)}>
                            <Icon src={iconAdd} al ="ícone de Adicionar" />
                        </Iconbtn>
                        <TrackTitle> {track.name} </TrackTitle>
                        {track.artists.map(artist => {
                                return <p> {artist.name}</p>
                            })}
                        {isAdding(track.id)}
                    </TrackResult>
                })
            }
            </ResultsContainer> 
            </div>
        );
    }
}

export default SearchTracks;