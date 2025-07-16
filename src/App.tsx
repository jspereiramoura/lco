import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router";
import "./App.css";
import { GlobalLoader } from "./components/GlobalLoader/GlobalLoader";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAppSelector } from "./hooks/redux";
import { appTheme } from "./utils/theme";

function App() {
  const { isLoading, message } = useAppSelector(state => state.globalLoader);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <ErrorBoundary>
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
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
