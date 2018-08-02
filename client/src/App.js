import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { purple, green  } from '@material-ui/core/colors';
import Routes from './pages/Routes';

import './App.scss';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    );
  }
}

export default App;
