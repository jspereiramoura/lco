import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { SnackbarProvider } from "notistack";
import "./App.css";
import Header from "./components/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#05662b",
      contrastText: "#fff"
    },
    secondary: {
      main: "#7dde21",
      contrastText: "#05662b"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        autoHideDuration={3000}
      >
        <Header />
        <main>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Outlet />
          </Container>
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
