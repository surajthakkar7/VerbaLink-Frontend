import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import styled from "@emotion/styled"; // Import styled from emotion
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../components/images/logo.png";

axios.defaults.baseURL = 'http://localhost:8080'; // Update the port if needed


// Styled components
const StyledBox = styled(Box)`
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 5px;
  box-shadow: 10px 10px 20px #ccc;
  padding: 20px;
  border-radius: 5px;
`;

const StyledSubmitButton = styled(Button)`
  border-radius: 3px;
  margin-top: 20px;
  background-color: #ff5733;
  color: white;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff7858;
  }
`;

const StyledLinkButton = styled(Button)`
  border-radius: 3px;
  margin-top: 20px;
  background-color: #ffcccb;
  color: #ff5733;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ffd6d5;
  }
`;

const StyledOrText = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  margin: 20px 0;
`;

const Register = () => {
  const navigate = useNavigate();
  // state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <StyledBox>
          <img src={logo} alt="VerbaLink Logo" style={{ width: "100px", marginBottom: "20px" }} /> {/* Use the logo image */}
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Welcome to VerbaLink
          </Typography>
          <TextField
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            margin="normal"
            type="text"
            required
          />
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

          <StyledSubmitButton type="submit">Sign Up</StyledSubmitButton>
          <StyledOrText>OR</StyledOrText>
          <StyledLinkButton component={Link} to="/login">Already Registered? Login</StyledLinkButton>
        </StyledBox>
      </form>
    </>
  );
};

export default Register;
