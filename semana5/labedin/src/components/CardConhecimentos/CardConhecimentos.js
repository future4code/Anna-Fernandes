import React from 'react';
import './CardConhecimentos.css'

function CardConhecimentos(props) {
    return (
        <div className="smallcard-container">
            <div>
                <p><strong>{ props.area }: </strong></p>
                <img src={ props.icone } />
                <p>{ props.descricao }</p>
            </div>
        </div>
    )
}

export default CardConhecimentos;