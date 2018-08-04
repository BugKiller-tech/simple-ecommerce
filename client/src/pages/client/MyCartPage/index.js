import React, { Component } from 'react'
import Header from '../../../components/client/Header';
import {
  withStyles,
  Paper,
  IconButton, Button,
  TextField,
  Divider,
  Typography,
  Stepper, Step, StepContent, StepLabel,
  FormControl, InputLabel, Input, FormHelperText,
} from '@material-ui/core';
import {
  Add,
  Remove
} from '@material-ui/icons';
import styled from 'styled-components';
import { connect } from 'react-redux';


import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import Config from '../../../config';

import { addThingToCart, removeThingFromCart, clearCart } from '../../../actions/cart';

const CountP = styled.p`
  display: inline-block;
  padding: 5px;
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const ProductDesc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`

const TotalPrice = styled.div`
  border-radius: 5px;
  font-size: 2rem;
`

const PleaseAddToCart = styled.div`
  margin: 30px;
  padding: 30px;
  font-size: 2rem;
  text-align: center;
  border-radius:10px;
  border: 1px solid #ddd;
`


const styles = theme => ({
  cartPaper: {
    margin: '5px',
    padding: '30px'
  }
});
class MyCartPage extends Component {
  state = {
    activeStep: 0,
    steps: ['My Cart', 'Shipping Address', 'Payment'],

    shippingAddr: '',
    phoneNumber: '',

    errors: {},
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  clearCart = () => {
    if (!window.confirm('Do you want to clear your cart')) {return;  }
    this.props.clearCart();
  }
  checkBillingInput = () => {
    const errors = {}
    if (this.state.shippingAddr == '') { errors['shippingAddr'] = 'Please input the shipping address' };
    if (this.state.phoneNumber == '') { errors['phoneNumber'] = 'Please input the contact phone number to use it during deliver' };
    this.setState({ errors });
    if (Object.keys(errors).length > 0) { return }


    this.handleNext();
  }

  resetShopping = () => {
    this.props.history.push('/');
  }


  render () {
    const { activeStep, steps, errors } = this.state;
    const { classes, cartProducts } = this.props;

    

    let totalPrice = 0;
    let cartRender = cartProducts.map( (product, idx) => {
      totalPrice += product.price * product.count;
      return (
        <div key={idx}>
          <div className="row my-1">
            <div className="col-sm-2">
              <img src={product.imageUrl} className="img-thumbnail" style={{ maxHeight: '100px' }} />
            </div>
            <div className="col-sm-5">
              <h4>{product.name}</h4>
              <ProductDesc>{ product.description.length < 120 ? product.description : product.description.substring(0, 120) + '...' }</ProductDesc>
            </div>
            <div className="col-sm-3">
              <IconButton onClick={() => this.props.removeThingFromCart(product)}><Remove /></IconButton>
              <CountP>{product.count}</CountP>
              <IconButton onClick={() => this.props.addThingToCart(product)}><Add /></IconButton>
            </div>
            <div className="col-sm-2">
              ${ product.price } * { product.count } = $ { product.count *  product.price }
            </div>
          </div>
          <Divider />
        </div>
      )
    })

    return (
      <div>
        <Header />
        <div className="container">

          <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
              <StepLabel>My Cart</StepLabel>
              <StepContent>
                <Paper elevation={2} className={classes.cartPaper}>
                  { totalPrice > 0 && (
                    <div>
                      { cartRender }
                      <TotalPrice>Total: $ { totalPrice }</TotalPrice>
                      <Button variant="outlined" color="inherit" onClick={this.clearCart}>Empty cart!</Button>
                    </div>
                  )}
                  { totalPrice == 0 && <PleaseAddToCart>There isn't any thing that added to cart!</PleaseAddToCart> }
                </Paper>
                
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={ totalPrice == 0 }
                      onClick={() => { 
                        if (!this.props.user) { this.props.history.push('/login') }
                        else this.handleNext(); 
                      }}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>Billing Address</StepLabel>
              <StepContent>
                <Paper elevation={2} className={classes.cartPaper}>
                  <form>
                    <FormControl className={classes.formControl} fullWidth={true}>
                      <InputLabel htmlFor="shippingAddr">Shipping Address</InputLabel>
                      <Input id="shippingAddr" value={this.state.shippingAddr} onChange={this.handleChange('shippingAddr')}  error={errors.shippingAddr} multiline={true} rows={4} />
                      { errors.shippingAddr && (<FormHelperText error={true}>{errors.shippingAddr}</FormHelperText>) }
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth={true}>
                      <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                      <Input id="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange('phoneNumber')} error={errors.phoneNumber}/>
                      { errors.phoneNumber && (<FormHelperText error={true}>{ errors.phoneNumber }</FormHelperText>) }
                    </FormControl>
                  </form>
                </Paper>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.checkBillingInput}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>

            <Step>
              <StepLabel>My Cart</StepLabel>
              <StepContent>

                <Paper elevation={2} className={classes.cartPaper}>
                  <StripeProvider apiKey={Config.stripe.publicKey}>
                    <div className="example">
                      <h1>Payment</h1>
                      <Elements>
                        <CheckoutForm shippingAddr={this.state.shippingAddr} phoneNumber={this.state.phoneNumber} />
                      </Elements>
                    </div>
                  </StripeProvider>
                </Paper>

                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button> */}
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>

          {activeStep === steps.length && (
          <Paper square elevation={2} style={{ padding: '20px' }}>
            <Typography>
              Thanks for purchasing from our store!
              It will be delivered in time.
            </Typography>
            <Button onClick={this.resetShopping} className={classes.button}>
              Go to shopping
            </Button>
          </Paper>
        )}

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
    cartProducts: state.cart.products
  }
}

export default connect(
  mapStateToProps,
  {
    addThingToCart, removeThingFromCart, clearCart
  }
)(withStyles(styles)(MyCartPage));