import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "state/authSlice";
import { UseDispatch } from "react-redux";
import { QuestionCard } from "./QuestionCard";

const Questions = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const getQuestions = async () => {
    const res = await fetch("forum", {
      method: "GET",
    });
    const data = await res.json();
    dispatch(setQuestions({ questions: data }));
  };
  console.log("hey")

  useEffect(() => {
    getQuestions();
  }, []);
  return questions.length === 0 ? (
    <Box>No questions yet!!!</Box>
  ) : (
    <Box display="flex" flexDirection="column" gap="1.5rem">
      {questions.map(({userPicturePath, lastName, firstName, title, _id}) => (
          <QuestionCard userPicturePath={userPicturePath} name={firstName+" "+lastName} title={title} quesId={_id}/>
      ))}
    </Box>
  );
};

export default Questions;
