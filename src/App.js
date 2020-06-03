import React from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Header from './components/header';
import Body from './components/body';

const theme = createMuiTheme({
  spacing: 8,
  typography: {
    h1: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      fontSize: "2.75rem",
      letterSpacing: "-0.01562em",
      lineHeight: 1.167,
      fontWeight: 400,
      marginTop: 16,
      paddingTop: 16
    },
    h2: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      fontSize: "2.25rem",
      fontWeight: 400,
      letterSpacing: "-0.01562em",
      lineHeight: 1.167,
      marginTop: 16
    },
    body1: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.00938em",
      lineHeight: 1.5,
      margin: 16
    },
    caption: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      fontSize: "0.75rem",
      letterSpacing: "0.03333em",
      lineHeight: 1.66,
      fontStyle: "italic"
    }
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header/>
        <Body/>
      </ThemeProvider> 
    </div>
  );
}

export default App;
