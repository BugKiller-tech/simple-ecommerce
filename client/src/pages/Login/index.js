import React, { Component } from 'react'
import Header from '../../components/client/Header';
import {withStyles,
  Paper, Typography,
  TextField, InputAdornment,
  Button,
} from '@material-ui/core';
import {
  AccountCircle,
  SecurityRounded
} from '@material-ui/icons';

import styled from 'styled-components';
import './style.css';

import logo from '../../imgs/logo.png';

const LogoImg = styled.img`
  width: 120px;
`


const styles = theme => ({
  root: {
    padding: '40px',
    textAlign: 'center'
  },
  loginButton: {
    marginTop: '30px'
  }
});

class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="login-page">
        <Header />
        <div className="login-form">
          <Paper elevation={1} className={classes.root}>
            <LogoImg src={logo} />
            <Typography variant="headline" component="h3">
              Login
            </Typography>
            <TextField 
              type="email"
              fullWidth={true} name="email"
              label="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }} 
            />
            <TextField 
              type="email"
              fullWidth={true} name="email"
              label="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SecurityRounded />
                  </InputAdornment>
                ),
              }} 
            />
            <Button variant="outlined" color="primary" className={classes.loginButton}>
              LogIn
            </Button>

          </Paper>
        </div>
      </div>
    )
  }
}



export default withStyles(styles)(Login);