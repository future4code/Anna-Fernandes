import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import imgRock from '../../images/rock.jpg';

const PlaylistContainer = styled.div `
  width: 100%;
`
const PlaylistTracks = styled.div `
  width: 100%;
`
const AddTrack = styled.div `
  width: 100%;
`

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists";

const axiosConfig = {
    headers: {
        Authorization: "anna-fernandes-turing"
    }
};

class Playlist extends React.Component {
    state = {
      track: "",
      inputTrackName: "",
      inputTrackArtist: "",
      inputTrackUrl: "",
      isPlaying: false,
      audioPlaying: ""
    }
  
    onChangeInputTrackName = event => {
      this.setState({ inputTrackName: event.target.value })
    }
  
    onChangeInputTrackArtist = event => {
      this.setState({ inputTrackArtist: event.target.value })
    }
  
    onChangeInputTrackUrl = event => {
      this.setState({ inputTrackUrl: event.target.value })
    }
  
    addTrack = () => {
      const id = this.props.playlistId;
  
      const body = {
        name: this.state.inputTrackName,
        artist: this.state.inputTrackArtist,
        url: this.state.inputTrackUrl
      }

      axios.post(`${baseUrl}/${id}/tracks`, body, axiosConfig)
      .then( () => {
        alert("Música adicionada com sucesso");
        this.props.updatePlaylist();
      })
      .catch(err => {
        alert("Ops, algo deu errado: " + err.message)
      })
    }
  
    removeTrack = (id, playlistId) => {
      axios.delete(`${baseUrl}/${playlistId}/tracks/${id}`, axiosConfig)
      .then( () => {
        alert("Música deletada com sucesso");
        this.props.updatePlaylist();
      })
      .catch(err => {
        alert("Ops, algo deu errado: " + err.message)
      })
    }

    
    playTrack = url => {
    
        const trackUrl = url;
        const audio = new Audio(trackUrl);
        
        console.log()

        audio.play();
        this.setState({ audioPlaying: audio });
        this.setState({ isPlaying: true })
    }

    pauseTrack = () => {
        this.state.audioPlaying.pause();
        this.setState({ isPlaying: false })
    }

    render() {

        const audioControl = url => !this.state.isPlaying ? <button onClick={() => this.playTrack(url)}>Play</button> : <button onClick={this.pauseTrack}>Pause</button>

        return (
          <PlaylistContainer>              
            <AddTrack>
                <h3>Adicione uma música a uma de suas playlists</h3>
                <input 
                    onChange={this.onChangeInputTrackName}
                    value={this.state.inputTrackName}
                    placeholder="Nome da música"/>
                <input 
                    onChange={this.onChangeInputTrackArtist}
                    value={this.state.inputTrackArtist}
                    placeholder="Artista ou Banda"/>
                <input 
                    onChange={this.onChangeInputTrackUrl}
                    value={this.state.inputTrackUrl}
                    placeholder="Link"/>
                <button onClick={ this.addTrack}>Adicionar</button>
            </AddTrack>
            
            <h3>{this.props.playlistName}</h3>
            <p>{this.props.playlistQuantity} músicas</p>
            <img src={imgRock} alt="Imagem da playlist"/>
            {this.props.playlistTracks.map( track => {
                return <PlaylistTracks key={track.id}>
                    {audioControl(track.url)}
                    <h4>{track.name}</h4>
                    <h5>{track.artist}</h5>
                    <button onClick={() => this.removeTrack(track.id, this.props.playlistId)}>Delete</button>
                    </PlaylistTracks>
                })}
          </PlaylistContainer>
        );
    }
}

export default Playlist;
