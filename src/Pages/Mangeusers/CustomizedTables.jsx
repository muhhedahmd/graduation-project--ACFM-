import {
  Box,
  Button,
  Collapse,
  Divider,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PopOverMenu from "./PopOverMenu";
import { useState } from "react";
import { useImage } from "../../Components/Contexts/ImageViewrContex";
import { useEffect } from "react";
import axios from "axios";
import React from "react";

export function CustomizedTables({ state, fetchData }) {
  const { setShowImage } = useImage();
  const [openRowId, setOpenRowId] = useState(null);
  const [childDrawer] = useState(null);
  const [Courses, setCourses] = useState([]);

  const handleParentCollapse = (rowId) => {
    setOpenRowId(openRowId === rowId ? null : rowId);
  };
  useEffect(() => {
    const fetchUSerCourses = async () => {
      console.log(openRowId);
      await axios
        .get(
          `http://optima-software-solutions.com/apis/courseshow.php?userid=${openRowId}`
        )
        .then((res) => setCourses(res.data))
        .catch((err) => console.log(err.response));
    };
    fetchUSerCourses();
  }, [openRowId]);

  return (
    <TableContainer
      sx={{
        width: "100%",
        height: "100%",
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead
          sx={{
            position: "sticky",
            top: "0",
            bgcolor: "#fff !important",
            borderBottom: "3px solid #ff5c00",
          }}
        >
          <TableRow sx={{ bgcolor: "#fff" }}>
            <TableCell
              sx={{
                color: "#111",

                bgcolor: "#fff !important",
                borderBottom: "3px solid #ff5c00",
              }}
              className="usersCell "
              align="left"
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                color: "#111",

                width: "6rem",
                bgcolor: "#fff !important",
                borderBottom: "3px solid #ff5c00",
              }}
              className="usersCell"
              align="center"
            >
              Phone number
            </TableCell>
            <TableCell
              sx={{
                color: "#111",

                width: "6rem",
                bgcolor: "#fff !important",
                borderBottom: "3px solid #ff5c00",
              }}
              className="usersCell"
              align="center"
            >
              Resmu
            </TableCell>
            <TableCell
              sx={{
                color: "#111",

                width: "6rem",
                bgcolor: "#fff !important",
                borderBottom: "3px solid #ff5c00",
              }}
              className="usersCell"
              align="center"
            >
              Profile Image
            </TableCell>
            <TableCell
              sx={{
                color: "#111",

                width: "6rem",
                bgcolor: "#fff !important",
                borderBottom: "3px solid #ff5c00",
              }}
              className="usersCell"
              align="center"
            >
              Creation date
            </TableCell>
            <TableCell
              sx={{
                color: "#111",

                width: "6rem",
                bgcolor: "#fff !important",
                borderBottom: "3px solid #ff5c00",
              }}
              className="usersCell"
              align="center"
            >
              Role
            </TableCell>
            <TableCell
              sx={{
                color: "#111",
                width: "6rem",
                bgcolor: "#fff !important",
                borderBottom: "3px solid #ff5c00",
              }}
              className="usersCell"
              align="right"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ height: "10vh" }}>
          {state?.map(
            (row) =>
              (row.access === "instructor" || row.access === "Staff") && (
                <React.Fragment key={row.id}>
                  <TableRow sx={{ p: "0 !important" }}>
                    <TableCell
                      sx={{ pr: "0" }}
                      onClick={() => handleParentCollapse(row.id)}
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
                        {row.first_name} {row.last_name}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          color: "#43433352",
                          fontSize: " .9rem",
                          display: "-webkit-box",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          maxWidth: "10rem",
                        }}
                      >
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => handleParentCollapse(row.id)}
                      sx={{ padding: "0" }}
                      align="center"
                    >
                      {row.phone_number}
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setShowImage(row.resume);
                      }}
                      sx={{ padding: "0", cursor: "pointer" }}
                      align="center"
                    >
                    <Button>

                      Show
                    </Button>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        setShowImage(row.avatar);
                      }}
                      sx={{ padding: "0" }}
                      align="center"
                    >
                    <Button>

                      {"Show"}
                    </Button>
                    </TableCell>
                    <TableCell
                      onClick={() => handleParentCollapse(row.id)}
                      sx={{ padding: "0" }}
                      align="center"
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
                        {row?.creation_date}
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => handleParentCollapse(row.id)}
                      sx={{ padding: "0" }}
                      align="center"
                    >
                      {row.access}
                    </TableCell>
                    <TableCell align="right">
                      <PopOverMenu fetchData={fetchData} {...row} />
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ padding: "0 !important", margin: "0" }}>
                    <Collapse
                      sx={{
                        padding: "0",
                        width: "335%",
                      }}
                      in={openRowId === row.id}
                      timeout="auto"
                    >
                      <List disablePadding sx={{ width: "100%" }}>
                        {Courses?.map((course) => {
                          return (
                            <ListItem
                              disablePadding
                              // onClick={()=>handleChildCollapse(course.courseid)}
                              sx={{
                                padding: "0",
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                              }}
                              key={course.courseid}
                            >
                              <Box
                                sx={{
                                  cursor: "pointer",

                                  padding: ".5rem",
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography variant="h6" component={"p"}>
                                  Course Name {course.coursename}
                                </Typography>
                              </Box>
                              <Divider sx={{ width: "100%" }} />
                              <Collapse
                                sx={{
                                  bgcolor: "#2c2c2c00",
                                  width: "100%",
                                }}
                                in={childDrawer === course.courseid}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    width: "100%",
                                    padding: ".5rem .5rem .5rem .5rem",
                                  }}
                                >
                                  <Box>
                                    <Typography>
                                      bylaw :{course?.bylaw}
                                    </Typography>
                                    <Typography>
                                      level :{course?.level}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography>
                                      credit hour : {course?.credit_hour}
                                    </Typography>
                                    <Typography>
                                      practical :{course?.practical}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography>
                                      Total Mark : {course?.classwork}
                                    </Typography>
                                    <Typography>
                                      general :{course?.general}
                                    </Typography>
                                  </Box>

                                  <Box>
                                    <Typography>
                                      semester :{" "}
                                      {course?.semester === "1"
                                        ? "Fall"
                                        : course?.semester === "2"
                                        ? "Spring"
                                        : "Summer"}
                                    </Typography>
                                    <Typography>
                                      status :{course?.status}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Collapse>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </TableRow>
                </React.Fragment>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
