import React from 'react'
import styled from 'styled-components'

const IconContainer = styled.div `
	display: flex;
    align-items: center;
	justify-content: space-around;
	margin: 0 4px;
`

const Icon = styled.img `
	height: 24px;
	margin-right: 4px;
`

export function IconeComContador(props) {
	return <IconContainer>
		<Icon alt={'Icone'} src={props.icone} onClick={props.onClickIcone}/>
		<p>{props.valorContador}</p>
	</IconContainer>
}
