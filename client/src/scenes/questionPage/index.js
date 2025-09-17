import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Reply from "./Reply";
import WidgetWrapper from "components/WidgetWrapper";
import baseUrl from "config";

const QuestionPage = () => {
  const [questionInfo, setQuestionInfo] = useState(null);
  const { _id } = useSelector((state) => state.auth.user);
  const { quesId } = useParams();
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  const getQuesInfo = async () => {
    try {
      const res = await fetch(`${baseUrl}/forum/${quesId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch question information");
      }
      const data = await res.json();
      setQuestionInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getReplies = async () => {
    try {
      const res = await fetch(`${baseUrl}/forum/${quesId}/replies`);
      if (!res.ok) {
        throw new Error("Failed to fetch question information");
      }
      const data = await res.json();
      setReplies(data.replies);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePost = async () => {
    try {
      const res = await fetch(`${baseUrl}/forum/${quesId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: _id,
          content: reply,
        }),
      });
      if (res.ok) {
        setReply(""); // Clear the input field after posting
        getReplies(); // Fetch updated replies after posting
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuesInfo();
    getReplies();
  }, []);

  return (
    <div>
      <WidgetWrapper>
        {questionInfo && (
          <Box display="flex" flexDirection="column">
            <Box display="flex" gap="0.5rem" alignItems="center">
              <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={"30px"}
                height={"30px"}
                alt="user"
                src={`${baseUrl}/assets/${questionInfo?.userPicturePath}`}
              />
              <Box>
                <Typography fontWeight="500">
                  {questionInfo?.firstName + " " + questionInfo?.lastName}
                </Typography>
              </Box>
            </Box>

            <Typography fontSize="1.5rem" fontWeight="600">
              {questionInfo?.title}
            </Typography>

            <Box mt="1rem">{questionInfo?.content}</Box>
            <Box width="100%" display="flex" gap="0.5rem" mt="1rem">
              <TextField
                onChange={(e) => setReply(e.target.value)}
                value={reply}
                placeholder="Leave your thoughts here"
                multiline
                variant="filled"
                style={{
                  width:"100%",
                }}
              />
              <Button onClick={() => handlePost()}>Post</Button>
            </Box>
          </Box>
        )}
      </WidgetWrapper>
      <Box mt="1rem">
        {replies &&
          replies.map((reply) => <Reply reply={reply} key={reply._id} />)}
      </Box>
    </div>
  );
};

export default QuestionPage;
