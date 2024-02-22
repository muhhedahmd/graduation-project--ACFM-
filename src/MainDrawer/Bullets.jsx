import { Box, List, ListItem, useTheme } from '@mui/material'
import React from 'react'

const Bullets = () => {
    const theme = useTheme()
  return (
    <Box
    sx={{
        gap:"1rem",
        padding: "0 0 0 4px",
        display:'flex',
        justifyContent:"flex-start",
            alignItems:"flex-start"

    }}
    >
    {Object.values(theme.palette.bullet).map((item)=>{
        return (<Box
        key={item}
        sx={{
            width:"10px",
            height:"10px",
            borderRadius:"50%",
            display:"flex",

            backgroundColor:item
        }}
        >
        </Box>)
    })}

        
    </Box>  )
}

export default Bullets