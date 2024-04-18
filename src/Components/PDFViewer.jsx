import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { UseView } from './Contexts/viewedFileContext';
import { Document, Page, pdfjs } from 'react-pdf';

const PDFViewer = ({ pdfData }) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const { setViewFile } = UseView();
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const renderPages = () => {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      pages.push(<Page key={pageNumber} pageNumber={pageNumber} />);
    }
    return pages;
  };

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
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          margin: '1rem 0  2rem 0',
          width: '100%',
          maxWidth: '90%',
          maxHeight: '95%',
          overflow: 'auto',
          backgroundColor: '#fff', // White background for PDF container
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', // Shadow effect
          overflowX: 'scroll',
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
        <h1 style={{ textAlign: 'center' }}>PDF Viewer</h1>
        <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
          {numPages && renderPages()}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
