import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

import styled from "@emotion/styled"; // Import styled from emotion
import VerbalinkLogo from "../components/images/logo.png"; // Update the path to the logo image

const PinkButton = styled(Button)`
  background-color: #ffcccb;
  color: #ff5733;
  text-transform: none;
  transition: background-color 0.3s ease-in-out;
  border-radius: 20px;
  padding: 10px 25px;
  margin: 0 10px;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    background-color: #ffd6d5;
  }
`;

const OrText = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  margin: 20px 0;
`;

const LoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: auto;
  margin-top: 50px;
  padding: 30px;
  box-shadow: 10px 10px 20px #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const WelcomeText = styled(Typography)`
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #ff5733;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoginContainer>
        <LogoImage src={VerbalinkLogo} alt="Verbalink Logo" />
        <WelcomeText>Welcome back!</WelcomeText>
        <TextField
          placeholder="Email"
          value={inputs.email}
          name="email"
          margin="normal"
          type="email"
          required
          onChange={handleChange}
        />
        <TextField
          placeholder="Password"
          value={inputs.password}
          name="password"
          margin="normal"
          type="password"
          required
          onChange={handleChange}
        />
        <PinkButton type="submit" variant="contained">
          Submit
        </PinkButton>
        <OrText>OR</OrText>
        <PinkButton onClick={() => navigate("/register")}>
          Not a user? Please Register
        </PinkButton>
      </LoginContainer>
    </form>
  );
};

export default Login;
