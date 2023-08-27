import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import styled from "@emotion/styled"; // Import styled from emotion

// Styled component for the card
const StyledCard = styled(Card)`
  width: 40%;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  box-shadow: 5px 5px 10px #ccc;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 10px 10px 20px #ccc;
  }
`;

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  //const { data } = await axios.get("/api/v1/blog/all-blog");

  const imageUrl = `http://localhost:8080/api/v1/blog/image/${id}`;

 // const base64Image = btoa(String.fromCharCode(...new Uint8Array(ArrayBuffer)));
 // const imageUrl = `data:image/png;base64,${image.data}`
 console.log("Rendering BlogCard for blog:", id); // Add this line


  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledCard>
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={imageUrl} alt="Blog" />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          Title: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
