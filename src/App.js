import React, { useContext, useEffect } from "react";
import { ThemeProvider, adaptV4Theme } from "@mui/material/styles";
import SettingsContext from "src/context/SettingsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import AppRouter from "./AppRouter";
import { createTheme } from "src/theme";


export default function App() {
  const themeSetting = useContext(SettingsContext);
  const theme = createTheme(
    adaptV4Theme({
      theme: themeSetting.settings.theme,
    })
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppRouter />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

