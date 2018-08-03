import React, { Component } from 'react'
import Header from '../../../components/client/Header';
import {
  withStyles,
  Paper,
  IconButton, Button,
  TextField,
  Divider,
  Typography,
} from '@material-ui/core';
import {
  Add,
  Remove
} from '@material-ui/icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addThingToCart, removeThingFromCart } from '../../../actions/cart';

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
  font-size: 1rem;
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
    padding: '30px'
  }
});
class MyCartPage extends Component {
  state = {

  }

  render () {
    const { } = this.state;
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
            <div className="col-sm-6">
              <h3>{product.name}</h3>
              <ProductDesc>{ product.description.length < 100 ? product.description : product.description.substring(0, 100) + '...' }</ProductDesc>
            </div>
            <div className="col-sm-2">
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
          <br/>
          <Paper elevation={2} className={classes.cartPaper}>
            { totalPrice > 0 && (
              <div>
                { cartRender }
                <TotalPrice>Total: $ { totalPrice }</TotalPrice>
                <Button variant="outlined" color="primary">Check Out</Button>
              </div>
            )}
            { totalPrice == 0 && <PleaseAddToCart>There isn't any thing that added to cart!</PleaseAddToCart> }
          </Paper>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartProducts: state.cart.products
  }
}

export default connect(
  mapStateToProps,
  {
    addThingToCart, removeThingFromCart
  }
)(withStyles(styles)(MyCartPage));