import {
  Box,
} from "@mui/material";

import React, {  } from "react";
import { useTheme } from "@emotion/react";


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete, Edit,  } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useFile } from "../Contexts/FileContext";
import { useRef } from "react";
import SearchFiles from "./SearchFiles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,

  },
  '& .css-15wf72z-MuiTableCell-root.MuiTableCell-head':
  {
    background:"#fff",
    color:grey[400]
  },
  '.css-1udbg1u-MuiTableCell-root.MuiTableCell-head':{
    
    background:"#fff",
    color:grey[400]
  }
}));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

  function CustomizedTables() {
  const {  state} = useFile()

  const collapseRef = useRef()

  return (
    <TableContainer 
    sx={{
      height:"100%"
    }}
    component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead
        sx={{
          borderBottom: "3px solid #ff5c00",
}
        
        }
        >
          <TableRow 
          sx={{
            bgcolor:"#fff"
          }}
          >
            <StyledTableCell
            sx={{
              width:"1rem",
              bgcolor:"#fff"
            }}
             align="left">Name</StyledTableCell>
            <StyledTableCell align="right">Upload Date</StyledTableCell>
            <StyledTableCell align="right">Upload By</StyledTableCell>
            <StyledTableCell align="right">Semester</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.uploadedFiles.map((row) => {
            console.log(row)
            return(

            
            <>

            <StyledTableRow
            id={row.id}
            onClick={()=>{
              console.log(collapseRef.current.id)
          
          }}

             key={row.id}>
              <StyledTableCell component="th" scope="row">
                     
             { row.file.name}
                        </StyledTableCell>
              <StyledTableCell align="right">
              {`${row.file.lastModifiedDate.getDate()} /${row.file.lastModifiedDate.getMonth() + 1} /${row.file.lastModifiedDate.getFullYear()}`}
               </StyledTableCell>
              <StyledTableCell align="right">
                {}
              </StyledTableCell>
              <StyledTableCell align="right">Fall</StyledTableCell>
              <StyledTableCell align="right">

                <Delete 
                fontSize="small"
                sx={{
                  m:" 0 .2rem"
                }}

                />
                <Edit
                fontSize="small"

                />
              </StyledTableCell>
        
            </StyledTableRow>
            
            {/* <Collapse
            id={row.id}
            ref={collapseRef}
            
            >
            <StyledTableRow>
            
       
              <StyledTableCell align="right">
              1 / 9 /2021
               </StyledTableCell>
              
            </StyledTableRow>
            </Collapse> */}
            </>
            )

          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const FilesTable = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        overflow: "hidden",
        height:"100%"
        //   p:"1rem"
      }}
    >

<SearchFiles/>
      <Box
        sx={{
          boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
          background: theme.palette.background.paper,
          height: "86%",
          // overflowY: "scroll",
    borderRadius: "9px",



        }}

      >
<CustomizedTables/>

      </Box>
    </Box>
  );
};

export default FilesTable;
