import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./Components/Contexts/Authantication";
import AppRouter from "./Components/Routes";
import { grey } from "@mui/material/colors";


function App() {
  const theme =createTheme({
    palette: {
      bullet:{
        "1nd":"#FFFFFF",
        "2nd":"#02133E",
        "3nd":"#004BFF",
        "4nd":grey[900],

      },
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
