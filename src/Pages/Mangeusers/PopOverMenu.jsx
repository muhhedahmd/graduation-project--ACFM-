import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Box, Button, List, ListItem,  SwipeableDrawer } from '@mui/material';
import { Close, Delete, Edit } from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import styled from '@emotion/styled';
import axios from 'axios';
import EditUSerDetails from './EditUSerDetails';
import LinearWithValueLabel from '../../Components/ProgreessBar';

export default function PopOverMenu(props) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [progressDelete, setProgressDelete] = useState(0);

  const handleDel = async () => {
    try {
      setLoadingDelete(true); // Set loading to true when starting deletion
      await axios.delete(
        `https://optima-software-solutions.com/apis/userdelete.php?id=${props.id}`,
        {
          onDownloadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const progressPercent = Math.round((loaded * 100) / total);
            setProgressDelete(progressPercent);
          },
        }
      );
      props.fetchData();
      alert('user is removed sucessfully')
    } catch (error) {
      console.error('Error:', error.response.data);
      // Handle errors here if needed
    } finally {
      setLoadingDelete(false); // Set loading to false regardless of success or failure
      setProgressDelete(0); // Reset progress after completion
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idPoper = open ? 'simple-popover' : undefined;

  const StyledListItem = styled(ListItem)(() => {
    return {
      cursor: 'pointer',
      transition: '.3s',
      ':hover , :focus': {
        color: '#333',
      },
    };
  });

  return (
    <div>
      <Button
        disableRipple
        disableFocusRipple
        sx={{
          justifyContent: 'flex-end',
          boxShadow: 'none',
          color: '#666',
          p: '0',
          width: 'min-content',
          ':hover ,:focus': {
            background: '#fff',
            boxShadow: 'none',
            color: '#333',
          },
        }}
        aria-describedby={props.id}
        variant="contained"
        onClick={handleClick}
      >
        <ListIcon sx={{ color: 'inherit' }} fontSize="medium" />
      </Button>
      <Popover
        id={idPoper}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <List>
          <StyledListItem onClick={() => setOpenDrawer(true)}>
            <Edit fontSize=".5rem" />
            <Typography sx={{ ml: '.5rem' }} variant="body2" component={'p'}>
              Edit
            </Typography>
          </StyledListItem>
          <StyledListItem onClick={handleDel}>
            <Delete fontSize=".5rem" />
            <Typography sx={{ ml: '.5rem' }} variant="body2" component={'p'}>
              Delete
            </Typography>
          </StyledListItem>
        </List>
      </Popover>
      <SwipeableDrawer
        open={openDrawer}
        anchor="right"
        onOpen={() => setOpenDrawer(true)}
        onClose={() => setOpenDrawer(false)}
      >
        <Box
          sx={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Close
            style={{
              fontWeight: 'bold',
              position: 'absolute',
              fontSize: '2.2rem',
              top: '1rem',
              right: '1.5rem',
              cursor: 'pointer',
            }}
            onClick={() => setOpenDrawer(false)}
          />

          <EditUSerDetails setOpenDrawer={setOpenDrawer} {...props} />
        </Box>
      </SwipeableDrawer>
      {/* Conditionally render loader or progress bar */}
   {
    loadingDelete &&
        <Box sx={{
          
          
           width:"107%"  ,left:"0" , position:"absolute" ,
        bottom:"98%",
         }}>
        <LinearWithValueLabel value={progressDelete} />

        </Box>
   }
    
    </div>
  );
}
