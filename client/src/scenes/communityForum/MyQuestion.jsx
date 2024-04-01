import { Box, Button, Input, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "state/authSlice";

const MyQuestion = () => {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
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
    const questions= await res.json();
    dispatch(setQuestions({questions}));
    setTitle("");
    setDes("");
  };
  return (
    <WidgetWrapper>
      <Typography>Ask a question</Typography>
      <Typography>Title:</Typography>
      <TextField
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <Typography>Content</Typography>
      <Input
        placeholder="What's on your mind..."
        onChange={(e) => setDes(e.target.value)}
        value={des}
        multiline
        sx={{
          width: "100%",
          borderRadius: "2rem",
        }}
      />
      <Button variant="contained" onClick={handlePost} disabled={!des}>
        Post Question
      </Button>
    </WidgetWrapper>
  );
};

export default MyQuestion;
