import React, { useState } from 'react';

import { ProfileContainer, ProfileImg, ProfileContent, ProfileText, ProfileName, ProfileBio, ProfileBackground, EditBtn, EditContainer, TextAreaEdit, InputEdit, CloseBtn, SaveBtn } from './styles';

import editIcon from '../../images/edit.svg';

function UserProfile() {

    const [profile, setProfile] = useState({
        id: "12345abc",
        name: "Psyduck",
        age: 35,
        photo: "https://i.pinimg.com/originals/c5/0e/a6/c50ea636e1b9712025c0a2564d0690d2.png",
        bio: "Preciso de um amor para curar minha enxaqueca. Pode me chamar de psy-ai-ai."
    });

    const [editUser, setEditUser] = useState(false);
    
    const handleEditUser = () => {
        setEditUser(!editUser);
    }
    
    const [inputName, setinputName] = useState("")
    const [inputAge, setinputAge] = useState("")
    const [inputPhoto, setinputPhoto] = useState("")
    const [inputBio, setinputBio] = useState("")

    const handleInputNameChange = event => {
        setinputName(event.target.value);
    }
    const handleInputAgeChange = event => {
        setinputAge(event.target.value);
    }
    const handleInputPhotoChange = event => {
        setinputPhoto(event.target.value);
    }
    const handleInputBioChange = event => {
        setinputBio(event.target.value);
    }

    const changeProfile = () => {
        const newProfile = {
            id: Date.now(),
            name: inputName,
            age: inputAge,
            photo: inputPhoto,
            bio: inputBio
        }

        setProfile(newProfile);
        setEditUser(!editUser);
        setinputName("");
        setinputAge("");
        setinputPhoto("");
        setinputBio("");
    }

    const editContainer = editUser && <EditContainer>
        <InputEdit placeholder="nome" value={inputName} onChange={handleInputNameChange}/>
        <InputEdit placeholder="idade" value={inputAge} onChange={handleInputAgeChange}/>
        <InputEdit placeholder="photo" value={inputPhoto} onChange={handleInputPhotoChange}/>
        <TextAreaEdit placeholder="bio" value={inputBio} onChange={handleInputBioChange}/>
        <SaveBtn onClick={changeProfile}>Salvar</SaveBtn>
        <CloseBtn onClick={handleEditUser}>X</CloseBtn>
    </EditContainer>

    return (
    <ProfileContainer>
        <ProfileContent animate="none" key={profile.id}>
            <ProfileBackground profileImage={'url(' + profile.photo + ')'} />
            <ProfileImg src={profile.photo} alt={profile.name} />
            <ProfileText>
                <ProfileName>Você: {profile.name}, {profile.age}</ProfileName>
                <ProfileBio>{profile.bio}</ProfileBio>
                <EditBtn><img src={editIcon} alt="Botão de editar" onClick={handleEditUser}/></EditBtn>
            </ProfileText>
        </ProfileContent>
        {editContainer}
    </ProfileContainer>
  );
}

export default UserProfile;
