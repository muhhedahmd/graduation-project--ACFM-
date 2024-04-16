import { Box, Button, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";

const InfoSection = ({ Title, info }) => {
  const [CollapseCourse, setCollapseCourse] = useState(false);
  return (
    <>
      {Title === "Courses :" ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            role="button"
            onClick={() => setCollapseCourse((prev) => !prev)}
            sx={{
              textAlign: "start",
              // alignSelf:"flex-start",
              color: "#111",
              minWidth: "7rem",
              alignSelf: " center",
            }}
            variant="subtitle1"
            component={"p"}
          >
            {Title}
          </Typography>

          <Collapse 
          
          in={CollapseCourse} about="">
            <Box
              sx={{
                borderRadius: "6px",
                border: "1px solid #d3d3d3",
                padding: ".5rem",
                overflow: "auto",
                maxWidth: "12rem",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: ".5rem",
                flexWrap: "wrap",
              }}
            >
              {info.map((item, i) => {
                return (
                  <Typography
                    key={i}
                    variant="subtitle2"
                    component={"p"}
                    color={"#333"}
                    sx={{
                      textAlign: "start",
                      alignSelf: "flex-start",
                      minWidth: "8rem",
                    }}
                  >
                    {item}
                  </Typography>
                );
              })}
            </Box>
          </Collapse>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "start",
              // alignSelf:"flex-start",
              color: "#111",
              minWidth: "7rem",
              alignSelf: " center",
            }}
            variant="subtitle1"
            component={"p"}
          >
            {Title}
          </Typography>

          <Typography
            variant="subtitle2"
            component={"p"}
            color={"#333"}
            sx={{
              textAlign: "start",
              alignSelf: "flex-start",
              minWidth: "8rem",
            }}
          >
            {info}
          </Typography>

          {Title === "Password :" ? (
        <Button
          sx={{
            py: ".2rem",
            ml: "-60px",
            border: "2px solid #ff5c00",
            color: " #ff5c00",
            backgroundColor: "#ffff",
            boxShadow: "none",
            ":hover": {
              backgroundColor: "#ffff",
              boxShadow: "none",
            },
          }}
          role={"button"}
          variant="contained"
          component="label"
        >
          Change
        </Button>
      ) : (
        ""
      )}
        </Box>
      )}

   
    </>
  );
};

export default InfoSection;
