import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  List,
  ListItem,
} from "@mui/material";
import PopOverMenu from "./PopOverMenu";
import { SearchContext } from ".";
import { useImage } from "../../Components/Contexts/ImageViewrContex";
import axios from "axios";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
function CustomizedTables({ state, fetchData }) {
  const { setShowImage } = useImage();
  const [openRowId, setOpenRowId] = useState(null);
  const [childDrawer, setChildDrawer] = useState(null);
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

  const handleChildCollapse = (courseId) => {
    setChildDrawer(childDrawer === courseId ? null : courseId);
  };

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
            position: "sticky",
            top: "0",
            bgcolor: "#ff5c00 !important",
            borderBottom: "3px solid #dedede",
          }}
        >
          <TableRow sx={{ bgcolor: "#fff" }}>
            <TableCell className="usersCell " align="left">
              Name
            </TableCell>
            <TableCell sx={{width:"6rem"}} className="usersCell" align="center">
              Phone number
            </TableCell>
            <TableCell className="usersCell" align="center">
              Resmu
            </TableCell>
            <TableCell className="usersCell" align="center">
              Profile Image
            </TableCell>
            <TableCell className="usersCell" align="center">
              Creation date
            </TableCell>
            <TableCell className="usersCell" align="center">
              Role
            </TableCell>
            <TableCell className="usersCell" align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ height: "10vh" }}>
          {state?.map((row) => (
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
                  onClick={() =>{
                    setShowImage(row.resume)
                     handleParentCollapse(row.id)}}
              
                  sx={{ padding: "0" , cursor:"pointer" }}
                  align="center"                >
                  Show
                </TableCell>
                <TableCell
                  onClick={() => {
                    setShowImage(row.avatar);
                    handleParentCollapse(row.id)}}
           
                  sx={{ padding: "0" }}
                  align="center"                >
                  {'Show Image'}
                </TableCell>
                <TableCell
                  onClick={() => handleParentCollapse(row.id)}
                  sx={{ padding: "0" }}
                  align="center"                >
                  {row.phone_number}
                </TableCell>
                <TableCell
                  onClick={() => handleParentCollapse(row.id)}
                  sx={{ padding: "0" }}
                  align="center"                >
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
                  align="center"                >
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
                    width: "300%",
                  }}
                  in={openRowId === row.id}
                  timeout="auto"
                >

                  <List disablePadding sx={{  width: "100%" }}>
                    {Courses?.map((course) => {
                      return (
                        <ListItem

                        disablePadding
                        onClick={()=>handleChildCollapse(course.courseid)}
                          sx={{
                            padding:"0",
                            borderBottom:"2px solid #cedede",
                            flexDirection:"column",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                          key={course.courseid}
                        >
                          <Box

                              sx={{
                            cursor:"pointer",

                                padding:".5rem",
                                bgcolor:"#c1bbbb1c",
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography>
                              Course Name {course.coursename}
                            </Typography>

                            <ArrowBackIosIcon
                              sx={{
                                transition:".3s",
                                transform: `rotate(${childDrawer === course.courseid ? '-90deg' :0})`,
                                fontSize: "1.7rem",
                                color: "#919191",
                              }}
                            />
                          </Box>
                          <Collapse
                            sx={{
                              bgcolor:"#2c2c2c00",
                              width:"100%"
                            }}
                           in={childDrawer === course.courseid}
                          >
                          <Box
                          sx={{
                            display:"flex",
                            justifyContent:"space-around",
                            alignItems:"center",
                            width:"100%",
                            padding:".5rem .5rem .5rem .5rem"
                          }}
                          >

                            <Box>
                              <Typography>bylaw :
                               {course?.bylaw}
                               
                               </Typography>
                              <Typography>level :{course?.level}</Typography>
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
                              <Typography>status :{course?.status}</Typography>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const UsersTable = ({ Report }) => {
  const { searchResults } = useContext(SearchContext);
  const [UserState, setUserState] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://optima-software-solutions.com/apis/usershow.php"
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      return [];
    }
  };

  const applySearchFilter = (data, searchValue) => {
    if (!searchValue) return data;
    const regex = new RegExp(searchValue, "ig"); // Case insensitive regex
    return data.filter(
      (user) =>
        regex.test(user.first_name) ||
        regex.test(user.last_name) ||
        regex.test(user.email)
    );
  };

  useEffect(() => {
    const fetchDataAndFilter = async () => {
      const responseData = await fetchData();
      const filteredData = applySearchFilter(responseData, searchResults);
      setUserState(filteredData);
    };

    fetchDataAndFilter();
  }, [searchResults]);

  return (
    <Box sx={{ overflow: "hidden", height: "100%", width: "100%" }}>
      <Box
        sx={{
          boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
          height: `${Report ? "99%" : "87%"}`,
          width: `${Report ? "97%" : "auto"}`,
          borderRadius: "9px",
        }}
      >
        <CustomizedTables fetchData={fetchData} state={UserState} />
      </Box>
    </Box>
  );
};

export default UsersTable;
