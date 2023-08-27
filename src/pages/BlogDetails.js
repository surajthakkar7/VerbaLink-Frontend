import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled"; // Import styled from emotion

const StyledBox = styled(Box)`
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

const StyledHeading = styled(Typography)`
  text-align: center;
  font-weight: bold;
  padding: 20px;
  color: gray;
`;

const StyledInputLabel = styled(InputLabel)`
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  border-radius: 3px;
  margin-top: 20px;
  background-color: #ff5733;
  color: white;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ff7858;
  }
`;

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
        //  image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
      //  image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledBox>
        <StyledHeading variant="h2">Update A Post</StyledHeading>
        <StyledInputLabel>Title</StyledInputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <StyledInputLabel>Description</StyledInputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        
        <StyledButton type="submit">UPDATE</StyledButton>
      </StyledBox>
    </form>
  );
};

export default BlogDetails;
