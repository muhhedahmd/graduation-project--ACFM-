import React, { useEffect, useState } from 'react'
import { MainDrawerData } from '../Components/Data/Data'
import { Box, Collapse, List, ListItem, SvgIcon, Typography } from '@mui/material'
import {  StyledBtnFlexCenter, StyledCollapse } from './style'
import { useTheme } from '@emotion/react'
// import { useTheme } from 'styled-components'

const MenuCollapse = ({isExpand}) => {
  const theme = useTheme()
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
    {MainDrawerData.map((item , i )=>{
      return (
          <ListItem
          key={i}
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
       <SvgIcon
       sx={{
        width:"1.3rem",
        fill: theme.palette.text.primary,
       }}
       >

      {item.iconPath}
       </SvgIcon>

          <Typography

        className={`${!isExpand ? "" : "isNotExpandText"}`}

          sx={{
            color: theme.palette.text.primary,

              fontWeight:"600",
            width:"max-content"
          }}
          id={item.Ttile.split(" ").join("-")}
          
           variant='caption' component={"p"}>
              {item.Ttile}
          </Typography>

          </StyledBtnFlexCenter>
          </Box>
              <Collapse
              sx={{
                width:"100%"
              }}
              in={collapse[item.Ttile.split(" ").join("-")]}
              id={item.Ttile.split(" ").join("-")}
              >
                <StyledCollapse
                
                >
                {item.nested.map((item)=>{
                    return (

                        <ListItem
                        
                        sx={{
                          width:"100%"
                        }}
                        disablePadding
                        key={item}
                        >

                        <Typography

                        sx={{
                            color: theme.palette.text.primary
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
