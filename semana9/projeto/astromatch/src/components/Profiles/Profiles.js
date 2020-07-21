import React, { useState, useEffect } from 'react';
import axios from 'axios';

import IconsMatch from '../IconsMatch/IconsMatch';
import { ProfileContainer, LoadingContainer, LoadingBox, Loading, Message, ProfileImg, ProfileContent, ProfileText, ProfileName, ProfileBio, ProfileBackground } from './styles';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const path = "anna-fernandes"

function Profiles(props) {

    const [profile, setProfile] = useState({})
    const [animate, setAnimation] = useState("none")
 
    const getProfile = async () => {
        const response = await axios.get(`${baseUrl}/${path}/person`)
        setProfile(response.data.profile);
        setAnimation("none");
    }

    const animation = side => {
        if (side === "right") {
            setAnimation("right");
        } else if (side === "left") {
            setAnimation("left");
        } else {
            setAnimation("none");
        }
    }

    useEffect(() => {
        getProfile();
        animation("none");
    }, [props.currentPage, props.updateAfterClear]);

    return (
    <ProfileContainer>
        {profile && !profile.name && <LoadingContainer><LoadingBox><Loading></Loading></LoadingBox></LoadingContainer>}

        {profile && profile.name && <ProfileContent animate={animate} key={profile.id}>
            <ProfileBackground profileImage={'url(' + profile.photo + ')'} />
            <ProfileImg src={profile.photo} alt={profile.name} />
            <ProfileText>
                <ProfileName>{profile.name}, {profile.age}</ProfileName>
                <ProfileBio>{profile.bio}</ProfileBio>
                <IconsMatch profileId={profile.id} getProfile={getProfile} animation={animation} />
            </ProfileText>
        </ProfileContent>}

        { !profile && <Message>Não há mais candidatos. Tente limpar seus matches e swipes e começar de novo.</Message>}
    </ProfileContainer>
  );
}

export default Profiles;
