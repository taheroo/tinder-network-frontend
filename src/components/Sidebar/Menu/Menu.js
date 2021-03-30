import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import MenuItem from "./MenuItem";

const Container = styled.div`
  margin-top: 2rem;
  width: 100%;
`;
const Menu = ({ user }) => {
  // To Fix Menu nav bar using useLocation
  const { pathname } = useLocation();

  console.log("href", pathname);
  //console.log("Menu", user);
  return (
    <Container>
      <MenuItem title="Home" icon={"home"} active />
      {user && <MenuItem title="My Profiles" icon="gift" />}
      <MenuItem title="Instagram Profiles" icon="gift" />
      {!user && (
        <React.Fragment>
          <MenuItem title="Login" icon="cog" />
          <MenuItem title="Register" icon="cog" />
        </React.Fragment>
      )}
      {user && (
        <React.Fragment>
          <MenuItem title="Logout" icon="cog" />
        </React.Fragment>
      )}
    </Container>
  );
};

export default Menu;
