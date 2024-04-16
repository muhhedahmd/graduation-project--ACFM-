import { Box,List, ListItem, Typography } from '@mui/material'
import React from 'react'

const InfoUSerSemester = () => {
  return (
    <Box
            sx={{
              backgroundColor:" #fff",
    boxShadow: '3px 3px 3px #dedede',
    height:" calc(100vh - 17vh)",
    width:" 33vw",
    margin: "1.5rem 1.6rem 0 0",
    borderRadius: "6px",
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "column" ,
    alignItems:"flex-start",
    padding:".5rem"
            }}
          >

      <Typography
      sx={{
        width:"100%",
        padding:".3rem .5rem",
        bgcolor:"#dedede",
        textAlign:"start",
        margin:"0 0 .5rem 0 "
      }}
      variant='h6'
      component={"div"}
      >
      Semester
        </Typography>
      <Typography
      variant='h6'
      component={"div"}
      >
      Khaled Elmenshay
      </Typography>
      <List
           
      >
      <ListItem
      sx={{
        padding:".2rem"
      }}
      disablePadding
      >
    <Typography
     variant='body1'
      component={"div"}
    >

      courses:
    </Typography>
      </ListItem>

      </List>


          </Box>
  )
}

export default InfoUSerSemester