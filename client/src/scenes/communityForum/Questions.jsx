import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "state/authSlice";
import { QuestionCard } from "./QuestionCard";
import baseUrl from "config";

const Questions = () => {
  // const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.auth.questions || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${baseUrl}/forum`, {
        method: "GET",
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch questions: ${res.status}`);
      }
      
      const data = await res.json();
      dispatch(setQuestions({ questions: data }));
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error" variant="h6">
          Error loading questions
        </Typography>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>
    );
  }

  return !questions || questions.length === 0 ? (
    <Box p={3}>
      <Typography variant="h6" color="textSecondary">
        No questions yet!!!
      </Typography>
    </Box>
  ) : (
    <Box display="flex" flexDirection="column" gap="1.5rem">
      {questions.map((ques) => (
          <QuestionCard key={ques._id} ques={ques}/>
      ))}
    </Box>
  );
};

export default Questions;
