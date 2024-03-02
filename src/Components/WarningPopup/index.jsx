import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';

const slideInAnimation = (isVisible, bottom) => {
  return `
    @keyframes slideIn {
      0% { bottom: ${isVisible ? bottom : '-15rem'}; opacity: ${isVisible ? 1 : 0}; }
      99%{ bottom: ${isVisible ? '-6rem' : '-15rem'}; opacity: ${isVisible ? 0 : 1}; }
      100% { bottom: ${isVisible ? bottom : '-15rem'}; opacity: ${isVisible ? 1 : 0}; }
    }
  `;
};

const AnimatedBox = styled(Box)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f03;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: .5rem;
  border-radius: 11px;
  z-index: 100000;
  gap: 0 .5rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible, bottom }) => isVisible ? `slideIn 0.4s ease forwards, ${slideInAnimation(isVisible, bottom)}` : 'none'};
  transition: opacity 0.7s ease;
`;

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
    <AnimatedBox isVisible={isVisible} style={{ bottom: isVisible ? bottom : '-15rem' }}>
      <ErrorOutlineIcon />
      <Typography
      sx={{
        width:"15rem"
      }}
       variant='subtitle2' component="p">
        This file is not valid. Please do not provide a PDF file.
      </Typography>
    </AnimatedBox>
  );
};

export default WarningPopup;
