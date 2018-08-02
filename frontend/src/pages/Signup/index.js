import React, { Component } from 'react'
import Header from '../../components/client/Header';
import {withStyles,
  Paper, Typography,
  TextField, InputAdornment,
  Button,
} from '@material-ui/core';
import {
  AccountCircle,
  SecurityRounded,
  FaceOutlined,
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

class Signup extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="login-page">
        <Header />
        <div className="login-form">
          <Paper elevation={1} className={classes.root}>
            <LogoImg src={logo} />
            <Typography variant="headline" component="h3">
              User Registration
            </Typography>
            <TextField 
              fullWidth={true} name="firstName"
              label="First Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaceOutlined />
                  </InputAdornment>
                ),
              }} 
            />
            <TextField 
              fullWidth={true} name="lastName"
              label="Last Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaceOutlined />
                  </InputAdornment>
                ),
              }} 
            />
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
              type="password"
              fullWidth={true} name="password"
              label="Password"
              type="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SecurityRounded />
                  </InputAdornment>
                ),
              }} 
            />
            <TextField 
              type="password"
              fullWidth={true} name="rePassword"
              label="Password Confirm"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SecurityRounded />
                  </InputAdornment>
                ),
              }} 
            />
            <Button variant="outlined" color="primary" className={classes.loginButton}>
              Sign up
            </Button>

          </Paper>
        </div>
      </div>
    )
  }
}



export default withStyles(styles)(Signup);