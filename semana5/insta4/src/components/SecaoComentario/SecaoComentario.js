import React, {Component} from 'react'
import styled from 'styled-components'

const CommentContainer = styled.div `
	display: flex;
	flex-wrap: wrap;
    justify-content: center;
    padding: 5px;
  `

const InputComment = styled.input `
	width: calc(100% - 100px);
	margin-right: 8px;
	padding: 4px;
	border: none;
	border-radius: 5px;
	box-shadow: 0px 0px 2px rgba(50, 50, 50, 0.5);
  `

const AddComment = styled.button `
	padding: 4px;
	width: 80px;
	border: none;
	border-radius: 5px;
	background-color: #60AEEF;
	color: #fff;
	font-weight: 700;
	cursor: pointer;

	&:hover {
	opacity: 0.75;
	}
  `

const AllComments = styled.ul `
	width: 100%;
	list-style: none;
	padding: 0;
  `
const Comment = styled.ul `
	border-top: 1px solid #000;
	padding: 8px 0;
`

export class SecaoComentario extends Component {
	state = {
		comentarios: [],
		inputComentario: ""
	}

	onClickPublicaComentario = () => {
		
		const novoComentario =  this.state.inputComentario;

		const novoComentarios = [...this.state.comentarios, novoComentario]

		this.setState({ comentarios: novoComentarios, inputComentario: "" })
		
		this.props.aoEnviar();
	}
	
	onChangeComentario = (event) => {
		this.setState({
			inputComentario: event.target.value
		});
	}

	render() {
		const todosComentarios = this.state.comentarios.map(comentario => {
			return (
				<Comment key={comentario}>{comentario}</Comment>
			);
		});

		return (
		<CommentContainer>
			<InputComment
				className={'input-comentario'}
				placeholder={'Comentário'}
				value={this.state.inputComentario}
				onChange={this.onChangeComentario}
			/>
			<AddComment onClick={this.onClickPublicaComentario}>Enviar</AddComment>
			<AllComments>{todosComentarios}</AllComments>
		</CommentContainer>
		)
	}
}
