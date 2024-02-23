import React, { useEffect, useState } from 'react'
import { MainDrawerData } from '../Components/Data/Data'
import { Box, Collapse, List, ListItem, Typography } from '@mui/material'
import {  StyledBtnFlexCenter, StyledCollapse } from './style'
// import { useTheme } from 'styled-components'

const MenuCollapse = ({isExpand}) => {

    const initialState = MainDrawerData.reduce((acc, item) => {
        acc[item.Ttile.split(" ").join("-")] = false;
        return acc;
    }, {});
    const [collapse , setCollapse]= useState({...initialState} )


    useEffect(()=>{
        if (isExpand){
            setCollapse(initialState)
        }

    },[initialState, isExpand])

    const HandleClickMenucollapse = (e)=>{
        if(!isExpand){

            const {id} = e.target
            
            
            
            setCollapse((prev)=>{
                return{
                    ...initialState , 
                    [id]:!prev[id]
                }
            })
        }
    }


  return (
    <List
    disablePadding
        sx={{
          width:"100%"
        }}
    >
    {MainDrawerData.map((item)=>{
      return (
          <ListItem
          sx={{
            width:"100%",
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            flexDirection:"column"
          }}
          disablePadding
          >
          <Box
          sx={{
            width:"100%"
          }}
          
          id={item.Ttile.split(" ").join("-")}
          >
          <StyledBtnFlexCenter
          isExpand={!isExpand}

  
          disableRipple
          
          onClick={(e)=>HandleClickMenucollapse(e)}
          >

          <img 
          id={item.Ttile.split(" ").join("-")}
          
          src={item.iconPath} alt={item.Ttile+"img"} />
          <Typography
        className={`${!isExpand ? "" : "isNotExpandText"}`}

          sx={{
            width:"max-content"
          }}
          id={item.Ttile.split(" ").join("-")}
          
           variant='caption' component={"p"}>
              {item.Ttile}
          </Typography>

          </StyledBtnFlexCenter>
          </Box>
              <Collapse
              in={collapse[item.Ttile.split(" ").join("-")]}
              id={item.Ttile.split(" ").join("-")}
              >
                <StyledCollapse
                
                >
                {item.nested.map((item)=>{
                    return (
                        <ListItem
                        disablePadding
                        key={item}
                        >

                        <Typography

                        sx={{
                            color:"#fff"
                        }}
                         variant='caption' component={"p"}>
                            {item}
                        </Typography>
                        </ListItem>
                    )
                })}


                </StyledCollapse>
              </Collapse>
          </ListItem>
      )
    })}

    
    

    </List>
  )
}

export default MenuCollapse
