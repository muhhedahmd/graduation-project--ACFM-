import React, {  useEffect, useState } from 'react'
import {Box,  FormGroup, Input} from '@mui/material'


import { Link } from 'react-router-dom'
import Btn from '../../Components/Btn'


const ManageUserHeader = ( {setSearchResults} ) => {
  const [ InpVal,  setInpVal] = useState()
  useEffect(()=>{
    setSearchResults(InpVal)
  },[InpVal, setSearchResults])

  return (
    <Box
    sx={{
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      gap:"3rem",
      width:"100%",
      
    }}
    >
  <form
  style={{
    width:"100%"
  }}
  >
    <FormGroup>
  
    <Input
    onChange={(e)=>setInpVal(e.target.value)}
    type='text'
    id='Search'
    label="Search"
      fullWidth
      placeholder='Search by name or email...'
     aria-required={true}
    />
    </FormGroup>
  </form>
  <Btn 
  padding={".7rem 1rem"}
  width='17em'
  >
    <Link
    style={{
      width:"max-content",
      textDecoration:"none",
      color:"#fff"

    }}
    to={"/CreateUser"}
    >
    Add User +

    </Link>  
  </Btn>





    </Box>

  )
}
export default ManageUserHeader