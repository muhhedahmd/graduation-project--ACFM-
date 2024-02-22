import styled from "@emotion/styled";
import { Box, Button, List, ListItem } from "@mui/material";



export const StyledMainDrawer = styled(Box)(({theme , isExpand })=>{
    return {
     
        '.isNotExpandText':{
            transition:".3s",
            // transform:`translateX(${!isExpand?"100%":"0"})`,
            visibility:"hidden",
            opacity:"0",
            display:"none",

        },
        '.isNotExpandIcon':{
            transition:".3s",
            // transform:`translateX(${!isExpand?"100%":"0"})`,
            visibility:"hidden",
            opacity:"0",
            display:"none",

        },
        'p':{
            transition:".3s",

        }
    
    
    
    }
        
        
     

})

export const SoloIconDrawer = styled(Box)(({theme , isExpand })=>{
    return {
     
        '.isNotExpandText':{
            transition:".3s",
            // transform:`translateX(${!isExpand?"100%":"0"})`,
            visibility:"hidden",
            opacity:"0",
            display:"none",

        },
        '.isNotExpandIcon':{
            transition:".3s",
            // transform:`translateX(${!isExpand?"100%":"0"})`,
            visibility:"hidden",
            opacity:"0",
            display:"none",

        },
        'p':{
            transition:".3s",

        }
    
    
    
    }
        
        
     

})
export const StyledBtnFlexCenter = styled(Button)(({theme , isExpand })=>{

        if(!isExpand){
            return{
                transition:".5s",
                transitionDelay:".2s",

                width:"100%",
                justifyContent:"center",
                display:"flex",
                alignItems:"center",
                margin:".8rem 0 ",
                padding:".75rem 0 "
                ,gap:".5rem",
                color:"#fff",

            }
        }
        else {
            return{
                transitionDelay:".2s",
                padding:"0",
                margin:".8rem 0  ",

                transition:".5s",
                
                display:"flex",
                justifyContent:"flex-start",
                alignItems:"center"
                ,gap:".5rem",
                color:"#fff"
            }
        }
     

})
export const StyledCollapse = styled(List)(({theme , isExpand })=>{

      return {position:"relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "11rem",
        borderRadius: "10px",
        backgroundColor:theme.palette.secondary.main,

        '&:before':{
            content:'""',
            position:"absolute",
            top:"0"
            ,left:"0px",
            height:"calc( 100% - 0px)",
            width:".5rem",
            borderRadius:"10px 0 0 10px",
            background: "linear-gradient(45deg, #fff0e6, #ff5c00)",

        },


        'li':{

            padding:".2rem  0 0 1rem"
        }


      }

})