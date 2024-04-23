import { Box, ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./Components/Contexts/Authantication";
import AppRouter from "./Components/Routes";
import './App.css'
import { FileContextProvider } from "./Components/Contexts/FileContext";
import {  SemesterProvider } from "./Components/Contexts/SemesterContext";
import { UseView } from "./Components/Contexts/viewedFileContext";
import PDFViewer from "./Components/PDFViewer";
import { UserProvider } from "./Components/Contexts/UserContext";
import { AnimatePresence , motion } from "framer-motion";


function App() {
  const  {viewFile   } = UseView()

  
  const theme =createTheme({
    palette: {
      bullet:{
        "1nd":"#ff5c00",
        "2nd":"#02133E",
        "3nd":"#004BFF",

      },
      primary: {
        main: '#FFFFFF', // primary color
        paper: '#ff5c00', // background color for paper elements

      },
      secondary: {
        main: '#FFFFFF', // secondary color
      },
      icons:{
        default: '#0e0e0e9e', // secondary color
        // default: '#aaaa', // secondary color


      },
      background: {
        default: '#F7F7F7', // default background color
        paper: '#FFFFFF', // background color for paper elements
        light: '#f1f1f1', // background color for paper elements
      },
      text: {
        primary: '#0e0e0e9e', // adjust text color for better visibility in dark mode
        heading:"#131313",
        secondary: '#CCCCCC', // adjust secondary text color for better visibility in dark mode
      },
    },
  })

  return (
    <div
    style={{
      overflow:"hidden"
    }}
     className="App">
    <ThemeProvider theme={theme}>
<AuthProvider>
<UserProvider>

<SemesterProvider>

<FileContextProvider>

    
    <AppRouter/>
<AnimatePresence>


    {
        viewFile ? 
        <>
      <motion.div
      initial={{
        opacity:0
      }}
      animate={{opacity:1

      
      }}
      exit={{opacity:0, transition:{duration:0.2}}}
      transition={{duration:0.5}}

      key='file-viewer'
    
      
      className="flex-space-between-center"
      sx={{
        position:"fixed",
        justifyContent:"center",
        gap:"3rem"
      }}
      >
      <PDFViewer pdfData={viewFile} />
      </motion.div>
        </>
      :
      null
      }
</AnimatePresence>


</FileContextProvider>
</SemesterProvider>
</UserProvider>

</AuthProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
