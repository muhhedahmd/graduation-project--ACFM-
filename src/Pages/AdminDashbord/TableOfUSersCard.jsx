import { Box, Button, List, ListItem } from '@mui/material'
import axios from 'axios'
import React from 'react'
import qs from 'qs'

const TableOfUSersCard = ({name , email ,type , id,optionText , border  ,option , role}) => {
  const HandleClick = async () => {
    try {
      // Use qs.stringify to stringify the data
      const requestData = qs.stringify({
        userid: id
      });

        console.log(requestData)
      const response = await axios.post(
        'https://optima-software-solutions.com/apis/alert.php',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 200) {
        // If the request succeeds, show an alert
        alert('User has been notified to complete the course file');
      } else {
        // If the request fails, log an error
        console.error('Failed to notify user:', response.data);
      }
    } catch (err) {
      // If there's an error, log it to the console
      console.error('Error notifying user:', err);
    }
  };

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
    sx={{width:"fit-content"}}

    disablePadding
    >
        {optionText  ?optionText   : <Button
        onClick={HandleClick}
        colorProp={"#fff"}
        sx={{
          border:"1px solid #ccc",
          borderRadius:"5px",
          padding:" .2rem .4rem",
          color:"#333",
          bgcolor:"#fff !impotant"
          ,':hover':{
          color:"#ccc",
            background:"#333",


        }
        // ,':focus':{
        //     background:"#fefefe !impotant",

        // }
        }}
        >
          Notify
        </Button>}
    </ListItem>

    </List>

    </Box>
  )
}

export default TableOfUSersCard