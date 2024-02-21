import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./Components/Contexts/Authantication";
import AppRouter from "./Components/Routes";


function App() {
  const theme =createTheme({
    palette: {
      primary: {
        main: '#FF5C00', // primary color
      },
      secondary: {
        main: '#C84800', // secondary color
      },
      icons:{
        default:"#5B5B5B",
        
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
<AuthProvider>
  
    <AppRouter/>
</AuthProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
