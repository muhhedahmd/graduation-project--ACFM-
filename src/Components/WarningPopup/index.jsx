import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const slideInAnimation = {
  visible: {
    bottom: '-5rem',
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  hidden: {
    bottom: '-5rem',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

const AnimatedBox = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#f03',
  color: '#fff',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '.5rem',
  borderRadius: '11px',
  zIndex: 100000,
  gap: '0 .5rem',
};

const WarningPopup = ({ isInvalid, setIsInvalid, bottom, duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(isInvalid);

  useEffect(() => {
    setIsVisible(isInvalid);
    
    if (isInvalid) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsInvalid(false);
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [isInvalid, duration, setIsInvalid]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={slideInAnimation}
          style={{ ...AnimatedBox, bottom }}
        >
          <ErrorOutlineIcon />
          <Typography
            sx={{
              width: "15rem"
            }}
            variant='subtitle2' component="p"
          >
            This file is not valid. Please do not provide a PDF file.
          </Typography>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WarningPopup;
