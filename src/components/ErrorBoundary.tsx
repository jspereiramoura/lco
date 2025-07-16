import React, { Component } from "react";
import type { ReactNode } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import errorSvg from "../assets/error.svg";
import Header from "./Header";
import { appTheme } from "../utils/theme";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ThemeProvider theme={appTheme}>
          <Header />
          <Container maxWidth="sm">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight="80vh"
              textAlign="center"
              gap={3}
            >
              <img
                src={errorSvg}
                alt="Error"
                style={{ width: 200, height: 200 }}
              />
              <Typography variant="h4" color="primary" gutterBottom>
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                An unexpected error occurred. Please try again.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleReload}
                size="large"
              >
                Reload Page
              </Button>
              {process.env.NODE_ENV === "development" && (
                <Box mt={3} p={2} bgcolor="grey.100" borderRadius={1}>
                  <Typography variant="caption" color="text.secondary">
                    Error: {this.state.error?.message}
                  </Typography>
                </Box>
              )}
            </Box>
          </Container>
        </ThemeProvider>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
