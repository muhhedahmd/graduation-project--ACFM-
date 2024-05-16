import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import UseAuth from '../../Components/Contexts/Authantication'
import { useUserContext } from '../../Components/Contexts/UserContexts'

const HeaderProfile = () => {
    const {Data} = UseAuth()
    const {users} = useUserContext()
    const AvatarImg = users.find((item)=>item.id === Data?.user?.id ? item?.avatar : null)?.avatar || ""

  return (
   <Box
   sx={{
    position:"relative",

    height:"20vh",
    width:"100%",
    backgroundColor:" #FBAB7E",
backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",

   }}
   >
    <Box
    sx={{
        padding:"1rem",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        borderRadius:"7px",
        width:"95%",
        position:"absolute",
        top:"75%",
        height:"20vh",
        boxShadow:"3px 3px 4px #3434",
        bgcolor:"#fff",
        left:"50%",
        transform:"translate(-50% , -50%)"
    }}
    >
    <Box
    sx={{
        
            flexDirection:"row",
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            gap:".7rem"

    }}
    className='nameAndImage'
    >

        <Avatar
        sx={{
            width:"5rem",
            height:"5rem",
            
        }}
        >
        <img src={AvatarImg}
        style={{
            maxWidth:"100%"
        }}
         alt="profile" />

        </Avatar>
        <Box
        sx={{
            display:"flex",
            alignItems:"flex-start",
            flexDirection:"column",
        }}
        
        >

        <Typography
        sx={{
            
            fontWeight:"800"
        }}
        variant='subtitle1'
        component={"p"}
        >
        {
                Data.user.access === "Instructor" ? "Dr:"
                                     :         Data.user.access === "Staff" ?"Eng :"
                                     :""
        }


   {Data.user.first_name+ " " + Data.user.last_name}


        </Typography>
        <Typography
        sx={{

            fontWeight:"800"
        }}
        variant='subtitle1'
        component={"p"}
        >
   
{Data.user.email}

        </Typography>
        <Typography
        sx={{

            fontWeight:"800"
        }}
        variant='subtitle1'
        component={"p"}
        >


        {Data.user.access}
        </Typography>
        </Box>
    </Box>

    <Box
    
    
    >



    </Box>
  

        
    </Box>
   </Box>
  )
}

export default HeaderProfile