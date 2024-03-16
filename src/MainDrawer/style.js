import styled from "@emotion/styled";
import { Box, Button, List } from "@mui/material";



export const StyledMainDrawer = styled(Box)(({theme , isexpand  , isMD , area})=>{
    if(isMD || area === 'Menudrawer'){
        return {
            position:'relative',
            zIndex:10,

            overflow: "hidden",
            padding: "1rem",
            width: "100%",
            height: "100vh",
            borderRadius:"0",
            margin:"0",
            backgroundColor: theme.palette.primary.main,

        }
    }
    else{

        

        return{
            zIndex:"1000",
            top:"-7vh",
            borderRight: "3px solid #ff5c00",
            position:'relative',
            // zIndex:10,

            overflow:"hidden",
            transition: ".4s",
            padding: "1rem",
            width: `${!isexpand ? "17rem" : "9rem"}`,
            
            height: "100vh",
            backgroundColor: theme.palette.primary.main,
        }

    }
 
   
        
     

})


export const StyledBtnFlexCenter = styled(Button)(({theme , isexpand })=>{

        if(!isexpand){
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
                // transitionDelay:".2s",
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
export const StyledCollapse = styled(List)(({theme , isexpand })=>{

      return {position:"relative",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        width: "100%",
        borderRadius: "10px",
        backgroundColor:theme.palette.background.default,
      
        '&:before':{
            content:'""',
            position:"absolute",
            top:"0"
            ,left:"0px",
            height:"calc( 100% - 0px)",
            width:".3rem",
            borderRadius:"10px 0 0 10px",
            background: "linear-gradient(45deg, #444556 , #ffff)",

        },


        'li':{
           
            height: "100%",
            padding:".2rem  0 0 1rem"
        }


      }

})