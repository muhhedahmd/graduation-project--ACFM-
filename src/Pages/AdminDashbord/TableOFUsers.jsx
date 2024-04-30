import { Box } from '@mui/material'
import React from 'react'
import TableOfUSersCard from './TableOfUSersCard'

const TableOFUsers = () => {
  return (
    <Box

    padding={"1rem"}
    sx={{width:"100%",
    bgcolor:"#fff",
boxShadow:"3px 3px 4px #dedede",
      display:"flex" , 
    flexDirection:"column" , justifyContent:"flex-start" , alignItems:"center"}}
    >
    <TableOfUSersCard border={"#FF4F0F"} name={"name"} email={"email" } role={"role"}  type={"type"} optionText={"option"}/>
    <TableOfUSersCard  border={"#333"} role={"instractor"} name={"Khaled mohamed"} email={"123@gmail.com"} type={"منتدب"}   option={"option"}/>
    <TableOfUSersCard  border={"#333"} role={"Staff"} name={"mohamed ahmed"} email={"kaooaoa@gmail.com"} type={""}   option={"option"}/>
    <TableOfUSersCard  border={"#333"} role={"Staff"} name={"mohamed ahmed"} email={"kaooaoa@gmail.com"} type={""}   option={"option"}/>
    </Box>
  )
}

export default TableOFUsers