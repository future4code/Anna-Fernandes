import React, {Component} from 'react'
import styled from 'styled-components'

import logoInstagram from '../../img/instagram.svg'
import logoFacebook from '../../img/facebook.svg'
import logoTwitter from '../../img/twitter.svg'

const ShareContainer = styled.div `
	padding: 8px;
	background-color: #f5f5f5;
`

const ShareBtnsContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
`

const ShareBtn = styled.button `
	padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
`

const ShareBtnImg = styled.img `
    max-height: 24px;
    margin: 8px;
`

const ShareInput = styled.input `
    display: block;
    margin: auto;
    width: 90%;
	margin: 4px auto;
	padding: 4px;
	border: none;
	border-radius: 5px;
	box-shadow: 0px 0px 2px rgba(50, 50, 50, 0.5);
`

const ShareMensagem = styled.p `
	text-align: center;
	font-style: italic;
`

export class SecaoShare extends Component {
	state = {
		texto: "",
		inputTexto: ""
	}

	onChangeTexto = (event) => {
		this.setState({
			inputTexto: event.target.value
		})
	}

	onClickInstagram = () => {
		const novoTexto =  this.state.inputTexto;
		this.setState({
			texto: "Post compartilhado no Instagram com a mensagem: " + novoTexto,
			inputTexto: "" 
		});
	}

	onClickFacebook = () => {
		const novoTexto =  this.state.inputTexto;
		this.setState({
			texto: "Post compartilhado no Twitter com a mensagem: " + novoTexto,
			inputTexto: "" 
		});
	}

	onClickTwitter = () => {
		const novoTexto =  this.state.inputTexto;
		this.setState({
			texto: "Post compartilhado no Twitter com a mensagem: " + novoTexto,
			inputTexto: "" 
		});
	}

	render() {
		return <ShareContainer>
			<ShareInput
				className={'input-share'}
				placeholder={'Texto de compartilhamento'}
				value={this.state.inputTexto}
				onChange={this.onChangeTexto}
			/>
			<ShareBtnsContainer>
				<ShareBtn onClick={this.onClickInstagram}><ShareBtnImg src={logoInstagram} alt="logo redes sociais" /></ShareBtn>
				<ShareBtn onClick={this.onClickFacebook}><ShareBtnImg src={logoFacebook} alt="logo redes sociais" /></ShareBtn>
				<ShareBtn onClick={this.onClickTwitter}><ShareBtnImg src={logoTwitter} alt="logo redes sociais" /></ShareBtn>
			</ShareBtnsContainer>
			<ShareMensagem>{this.state.texto}</ShareMensagem>
		</ShareContainer>
	}
}
