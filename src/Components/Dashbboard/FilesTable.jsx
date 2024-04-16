import { Box,  Collapse, Typography } from "@mui/material";

import React, { useState } from "react";
import { useTheme } from "@emotion/react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useFile } from "../Contexts/FileContext";

import SearchFiles from "./SearchFiles";
import PopOverMenu from "./PopOverMenu";


function CustomizedTables() {
  const { state } = useFile();
  const [openRowId, setOpenRowId] = useState(null);

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
          {state.uploadedFiles.map((row) => {
            return (
              <>
                <TableRow key={row.id}>
                  <TableCell
                    onClick={() =>
                      setOpenRowId(openRowId === row.id ? null : row.id)
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
                      {row.file.name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      setOpenRowId(openRowId === row.id ? null : row.id)
                    }
                    align="right"
                  >
                    {`${row.file.lastModifiedDate.getDate()} / ${
                      row.file.lastModifiedDate.getMonth() + 1
                    } / ${row.file.lastModifiedDate.getFullYear()}`}
                  </TableCell>
                  <TableCell
                    onClick={() =>
                      setOpenRowId(openRowId === row.id ? null : row.id)
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
                      Dr: khaled
                    </Typography>
                  </TableCell>
                 


                  <TableCell
                    onClick={() =>
                      setOpenRowId(openRowId === row.id ? null : row.id)
                    }
                    align="right"
                  >
                    Fall
                  </TableCell>

                  <TableCell align="right">
                    <PopOverMenu url={row.url} Filename={row.file.name} id={row.id}/>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openRowId === row.id}
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
                            name : {row.file.name}
                          </Typography>
                          <Typography
                            sx={{
                              width: "max-content",
                            }}
                            variant="subtitle2"
                            component="div"
                          >
                            Description : {row.Description}
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

const FilesTable = ( {NoSearch , Report}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100%",
        // height: 100%;
    width: "100%"

        //   p:"1rem"
      }}
    >
    {
      !NoSearch ? 
      <SearchFiles />
      :null
    }
      <Box
        sx={{
          boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
          background: theme.palette.background.paper,

          height: `${Report ?"99%" : "87%" }`,
          width: `${Report ?"97%" : "auto" }`,
          
          // height: ;
    // width: 
          // overflowY: "scroll",
          borderRadius: "9px",
        }}
      >
        <CustomizedTables />
      </Box>
    </Box>
  );
};

export default FilesTable;
