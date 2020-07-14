import styled from "styled-components";

export const AppContainer = styled.div `
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #1BA0F2;
    font-family: sans-serif;
    text-align: center;
`

export const Container = styled.div `
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`

export const Select = styled.select `
    width: 100%;
    margin-bottom: 16px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
`

export const Title = styled.h1 `
    width: 280px;
    margin: 0 0 16px 0;
    padding: 8px;
    border-radius: 8px;
    background-color: #191659;
    color: #fff;
`