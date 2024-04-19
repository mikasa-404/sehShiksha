import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "state/authSlice";
import { QuestionCard } from "./QuestionCard";
import baseUrl from "config";

const Questions = () => {
  // const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const getQuestions = async () => {
    const res = await fetch(`${baseUrl}/forum`, {
      method: "GET",
    });
    const data = await res.json();
    dispatch(setQuestions({ questions: data }));
  };

  useEffect(() => {
    getQuestions();
  }, []);
  return questions.length === 0 ? (
    <Box>No questions yet!!!</Box>
  ) : (
    <Box display="flex" flexDirection="column" gap="1.5rem">
      {questions.map((ques) => (
          <QuestionCard key={ques._id} ques={ques}/>
      ))}
    </Box>
  );
};

export default Questions;
