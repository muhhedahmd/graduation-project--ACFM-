import { Box, Button, styled } from "@mui/material";



export const StyledOptionButton = styled(Button)(({colorTheme})=>{
    return{
        fontSize:".9rem", 
        padding:".2rem 1rem",

            backgroundColor:" #ffff",
            color:colorTheme,
          border: "2px solid "+colorTheme,
          
          
          
          
          ':hover':{
            backgroundColor:colorTheme,
            color:"#fff",
          },
    }
})


export const  WrapperFlexBox=styled(Box)(({gap = ".5rem"})=>{
  return{
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    gap:gap
  }
})