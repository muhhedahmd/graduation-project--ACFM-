import React from 'react'
import {Box, Button, FormGroup, Input, SvgIcon} from '@mui/material'

import { Sort } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import Btn from '../../Components/Btn'

const ManageUserHeader = () => {
  const theme = useTheme()
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

  <Button
  // color=''
  sx={{
    padding:".7rem",
  color:`${theme?.palette?.primary?.paper}`

  }}

  startIcon={
    <SvgIcon>
        <Sort
        fontSize='1.7rem !important'
        sx={{
        fontSize:'2rem !important',

          color:`${theme?.palette?.primary?.paper}`
        }}

        />
    </SvgIcon>
  }
  >

  </Button>



    </Box>

  )
}

export default ManageUserHeader