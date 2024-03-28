import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "state/authSlice";
import { UseDispatch } from "react-redux";

const MyQuestion = () => {
  const token = useSelector((state) => state.token);
  const dispatch=useDispatch();
  const questions= useSelector((state)=>state.questions);
  const getQuestions = async () => {
    const res = await fetch("forum", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data= await res.json();
    dispatch(setQuestions(data));
  };
  useEffect(()=>{
    getQuestions();
  },[]);
  return (questions.length===0)?(
    <Box>
      No questions yet!!!
    </Box>
  ):(
    <Box>
    {questions[0].title}
  </Box>
  );
};

export default MyQuestion;
