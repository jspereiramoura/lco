import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router";
import "./App.css";
import { GlobalLoader } from "./components/GlobalLoader/GlobalLoader";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/redux";

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
  const { isLoading, message } = useAppSelector(state => state.globalLoader);

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
        <GlobalLoader isVisible={isLoading} message={message} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
