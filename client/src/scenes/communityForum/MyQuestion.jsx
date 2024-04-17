import { Box, Button, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "state/authSlice";

const MyQuestion = () => {
  const { _id } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");

  const dispatch = useDispatch();
  const handlePost = async () => {
    const res = await fetch("forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: _id,
        title: title,
        content: des,
      }),
    });
    const questions = await res.json();
    dispatch(setQuestions({ questions }));
    setTitle("");
    setDes("");
  };
  return (
    <WidgetWrapper>
      <Box display="flex" flexDirection="column" gap="0.5rem">
      <Typography fontSize="1rem" fontWeight="500">Ask a question</Typography>
      <TextField
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Start a discussion"
        label="Title"
      />
      <TextField
        placeholder="What's on your mind..."
        onChange={(e) => setDes(e.target.value)}
        value={des}
        multiline
        rows={3}
        sx={{
          width: "100%",
          borderRadius: "2rem",
        }}
        label="Content"

      />
      <Button variant="contained" onClick={handlePost} disabled={!title && !des}>
        Post Question
      </Button>
      </Box>
     
    </WidgetWrapper>
  );
};

export default MyQuestion;
