import { Box, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import baseUrl from "config";
import React from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
export const QuestionCard = ({ques}) => {
 const {userPicturePath, lastName, firstName, title, _id, content}=ques;

  const redirectUrl = `/forum/${_id}`;
  const CustomLink = React.forwardRef((props, ref) => (
    <span ref={ref} {...props} />
  ));
  return (
    <WidgetWrapper>
      <Link to={redirectUrl} component={CustomLink} style={{ textDecoration: "none", color: "inherit" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Box>
              <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={"40px"}
                height={"40px"}
                alt="user"
                src={`${baseUrl}/assets/${userPicturePath}`}
              />
            </Box>
            <Box ml="1rem">
              <Typography
                color={"primary.main"}
                variant="h4"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: "primary.light",
                    cursor: "pointer",
                  },
                }}
              >
                {title}
              </Typography>
              <Typography >{content}</Typography>
              <Typography color={"secondary.light"}>
                Asked by: {firstName+" "+lastName}
              </Typography>
            </Box>
          </Box>

          <RiArrowDropRightLine size={60} color={"primary.main"} />
        </Box>
      </Link>
    </WidgetWrapper>
  );
};
