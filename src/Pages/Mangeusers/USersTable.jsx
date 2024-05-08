import React, {  useContext, useMemo, useState } from "react";
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
} from "@mui/material";
import PopOverMenu from "./PopOverMenu";
import { useEffect } from "react";
import axios from "axios";
import { SearchContext } from ".";

function CustomizedTables({ state ,  fetchData, }) {
  const [openRowId, setOpenRowId] = useState(null);
  const [childDrawer, setChildDrawer] = useState(null);

  const handleParentCollapse = (rowId) => {
    setOpenRowId(openRowId === rowId ? null : rowId);
  };

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
            position:"sticky",
            top:"0",
            bgcolor: "#ff5c00 !important",
            borderBottom: "3px solid #dedede",
          }}
        >
          <TableRow sx={{ bgcolor: "#fff" }}>
            <TableCell className="usersCell p-0" align="left">
              Name
            </TableCell>
            <TableCell className="usersCell" align="right">
              Last Active
            </TableCell>
            <TableCell className="usersCell" align="right">
              Create Date
            </TableCell>
            <TableCell className="usersCell" align="right">
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
              <TableRow sx={{p:"0"}}>
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
                  align="right"
                >
                  2021/2/10 at 5pm
                </TableCell>
                <TableCell
                  onClick={() => handleParentCollapse(row.id)}
                  sx={{ padding: "0" }}
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
                    {row?.creationDate}
                  </Typography>
                </TableCell>
                <TableCell
                  onClick={() => handleParentCollapse(row.id)}
                  sx={{ padding: "0" }}
                  align="right"
                >
                  {row.access}
                </TableCell>
                <TableCell align="right">
                  <PopOverMenu  fetchData={fetchData} {...row} />
                </TableCell>
              </TableRow>

              {/* <TableRow sx={{p:0}}>
                <TableCell

                  style={{ width:"100%" ,p: 0 }}
                  colSpan={5}
                >
                  <Collapse
                     sx={{
                        width:"100%"
                      }}
                    in={openRowId === row.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    {courseDetails.map((course) => (
                      <Box
                        key={course.id}
                        sx={{
                          width:"100%",
                          display: "flex",
                          flexDirection: "column",
                          padding: "0",
                          borderBottom: "1px solid #c6c3c3",

                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box
                          sx={{
                            padding: "1rem",
                            backgroundColor: "#f5f5f5",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            gutterBottom
                            component="div"
                          >
                            Additional Details
                            {course.name} - {course.code}
                          </Typography>
                          <ArrowRightAltOutlined
                            onClick={() => handleChildCollapse(course.id)}
                          />
                        </Box>
                        <Collapse
                      sx={{
                        width:"100%"
                      }}
                          in={childDrawer === course.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              display: "flex",
                              backgroundColor: "#f5f5f5",
                              borderTop: "1px solid #c6c3c3",
                              width:"100%",
                              padding: "1rem",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            <Box  sx={{
                              display:"flex",
                              flexDirection:"column"
                            }}>
                              <Typography
                                sx={{
                                  fontSize: ".9rem",
                                  fontWeight: "bold",
                                }}
                                variant="body1"
                                gutterBottom
                                component="div"
                              >
                                Name: {course.name}
                              </Typography>
                            <Typography
                              sx={{
                                fontSize: ".9rem",
                                fontWeight: "bold",
                              }}
                              variant="body1"
                              gutterBottom
                              component="div"
                            >
                              Code: {course.code}
                            </Typography>
                            </Box>

                            <Box  sx={{
                              display:"flex",
                              flexDirection:"column"
                            }}>
                              <Typography
                                sx={{
                                  fontSize: ".9rem",
                                  fontWeight: "bold",
                                }}
                                variant="body1"
                                gutterBottom
                                component="div"
                              >
                                status: {course.status}
                              </Typography>
                            <Typography
                              sx={{
                                fontSize: ".9rem",
                                fontWeight: "bold",
                              }}
                              variant="body1"
                              gutterBottom
                              component="div"
                            >
                              semester: {course.semester}
                            </Typography>
                            </Box>
                            <Box  sx={{
                              display:"flex",
                              flexDirection:"column"
                            }}>
                              <Typography
                                sx={{
                                  fontSize: ".9rem",
                                  fontWeight: "bold",
                                }}
                                variant="body1"
                                gutterBottom
                                component="div"
                              >
                                by Law: {course.byLaw}
                              </Typography>
                            <Typography
                              sx={{
                                fontSize: ".9rem",
                                fontWeight: "bold",
                              }}
                              variant="body1"
                              gutterBottom
                              component="div"
                            >
                              hasPractical: {course.hasPractical? "Yes": "No"}
                            </Typography>
                            </Box>
                            <Box  sx={{
                              display:"flex",
                              flexDirection:"column"
                            }}>
                              <Typography
                                sx={{
                                  fontSize: ".9rem",
                                  fontWeight: "bold",
                                }}
                                variant="body1"
                                gutterBottom
                                component="div"
                              >
                                Course Level: {course.courseLevel}
                              </Typography>
                            <Typography
                              sx={{
                                fontSize: ".9rem",
                                fontWeight: "bold",
                              }}
                              variant="body1"
                              gutterBottom
                              component="div"
                            >
                              Credit Hours: {course.creditHours}
                            </Typography>
                            </Box>
                            <Box  sx={{
                              display:"flex",
                              flexDirection:"column"
                            }}>
                              <Typography
                                sx={{
                                  fontSize: ".9rem",
                                  fontWeight: "bold",
                                }}
                                variant="body1"
                                gutterBottom
                                component="div"
                              >
                                Assigned: Dr:khaled
                              </Typography>
                            <Typography
                              sx={{
                                fontSize: ".9rem",
                                fontWeight: "bold",
                              }}
                              variant="body1"
                              gutterBottom
                              component="div"
                            >
                                Assigned: mohamed
                            </Typography>
                            </Box>
                 
                          </Box>
                        </Collapse>
                      </Box>
                    ))}
                  </Collapse>
                </TableCell>
              </TableRow> */}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const UsersTable = ({ Report    } ) => {

  const { searchResults } = useContext(SearchContext);
  const [UserState, setUserState] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://optima-software-solutions.com/apis/usershow.php");
      return response.data;
    } catch (error) {
      console.error('Error:', error.message);
      return [];
    }
  };
  
  const applySearchFilter = (data, searchValue) => {
    if (!searchValue) return data;
  console.log(data, searchValue)
    const regex = new RegExp(searchValue, 'ig'); // Case insensitive regex
    return data.filter((user) => 
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
  return(

  <Box sx={{ overflow: "hidden", height: "100%", width: "100%" }}>
    <Box
      sx={{
        boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
        height: `${Report ? "99%" : "87%"}`,
        width: `${Report ? "97%" : "auto"}`,
        borderRadius: "9px",
      }}
    >

      <CustomizedTables  fetchData={fetchData} state={UserState} />
    </Box>
  </Box>
)

};

export default UsersTable;
