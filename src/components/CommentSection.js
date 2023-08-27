// components/CommentSection.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ loggedInUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  const handleAddComment = async () => {
    if (!newComment) {
      console.error("Comment text is missing.");
      return;
    }
  
    if (!loggedInUser) {
      console.error("Logged-in user is missing.");
      return;
    }
  
    try {
      console.log("Adding a new comment...");
  
      const requestBody = {
        username: loggedInUser, // Pass the logged-in user's username
        text: newComment,
      };
      console.log("Request Body:", requestBody);
  
      const response = await axios.post('/api/v1/comments', requestBody);
  
      console.log("Comment added:", response.data);
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  
  
// ...

const handleEditComment = async (commentId, newText) => {
  try {
    console.log(`Editing comment with ID: ${commentId}`);

    const response = await axios.put(`/api/comments/${commentId}`, { text: newText });
    const updatedComments = comments.map(comment =>
      comment._id === commentId ? response.data : comment
    );
    setComments(updatedComments);
  } catch (error) {
    console.error('Error editing comment:', error);
  }
};

const handleDeleteComment = async commentId => {
  try {
    console.log(`Deleting comment with ID: ${commentId}`);

    await axios.delete(`/api/comments/${commentId}`);
    const updatedComments = comments.filter(comment => comment._id !== commentId);
    setComments(updatedComments);
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};


// ...


  return (
    <div>
      <h2>Comments</h2>
      <div>
        {comments.map(comment => (
          <div key={comment._id}>
            <p>{comment.username}</p>
            <p>{comment.text}</p>
            {loggedInUser === comment.username && (
              <div>
                <button onClick={() => handleEditComment(comment._id, 'Edited text')}>
                  Edit
                </button>
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
