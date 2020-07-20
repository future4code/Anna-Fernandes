import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import ApplicationsFormPage from './components/ApplicationFormPage/ApplicationFormPage';
import CreateTripPage from './components/CreateTripPage/CreateTripPage';
import CandidatesPage from './components/CandidatesPage/CandidatesPage';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3BD97F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F27C38',
      contrastText: '#ffffff',
    },
  },
});

function App() {
  return (
    <ThemeProvider  theme={theme}>
    <CssBaseline />
      <HomePage />
      <LoginPage />
      <SignUpPage />
      <ApplicationsFormPage />
      <CreateTripPage />
      <CandidatesPage />
    </ThemeProvider>
  );
}

export default App;
