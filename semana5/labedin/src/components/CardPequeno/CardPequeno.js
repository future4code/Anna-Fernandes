import React from 'react';
import './CardPequeno.css'

function CardPequeno(props) {
    return (
        <div className="smallcard-container">
            <div>
                <img src={ props.icone } />
                <p><strong>{ props.tipoInformacao }: </strong>{ props.informacao }</p>
            </div>
        </div>
    )
}

export default CardPequeno;
