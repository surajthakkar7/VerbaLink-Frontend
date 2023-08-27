import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import styled from "@emotion/styled"; // Import styled from emotion

const FormContainer = styled(Box)`
  width: 50%;
  border: 3px solid #ffcccb;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  box-shadow: 10px 10px 20px #ccc;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Heading = styled(Typography)`
  text-align: center;
  font-weight: bold;
  padding: 20px;
  color: gray;
`;

const InputLabelStyled = styled(InputLabel)`
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
`;

const SubmitButton = styled(Button)`
  margin-top: 20px;
  background-color: #ff5733;
  color: white;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff7858;
  }
`;

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageFile: null, // This will store the selected image file
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setInputs({
      ...inputs,
      imageFile: e.target.files[0], // Store the selected image file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("user", id);
      console.log("Image File:", inputs.imageFile);
      formData.append("image", inputs.imageFile); // Append the image file
      console.log(formData);

      const { data } = await axios.post("/api/v1/blog/create-blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Heading variant="h2" fontWeight="bold" color="gray">
          Create A Post
        </Heading>
        <InputLabelStyled>Title</InputLabelStyled>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <InputLabelStyled>Description</InputLabelStyled>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <InputLabelStyled>Choose Image</InputLabelStyled>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
       {inputs.imageFile && (
  <img
  src={URL.createObjectURL(inputs.imageFile)}
  alt="Image Preview"
  style={{ maxWidth: "100%", marginTop: "10px" }}
/>
)}   

        <SubmitButton type="submit">SUBMIT</SubmitButton>
      </FormContainer>
    </form>
  );
};

export default CreateBlog;
