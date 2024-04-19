import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Avatar,
  Button,
  Input,
  Box,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import baseUrl from "config";
const Reply = ({ reply }) => {
  const {
    createdAt,
    userPicturePath,
    firstName,
    lastName,
    content,
    _id,
    questionID,
  } = reply;
  const [isReplies, setIsReplies] = useState(false);
  const [nesReply, setNesReply] = useState("");
  const userId = useSelector((state) => state.user._id);
  const [replies, setReplies] = useState([]);

  const currentTime = new Date();
  const ParsedcreatedAt = new Date(createdAt);
  const timeDifferenceMs = currentTime - ParsedcreatedAt;
  let timeDifferenceMinutes = Math.floor(timeDifferenceMs / (1000 * 60));
  if (timeDifferenceMinutes >= 60)
    timeDifferenceMinutes = Math.floor(timeDifferenceMinutes / 60) + " hour";
  else timeDifferenceMinutes = timeDifferenceMinutes + " minutes";

  const getNestedReplies = async () => {
    try {
      const res = await fetch(`${baseUrl}/forum/reply/${_id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch question information");
      }
      const data = await res.json();
      setReplies(data.replies);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getNestedReplies();
  }, []);

  const handleReplyPost = async () => {
    const res = await fetch(`${baseUrl}/forum/reply/${_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quesId: questionID,
        content: nesReply,
        userId,
      }),
    });
    if (res.ok) {
      setNesReply("");
      getNestedReplies();
    }
  };

  return (
    <WidgetWrapper>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar src={`${baseUrl}/assets/${userPicturePath}`} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>
            {firstName + " " + lastName}
          </h4>
          <p style={{ textAlign: "left" }}>{content}</p>
          <p style={{ textAlign: "left", color: "gray" }}>
            Posted {timeDifferenceMinutes} ago.
          </p>
          <Button onClick={() => setIsReplies(!isReplies)}>Show Replies</Button>
          {isReplies && (
            <div>
              <Box width="100%" display="flex" gap="0.5rem">
                <TextField
                  onChange={(e) => setNesReply(e.target.value)}
                  value={nesReply}
                  placeholder="Post Your reply"
                  multiline
                  style={{
                    width: "100%",
                  }}
                  variant="filled"
                />
                <Button
                  onClick={() => {
                    handleReplyPost();
                  }}
                >
                  Reply
                </Button>
              </Box>

              {replies &&
                replies.map((reply) => <Reply reply={reply} key={reply._id} />)}
            </div>
          )}
        </Grid>
      </Grid>
    </WidgetWrapper>
  );
};

export default Reply;
