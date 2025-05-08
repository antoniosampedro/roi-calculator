import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import RoiCalculator from './components/RoiCalculator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoiCalculator />
    </ThemeProvider>
  );
}

export default App;
