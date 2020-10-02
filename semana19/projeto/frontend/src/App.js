import React, { useEffect } from 'react';
import axios from 'axios';
import Router from './utils/Router';

import CssBaseline from '@material-ui/core/CssBaseline';

import { theme, useStyles } from './styles/basicStyles';
import { ThemeProvider } from '@material-ui/styles';
import { GlobalStyle } from './styles/globalStyle'

function App() {
  return (
    <ThemeProvider  theme={theme}>
      <GlobalStyle />
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
