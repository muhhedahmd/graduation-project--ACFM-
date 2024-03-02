import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./Components/Contexts/Authantication";
import AppRouter from "./Components/Routes";
// import { grey } from "@mui/material/colors";
import './App.css'
import { FileContextProvider } from "./Components/Contexts/FileContext";
// import { useEffect } from "react";


function App() {
  
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
        default: '0e0e0e9e', // secondary color
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
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //     bullet: {
  //       "1nd": "#02133E", // adjust bullet colors to fit dark mode
  //       "2nd": "#FFFFFF",
  //       "3nd": "#004BFF",
  //     },
  //     primary: {
  //       main: '#373737', // primary color
  //     },
  //     secondary: {
  //       main: '#373737', // secondary color
  //     },
  //     icons: {
  //       default: "#FF5C00", // adjust icon color for better visibility in dark mode
  //     },
  //     background: {
  //       default: '#121212', // default background color for dark mode
  //       paper: '#373737', // background color for paper elements in dark mode
  //     },
  //     text: {
  //       primary: '#FFFFFF', // adjust text color for better visibility in dark mode
  //       secondary: '#CCCCCC', // adjust secondary text color for better visibility in dark mode
  //     },
  //   },
  // });

  return (
    <div
    style={{
      overflow:"hidden"
    }}
     className="App">
    <ThemeProvider theme={theme}>
<AuthProvider>
<FileContextProvider>

    <AppRouter/>
</FileContextProvider>
</AuthProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
