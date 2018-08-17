import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCart } from '../../../actions/cart';


import { 
  withStyles,
  Button, CircularProgress 
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import Api from '../../../api';

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class CheckoutForm extends Component {

  state = {
    loading: false,
  }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {

    this.setState({ loading: true })
    try {
      let {token} = await this.props.stripe.createToken({name: "WomanShop"});
      console.log(token);

      const data = {
        tokenId: token.id,
        shippingAddr: this.props.shippingAddr,
        phoneNumber: this.props.phoneNumber,
        buyProducts: this.props.buyProducts,
      }

      const response = await Api.makeOrder(data);
      this.setState({ loading: false })
      alert('Thank you for purchasing! The thing will be delivered in time!')
      this.props.clearCart();
      window.location = '/';

      // console.log(response);
    } catch (err) {
      this.setState({ loading: false })
      console.log(err);
    }
    // let response = await fetch("/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id
    // });

    // if (response.ok) console.log("Purchase Complete!")
  }

  render() {

    const { loading } = this.state;
    const { classes, buyProducts } = this.props;
    let totalMoney = 0;
    buyProducts.map(product => {
      totalMoney += product.price * product.count
    })

    return (
      <div className="checkout">
        <p>Will be paid $ {totalMoney} to purchase!</p>
        <CardElement />
        <br/>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={this.submit}
          >
            Pay to purchase
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  shippingAddr: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    buyProducts: state.cart.products
  }
}

export default connect(
  mapStateToProps, 
  {
    clearCart,
  }
)(
  injectStripe(
    withStyles(styles)(CheckoutForm)
  )
);
