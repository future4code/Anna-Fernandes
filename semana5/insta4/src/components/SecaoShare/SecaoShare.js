import React, {Component} from 'react'
import './SecaoShare.css'

import logoInstagram from '../../img/instagram.svg'
import logoFacebook from '../../img/facebook.svg'
import logoTwitter from '../../img/twitter.svg'

export class SecaoShare extends Component {
	state = {
		texto: ""
	}

	onChangeTexto = (event) => {
		this.setState({
			texto: event.target.value
		})
	}

	onClickInstagram = () => {
		console.log(`Post compartilhado no Instagram com a mensagem: ${this.state.texto}`)
	}

	onClickFacebook = () => {
		console.log(`Post compartilhado no Facebook com a mensagem: ${this.state.texto}`)
	}

	onClickTwitter = () => {
		console.log(`Post compartilhado no Twitter com a mensagem: ${this.state.texto}`)
	}

	render() {
		return <div className={'share-container'}>
			<div className={'texto-share'}>
				<input
					className={'input-share'}
					placeholder={'Texto de compartilhamento'}
					value={this.state.texto}
					onChange={this.onChangeTexto}
				/>
			</div>
			<div className={'share-btns-container'}>
				<button onClick={this.onClickInstagram}><img src={logoInstagram} alt="logo redes sociais" /></button>
				<button onClick={this.onClickFacebook}><img src={logoFacebook} alt="logo redes sociais" /></button>
				<button onClick={this.onClickTwitter}><img src={logoTwitter} alt="logo redes sociais" /></button>
			</div>
		</div>
	}
}
