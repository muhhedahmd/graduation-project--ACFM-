import React, { useState } from "react";
import { useCourseContext } from "../Contexts/CourseContexts";
import { useUserContext } from "../Contexts/UserContexts";
import { Box, Collapse, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PopFile from "./PopFile";

export function CustomizedTables({ state, colors }) {
    const statex = Object.values(state);
  
    const { users } = useUserContext();
  
    const { MainDrawerCourse } = useCourseContext();
    const CurrSems =
      MainDrawerCourse?.semester === "1"
        ? "fall"
        : MainDrawerCourse?.semester === "2"
        ? "Spring"
        : "summer";
    const [openRowId, setOpenRowId] = useState(null);
    return (
      <TableContainer
        sx={{
          height: "100%",
          width:'100%'
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 700  ,width:"100%"}} aria-label="customized table">
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
              <TableCell align="right">Upload By</TableCell>
              <TableCell align="right">Semester</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              statex?.map((row) => {
                return (
                  <React.Fragment key={row?.id}>
                    <TableRow>
                      <TableCell
                        onClick={() =>
                          setOpenRowId(openRowId === row?.id ? null : row?.id)
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
                          {typeof row.file === "object" ? "Object" : row.file}
                        </Typography>
                      </TableCell>
  
                      <TableCell
                        onClick={() =>
                          setOpenRowId(openRowId === row?.id ? null : row?.id)
                        }
                        align="right"
                      >
                        {users
                          ?.filter((user) => user?.id === row?.user_id)
                          .map(
                            (filteredUser) =>
                              `${filteredUser?.first_name} ${filteredUser?.last_name}`
                          )}{" "}
                      </TableCell>
  
                      <TableCell align="right">{CurrSems}</TableCell>
  
                      <TableCell align="right">
                        <PopFile
                          url={row?.filename}
                          Filename={row.file}
                          fileId={row.id}
                        />
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
                                name : {row?.file}
                              </Typography>
                              <Typography
                                sx={{
                                  width: "max-content",
                                }}
                                variant="subtitle2"
                                component="a"
                              >
                                Url : {row?.filename}
                              </Typography>
                              <Typography
                                sx={{
                                  width: "max-content",
                                }}
                                variant="subtitle2"
                                component="div"
                              >
                                Description : {row?.description}
                              </Typography>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  