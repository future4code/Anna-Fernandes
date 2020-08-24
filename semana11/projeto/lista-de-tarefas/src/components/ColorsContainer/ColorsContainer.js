import React from "react";
import { ColorsBoxContainer, ColorBox } from './styles';

export const ColorsContainer = props => {
  return (
    <ColorsBoxContainer>
        <p>temas: </p>
        <ColorBox violet onClick={props.onClickChangeColor} id="violet" data-testid='violet'></ColorBox>
        <ColorBox blue onClick={props.onClickChangeColor} id="blue" data-testid='blue'></ColorBox>
        <ColorBox dark onClick={props.onClickChangeColor} id="dark" data-testid='dark'></ColorBox>
    </ColorsBoxContainer>
  );
};