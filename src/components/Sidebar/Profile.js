import React from "react";
import styled from "styled-components";
import Image from "../../assets/images/profileimg.jpg";

const Container = styled.div`
  margin-top: 5rem;
`;

const ProfileImg = styled.img`
  height: 5rem;
`;

const ProfileName = styled.h1`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
`;

const Profile = ({ user }) => {
  return (
    <Container>
      <ProfileImg src={Image} />
      <ProfileName>{user.fullname}</ProfileName>
    </Container>
  );
};

export default Profile;
