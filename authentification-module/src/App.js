import "./App.css";
import { ThemeProvider } from "@mui/material";
import Login from "./Login";
import ThemeSettings from "./ThemeSettings";

function App() {
  const theme = ThemeSettings();

  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
