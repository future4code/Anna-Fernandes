import styled from "styled-components"

export const PostContainer = styled.div `
    border: none;
    border-radius: 8px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    width: 300px;
    margin-bottom: 10px;
    padding: 16px 0;
`

export const PostHeader = styled.div `
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
`

export const PostFooter = styled.div `
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
`

export const UserPhoto = styled.img`
    height: 30px;
    width: 30px;
    margin-right: 10px;
    border-radius: 50%;
`

export const PostPhoto = styled.img`
    width: 100%;
`

export const CommentContainer = styled.div`
    margin-left: 10px;
`