import React from 'react'
import styled from 'styled-components'

const IconContainer = styled.div `
	display: flex;
    align-items: center;
    justify-content: space-around;
`

const Icon = styled.img `
	height: 24px;
	margin-right: 5px;
`

export function IconeSemContador(props) {
	return <IconContainer className={'icon-container'}>
		<Icon alt={'Icone'} src={props.icone} onClick={props.onClickIcone}/>
        <p></p>
	</IconContainer>
}
