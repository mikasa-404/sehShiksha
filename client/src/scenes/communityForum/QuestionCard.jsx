import { Box, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
export const QuestionCard = ({ userPicturePath, name, title,quesId }) => {
  const redirectUrl=`/forum/${quesId}`;
  const CustomLink = React.forwardRef((props, ref) => (
    <span ref={ref} {...props} />
  ));

  return (
    <WidgetWrapper>

      <Link to={redirectUrl} component={CustomLink} >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Box>
              <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={"50px"}
                height={"50px"}
                alt="user"
                src={`/assets/${userPicturePath}`}
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
              <Typography color={"secondary.light"}>
                Asked by: {name}
              </Typography>
            </Box>
          </Box>

          <RiArrowDropRightLine size={50} color={"primary.main"} />
        </Box>
      </Link>
    </WidgetWrapper>
  );
};
