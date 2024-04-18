import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { UseView } from './Contexts/viewedFileContext';

const PDFViewer = ({ pdfData }) => {
  const { setViewFile } = UseView();

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: '99999999999999999999999999999999999999', 
      }}
    >
      <div
        style={{
          margin: '1rem 0  2rem 0',
          maxWidth: '90%',
          maxHeight: '95%',
          overflow: 'auto',
          backgroundColor: '#fff', // White background for PDF container
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', // Shadow effect
          overflowX: 'hidden',
        }}
      >
        <Button
          onClick={() => setViewFile(null)}
          style={{
            background:"#fff",
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: '100',
            color: '#333',
            cursor: 'pointer',
          }}
        >
          <Close style={{ fontSize: '2rem' }} />
        </Button>
        <iframe
          src={pdfData}
          title="PDF Viewer"
          style={{
            width: '50vw',
            height: 'calc(100vh - 30px)', // Adjusted height to accommodate the close button
            border: 'none', // Remove border
          }}
        />
      </div>
    </div>
  );
};

export default PDFViewer;
