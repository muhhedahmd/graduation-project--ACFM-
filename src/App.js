import { ThemeProvider, createTheme } from "@mui/material";
import Login from "./Pages/Login";

function App() {
  const theme =createTheme({
    palette: {
      primary: {
        main: '#FF5C00', // primary color
      },
      secondary: {
        main: '#C84800', // secondary color
      },
      background: {
        default: '#F7F7F7', // default background color
        paper: '#FFFFFF', // background color for paper elements
      },
    },
  })
  return (
    <div className="App">
    <ThemeProvider theme={theme}>

    <Login/>
    </ThemeProvider>
      
    </div>
  );
}

export default App;
