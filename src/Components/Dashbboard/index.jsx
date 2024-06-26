import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect} from "react";
import FilesTable from "./FilesTable";
import UploadAndDeleteSection from "./UploadAndDeleteSection";
import Watch from "./Watch";
import { useTheme } from "@emotion/react";
import UseAuth from "../Contexts/Authantication";
import { useCourseContext } from "../Contexts/CourseContexts";
import { useFileContext } from "../Contexts/FileCourseContext";
import { UserProvider } from "../Contexts/UserContexts";

const Dashbboard = ({ page }) => {
  const { Data } = UseAuth();
  const { MainDrawerCourse } = useCourseContext();
  const { FetchFilesOFCatagory, state  }=useFileContext()
  useEffect(()=>{
 
    FetchFilesOFCatagory(Data?.user?.id, MainDrawerCourse?.courseid, page)

  },[Data?.user?.id, FetchFilesOFCatagory, MainDrawerCourse?.courseid, page])


  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        overflow: "hidden",
        maxHeight: "85vh",
        // margin:"1rem 0  0 0 ",
        borderRadius: "4px",
        flexDirection: "row",
        height: "-webkit-fill-available",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: `${isSm ? "100%" : "75%"}`,
        }}
      >
        <Box
          sx={{
            height: "100%",

            m: `${isSm ? "0" : "0 1rem 0 0 "}`,
          }}
        >
          <FilesTable page={page} state={state.uploadedFiles? state.uploadedFiles  : []} />
        </Box>
      </Box>

      <Box
        sx={{
          margin: "0 0  0 .4rem",

          flexDirection: "column",
          display: `${isSm ? "none" : "flex"}`,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          height: "100%",
          width: "25%",
        }}
      >
        <Watch FileState={state?.uploadedFiles} page={page} />
        <UserProvider>

        <UploadAndDeleteSection FileState={state?.uploadedFiles} page={page} />
        </UserProvider>
      </Box>
    </Box>
  );
};

export default Dashbboard;
