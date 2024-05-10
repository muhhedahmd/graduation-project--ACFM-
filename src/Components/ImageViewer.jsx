import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, {  } from 'react';
import { motion } from 'framer-motion';
import { useImage } from './Contexts/ImageViewrContex';

const ImageViewer = () => {
  const  {showImage, setShowImage} = useImage()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 99999999999999999999999999999999999999, 
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '80%',
          height: '80%',
          maxWidth: '800px',
          maxHeight: '600px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
      >
        <Button
          onClick={() => setShowImage(null)} // Close the image viewer
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 100,
            color: '#333',
            cursor: 'pointer',
          }}
        >
          <Close style={{ fontSize: '2rem' }} />
        </Button>

        <img src={showImage} alt='Image{ProfileImage}'/>
      </div>
    </motion.div>
  );
};

export default ImageViewer;
