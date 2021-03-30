import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";

import ProfileImage from "../ProfileImage/ProfileImage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Logout from "../Logout/Logout";
const Container = styled.div`
  width: auto;
  margin-left: 16rem;
  margin-top: 5rem;
  position: relative;
  padding: 0 4rem;
`;

const Main = ({ user }) => {
  return (
    <Container>
      {/* <ProfilesTable></ProfilesTable> */}
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/logout" component={Logout}></Route>
      <Route
        path="/(Home|)"
        render={(props) => (
          <ProfileImage {...props} dataPath={"tinder/profiles/"} user={user} />
        )}
      ></Route>
      <Route
        path="/My Profiles"
        render={(props) => (
          <ProfileImage
            {...props}
            dataPath={"tinder/profiles/me"}
            user={user}
          />
        )}
      ></Route>
      <Route
        path="/Instagram Profiles"
        render={(props) => {
          if (!localStorage.getItem("token")) return <Redirect to="/login" />;
          return (
            <ProfileImage
              {...props}
              dataPath={"tinder/profiles/instagram"}
              user={user}
            />
          );
        }}
      ></Route>
    </Container>
  );
};

export default Main;
