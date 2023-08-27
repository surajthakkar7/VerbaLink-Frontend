import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import styled from "@emotion/styled"; // Import styled from emotion
import VerbalinkLogo from "../components/images/logo.png"; // Update the path to your logo image

const PinkButton = styled(Button)`
  background-color: #ffcccb;
  color: #ff5733;
  text-transform: none;
  transition: background-color 0.3s ease-in-out;
  border-radius: 20px;
  padding: 8px 20px;
  margin: 0 10px;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    background-color: #ffd6d5;
  }
`;

const HeaderContainer = styled(AppBar)`
  background-color: #ffcccb; /* Pink background color */
`;

const CenterBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
`;

const Logo = styled.img`
  width: 40px;
  height: auto;
  margin-right: 10px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.3); /* Slightly larger on hover */
  }
`;

const RightBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Header = () => {
  const navigate = useNavigate();

  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [value, setValue] = useState();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeaderContainer position="sticky">
      <Toolbar>
        <CenterBox onClick={() => navigate("/")}>
          <Logo src={VerbalinkLogo} alt="Verbalink Logo" />
          <Typography variant="h4">Verbalink</Typography>
        </CenterBox>
        <RightBox>
          {isLogin && (
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                component={Link}
                to="/blogs"
                label={
                  <PinkButton>
                    Blogs
                  </PinkButton>
                }
              />
              <Tab
                component={Link}
                to="/my-blogs"
                label={
                  <PinkButton>
                    My Blogs
                  </PinkButton>
                }
              />
              <Tab
                component={Link}
                to="/create-blog"
                label={
                  <PinkButton>
                    Create Blog
                  </PinkButton>
                }
              />
            </Tabs>
          )}
          {!isLogin ? (
            <>
              <PinkButton component={Link} to="/login">
                Login
              </PinkButton>
              <PinkButton component={Link} to="/register">
                Register
              </PinkButton>
            </>
          ) : (
            <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
              Logout
            </Button>
          )}
          <PinkButton component={Link} to="/about">
            About Us
          </PinkButton>
          <PinkButton component={Link} to="/contact">
            Contact Us
          </PinkButton>
        </RightBox>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;
