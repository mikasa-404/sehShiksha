import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Reply from "./Reply";

const QuestionPage = () => {
  const [questionInfo, setQuestionInfo] = useState(null);
  const { _id } = useSelector((state) => state.user);
  const { quesId } = useParams();
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);

  const getQuesInfo = async () => {
    try {
      const res = await fetch(`/forum/${quesId}`);
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
      const res = await fetch(`/forum/${quesId}/replies`);
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
      const res = await fetch(`/forum/${quesId}`, {
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
      {questionInfo && <h1>{questionInfo.title}</h1>}
      <Input
        onChange={(e) => setReply(e.target.value)}
        value={reply}
        placeholder="Post Your reply"
      />
      <Button onClick={() => handlePost()}>Post</Button>
      <h1>Comments</h1>

      {/* Display replies content */}
      {replies && replies.map((reply) => <Reply reply={reply} key={reply._id} />)}
    </div>
  );
};

export default QuestionPage;
