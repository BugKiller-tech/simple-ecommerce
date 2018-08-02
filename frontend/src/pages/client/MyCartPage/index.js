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

const CountP = styled.p`
  display: inline-block;
  padding: 5px;
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const TotalPrice = styled.div`
  border-radius: 5px;
  font-size: 2rem;
`


const styles = theme => ({
  cartPaper: {
    padding: '30px'
  }
});

class MyCartPage extends Component {
  state = {
    carts: [
      {
        title: 'abc',
        count: 2,
        price: 200,
        img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS9pk7chnURXPOYlaCL-yHOaGJLR8c1niKulAFDYTit-UhnhyU5t_2k2f_xc3O7JSHFelBbaMfg2YPK3k9OoLA3w-IYYepdZJJxASNTMkb-gWF-KSho1kkRSg&usqp=CAE'
      },
      {
        title: 'abc',
        count: 3,
        price: 250,
        img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQoNmwYgnqG2RGXUodE_VN0_cufRZ0Yuz7gKUHjL0ij2bZREY1Q7CRVGbWVon1zJ2Qo0EwZ6liGPw_OVDcBmJcgwJVTm1qkj0T5WU11LeIvC2IMadGOx6M6Uw&usqp=CAE'
      }
    ]
  }

  render () {
    const { carts } = this.state;
    const { classes } = this.props;

    let totalPrice = 0;
    let cartRender = carts.map( (product, idx) => {
      totalPrice = product.price * product.count;
      return (
        <div key={idx}>
          <div className="row my-1">
            <div className="col-sm-1">
              <img src={product.img} className="img-fluid" />
            </div>
            <div className="col-sm-2">
              {product.title}
            </div>
            <div className="col-sm-5">
              <IconButton><Remove /></IconButton>
              <CountP>{product.count}</CountP>
              <IconButton><Add /></IconButton>
            </div>
            <div className="col-sm-2">
              { product.count *  product.price }$
            </div>
            <div className="col-sm-2">

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
              { cartRender }
              <TotalPrice>
                Total: $ {totalPrice}
              </TotalPrice>
              <Button variant="outlined" color="primary">Check Out</Button>
            </Paper>
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(MyCartPage);