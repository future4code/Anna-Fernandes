import React from 'react'
import styled from 'styled-components'

import {IconeComContador} from '../IconeComContador/IconeComContador'
import {IconeSemContador} from '../IconeSemContador/IconeSemContador'

import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeComentario from '../../img/comment_icon.svg'
import iconeSalvoBranco from '../../img/save-white.svg'
import iconeSalvoPreto from '../../img/save.svg'
import iconeShare from '../../img/share.svg'
import {SecaoComentario} from '../SecaoComentario/SecaoComentario'
import {SecaoShare} from '../SecaoShare/SecaoShare'

const PostContainer = styled.div `
  width: 400px;
  margin-bottom: 24px;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(50, 50, 50, 0.5);
  `

const PostHeader = styled.div `
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`

const UserPhoto = styled.img `
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 50%;
`

const PostPhoto = styled.img `
  width: 100%;
`

const PostFooter = styled.div `
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`

const Icones = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-around;
`

class Post extends React.Component {
  state = {
    curtido: false,
    numeroCurtidas: 0,
    comentando: false,
    numeroComentarios: 0,
    salvo:false,
    shared: false,
  }

  onClickCurtida = () => {
    if (this.state.curtido) {
      this.setState({
        numeroCurtidas: this.state.numeroCurtidas -1,
        curtido: false
      })
    } else {
      this.setState({
        numeroCurtidas: this.state.numeroCurtidas + 1,
        curtido: true
      })
    }
  }

  onClickComentario = () => {
    this.setState({
      comentando: !this.state.comentando
    })
  }

  onClickSalvo = () => {
    this.setState({
      salvo: !this.state.salvo
    })
  }

  aoEnviarComentario = () => {
    this.setState({
      // comentando: false,
      numeroComentarios: this.state.numeroComentarios + 1
    })
  }

  onClickShare = () => {
    this.setState({
      shared: !this.state.shared
    })
  }

  render() {
    let iconeCurtida
    let componentecurtida
    if(this.state.curtido) {
      iconeCurtida = iconeCoracaoPreto
    } else {
      iconeCurtida = iconeCoracaoBranco
    }
    
    let iconeSalvo
    if(this.state.salvo) {
      iconeSalvo = iconeSalvoPreto
    } else {
      iconeSalvo = iconeSalvoBranco
    }

    let componenteComentario
    
    if(this.state.comentando) {
      componenteComentario = <SecaoComentario aoEnviar={this.aoEnviarComentario}/>
    }
    
    let componenteShare

    if(this.state.shared) {
      componenteShare = <SecaoShare />
    }

    return <PostContainer>
      <PostHeader>
        <UserPhoto src={this.props.fotoUsuario} alt={'Imagem do usuario'}/>
        <p>{this.props.nomeUsuario}</p>
      </PostHeader>

      <PostPhoto src={this.props.fotoPost} alt={'Imagem do post'}/>

      <PostFooter>
        <Icones>
          <IconeComContador
            icone={iconeCurtida}
            onClickIcone={this.onClickCurtida}
            valorContador={this.state.numeroCurtidas}
          />

          <IconeComContador
            icone={iconeComentario}
            onClickIcone={this.onClickComentario}
            valorContador={this.state.numeroComentarios}
          />
        </Icones>

        <Icones>
          <IconeSemContador
            icone={iconeSalvo}
            onClickIcone={this.onClickSalvo}
          />

          <IconeSemContador
            icone={iconeShare}
            onClickIcone={this.onClickShare}
          />
        </Icones>
      </PostFooter>
      {componenteShare}
      {componenteComentario}
    </PostContainer>
  }
}

export default Post