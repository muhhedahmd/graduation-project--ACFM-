import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AnimatePresence  , motion} from 'framer-motion';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          sx={{
            bgcolor: "#d3d3d3",
            '.css-1fn9cpf-MuiLinearProgress-bar1': {
              bgcolor: "#ff5c00"
            }
          }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ 
     
         minWidth: 35 }}>
        <Typography  variant="body2" sx={{
               color:"#222 ",
        }}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({ value }) {
  return (
    <AnimatePresence mode='popLayout'>

    <motion.div 
    initial={{
        opacity: 0,
    }}
     animate={{
        opacity:"1",
     }}   
    exit={{
        opacity:0,
    
    }}
    transition={{
        duration:"1s"
    }}
    style={{ width: '100%', marginBottom: "-1rem"  , 
        color:"#111 important",
    position:"absolute",
    zIndex:"100",
    top:"90%"
    }}>
      <LinearProgressWithLabel value={value} />
    </motion.div>
    </AnimatePresence>
  );
}
