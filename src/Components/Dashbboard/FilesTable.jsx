import { Box, Collapse, Typography } from "@mui/material";

import React, { useState } from "react";
import { useTheme } from "@emotion/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import SearchFiles from "./SearchFiles";
import UseAuth from "../Contexts/Authantication";
import { useCourseContext } from "../Contexts/CourseContexts";
import PopFile from "./PopFile";

function CustomizedTables({ state, colors }) {
  const { Data } = UseAuth();
  const { MainDrawerCourse } = useCourseContext();
  console.log("state", MainDrawerCourse);
  const [openRowId, setOpenRowId] = useState(null);
  console.log(state)
  return (
    <TableContainer
      sx={{
        height: "100%",
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead
          sx={{
            bgcolor: colors?.bgColor ? colors.bgColor : "#fff",
            borderBottom: "3px solid #ff5c00",
          }}
        >
          <TableRow
            sx={{
              bgcolor: "#fff",
            }}
          >
            <TableCell
              sx={{
                width: "1rem",
                bgcolor: "#fff",
              }}
              align="left"
            >
              Name
            </TableCell>
            <TableCell align="right">Upload Date</TableCell>
            <TableCell align="right">Upload By</TableCell>
            <TableCell align="right">Semester</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {state&& state?.map((row) => {
            return (
              <>
                <TableRow key={row.id}>
                  <TableCell
                    onClick={() =>
                      setOpenRowId(
                        openRowId === row.id ? null : row.id
                      )
                    }
                    component="th"
                    scope="row"
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxWidth: "10rem",
                      }}
                    >
                      testPdf.pdf
                    </Typography>
                  </TableCell>

                  <TableCell
                    onClick={() =>
                      setOpenRowId(
                        openRowId === row.id ? null : row.id
                      )
                    }
                    align="right"
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxWidth: "10rem",
                      }}
                    >
                      Dr: {Data.user.first_name}
                      {Data?.user?.last_name}
                    </Typography>
                  </TableCell>

                  <TableCell
                    onClick={() =>
                      setOpenRowId(
                        openRowId === row?.id ? null : row?.id
                      )
                    }
                    align="right"
                  >
                    Dr: {Data.user.first_name}
                    {Data?.user?.last_name}
                  </TableCell>

                  <TableCell align="right">{MainDrawerCourse?.semester === "1"  ?"fall" : MainDrawerCourse?.semester === "2" ? "Spring": "summer"} </TableCell>

                  <TableCell align="right">
                  <PopFile url={row.filename} Filename={'pdfjs.pdf'} fileId={row.id}/>

                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRowId === row?.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",

                          margin: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body1"
                            gutterBottom
                            component="div"
                          >
                            Additional Details
                          </Typography>

                          <Typography
                            sx={{
                              width: "max-content",
                            }}
                            variant="subtitle2"
                            component="div"
                          >
                            name : Pdftest{row.filenfilename}.pdf{"ss".substring(10,)}
                          </Typography>
                          <Typography
                            sx={{
                              width: "max-content",
                            }}
                            variant="subtitle2"
                            component="a"
                          >
                            Url : {row.filename}
                          </Typography>
                          <Typography
                            sx={{
                              width: "max-content",
                            }}
                            variant="subtitle2"
                            component="div"
                          >
                            Description : {row.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            );
          })} 
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const FilesTable = ({ NoSearch, Report, colors ,state}) => {
  const theme = useTheme();
  const [searchItems, setSearchItems] = useState(null);
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      {!NoSearch ? <SearchFiles  setSearchItems={setSearchItems} /> : null}
      <Box
        sx={{
          boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
          background: theme.palette.background.paper,

          height: `${Report ? "99%" : "88%"}`,
          width: `${Report ? "97%" : "auto"}`,
          borderRadius: "9px",
        }}
      >
        <CustomizedTables
          colors={colors}
          state={searchItems ? searchItems : state}
        />
      </Box>
    </Box>
  );
};

export default FilesTable;
