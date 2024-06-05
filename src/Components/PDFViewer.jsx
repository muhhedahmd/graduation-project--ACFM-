
import { Close } from '@mui/icons-material';
// import { Button } from '@mui/material';
// import React, { useState } from 'react';
import { UseView } from './Contexts/viewedFileContext';
// import { Document, Page,pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import { StyledMainBtn } from '../MainDrawer/style';


// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString()
const PDFViewer = ({ pdfData }) => {

  const { setViewFile } = UseView();
  // const [numPages, setNumPages] = useState(null);
  // const [, setIsLoaded] = useState(false);

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  //   setIsLoaded(()=>true);
  // };
  // const [pageNumber, setPageNumber] = useState(1);


  // const renderPages = () => {
  //   const pages = [];
  //   for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
  //     pages.push(
  //       <div key={pageNumber} style={{ display: 'flex', justifyContent: 'center', alignItems:"center", flexDirection:"column" }}>
  //         <Page pageNumber={pageNumber} renderMode="canvas" 
  //       renderForms='canvas'

  //         />
  //         <p style={{ textAlign: 'center' }}>
  //           Page {pageNumber} of {numPages}
  //         </p>
  //       </div>
  //     );
  //   }
  //   return pages;
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
        <StyledMainBtn
          onClick={() => setViewFile(null)}
          style={{
            background:"#fff",
         
            zIndex: '100',
            color: '#333',
            cursor: 'pointer',
          }}
        >
         close  <Close style={{ fontSize: '2rem' }} />
        </StyledMainBtn>
    
        <iframe
        
        title='pdf'
        src={pdfData}
        width='100%'
        height='200px'
        style={{
          height: '90vh',
        }}
      />
        {/* <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
        {renderPages()}
      </Document> */}
    
      </div>
    </motion.div>
  );
};

export default PDFViewer;
