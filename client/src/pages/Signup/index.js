import React, { Component } from 'react'
import Header from '../../components/client/Header';
import {withStyles,
  Paper, Typography,
  TextField, InputAdornment,
  Button,
  Snackbar,
} from '@material-ui/core';
import {
  AccountCircle,
  SecurityRounded,
  FaceOutlined,
} from '@material-ui/icons';
import styled from 'styled-components';
import validator from 'validator';

import Api from '../../api';
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

  state = {

    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',


    snackBarOpen: false,
    snackbarMessage: '',

  }
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    })    
  }
  onSubmit = () => {
    if (this.state.firstName == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the first name' }); return; }
    if (this.state.lastName == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the last name' });  return;}
    if (this.state.email == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the email' });  return;}
    if (!validator.isEmail(this.state.email)) { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the valid email' });  return;}
    if (this.state.password == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the password' });  return;}
    if (this.state.rePassword == '') { this.setState({ snackBarOpen: true, snackbarMessage: 'Please input the rePassword' });  return;}
    if (this.state.password != this.state.rePassword) { this.setState({ snackBarOpen: true, snackbarMessage: 'The password is mismatching.' });  return;}
    Api.signUp({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    })
    .then(res => {
      this.setState({ snackBarOpen: true, snackbarMessage: 'Successfully registerd! Please login to continue' });
    })
    .catch(err => {
      this.setState({ snackBarOpen: true, snackbarMessage: err.response.data.message });
    })

  }

  render() {
    const { classes } = this.props;
    return (
      <div className="login-page">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
          open={this.state.snackBarOpen}
          autoHideDuration={3000}
          onClose={() => { this.setState({ snackBarOpen: false }) }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />
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
              value={this.state.firstName}
              onChange={this.handleChange('firstName')}
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
              value={this.state.lastName}
              onChange={this.handleChange('lastName')}
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
              value={this.state.email}
              onChange={this.handleChange('email')}
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
              value={this.state.password}
              onChange={this.handleChange('password')}
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
              value={this.state.rePassword}
              onChange={this.handleChange('rePassword')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SecurityRounded />
                  </InputAdornment>
                ),
              }} 
            />
            <Button variant="outlined" color="primary" className={classes.loginButton} onClick={this.onSubmit}>
              Sign up
            </Button>

          </Paper>
        </div>
      </div>
    )
  }
}



export default withStyles(styles)(Signup);