import { Box, List, ListItem } from '@mui/material'
import React from 'react'

const TableOfUSersCard = ({name , email ,type ,optionText , border  ,option , role}) => {
  return (
    <Box sx={{width:"100%"}}>
    <List 

    
    sx={{display:"flex" , borderBottom:`1px solid ${border}` , justifyContent:"space-between" , alignItems:"flex-start"}}>
    <ListItem 

    disablePadding
    >
        {name}
    </ListItem>
    <ListItem
    disablePadding
    >
        {email}
    </ListItem>
    <ListItem
    disablePadding
    >
        {role}
    </ListItem>
    <ListItem
    

    disablePadding
    >
        {type}
    </ListItem>
    <ListItem
    sx={{width:"fit-content"}}

    disablePadding
    >
        {optionText  ?optionText   : option}
    </ListItem>

    </List>

    </Box>
  )
}

export default TableOfUSersCard