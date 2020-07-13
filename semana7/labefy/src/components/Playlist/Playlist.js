import React from 'react';
import axios from 'axios';

import { PlaylistContainer, PlaylistImg, PlaylistTracks, AddTrack, AddTrackTitle, PlaylistTitle, PlaylistTrackDetails, TrackText, Name, Artist, Icon, Iconbtn } from './style';

import iconDelete from '../../images/delete.svg';
import iconAdd from '../../images/add.svg';
import iconPlay from '../../images/play.svg';
import iconPause from '../../images/pause.svg';

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
      audioPlaying: "",
      trackPlaying: ""
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
        this.setState({ inputTrackName: "", inputTrackArtist: "", inputTrackUrl: "" });
        this.props.updatePlaylist();
      })
      .catch(err => {
        alert("Ops, algo deu errado: " + err.message)
      })
    }
  
    removeTrack = (id, playlistId) => {
        if ( window.confirm("Você tem certeza de que deseja deletar essa música?") ) {
            axios.delete(`${baseUrl}/${playlistId}/tracks/${id}`, axiosConfig)
            .then( () => {
              alert("Música deletada com sucesso");
              this.props.updatePlaylist();
            })
            .catch(err => {
              alert("Ops, algo deu errado: " + err.message)
            })
        }
    }

    
    playTrack = url => {
    
        const trackUrl = url;
        const audio = new Audio(trackUrl);
        
        audio.play();
        this.setState({ audioPlaying: audio, isPlaying: true, trackPlaying: url });
    }

    pauseTrack = () => {
        this.state.audioPlaying.pause();
        this.setState({ isPlaying: false })
    }

    render() {

        const audioControl = url => {
          if ( this.state.isPlaying && this.state.trackPlaying === url ) {
            return <Iconbtn onClick={this.pauseTrack}><Icon src={iconPause} alt="ícone de pausar" /></Iconbtn>
          } else {
            return <Iconbtn onClick={() => this.playTrack(url)}><Icon src={iconPlay} alt="ícone de play" /></Iconbtn>
          }
      }

        return (
          <PlaylistContainer> 
            <PlaylistTitle>{this.props.playlistName}</PlaylistTitle>
            <p>{this.props.playlistQuantity > 1 ? `${this.props.playlistQuantity} músicas` : `${this.props.playlistQuantity} música` } </p>
            <PlaylistImg src="https://picsum.photos/800/600" alt="Imagem da playlist"/>
            {this.props.playlistTracks.map( track => {
                return <PlaylistTracks key={track.id}>
                    <PlaylistTrackDetails>
                        {audioControl(track.url)}
                        <TrackText>
                            <Name>{track.name}</Name>
                            <Artist>{track.artist}</Artist>
                        </TrackText>
                    </PlaylistTrackDetails>
                    <Iconbtn onClick={() => this.removeTrack(track.id, this.props.playlistId)}><Icon src={iconDelete} alt="ícone de deletar" /></Iconbtn>
                    </PlaylistTracks>
                })}             
            <AddTrack>
                <AddTrackTitle>Adicione uma nova música</AddTrackTitle>
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
                <Iconbtn onClick={ this.addTrack}><Icon src={iconAdd} alt="ícone de adicionar" /></Iconbtn>
            </AddTrack>
            
          </PlaylistContainer>
        );
    }
}

export default Playlist;
