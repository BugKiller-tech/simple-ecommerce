import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { 
  IconButton, Typography, Button, 
  // GridList, GridListTile, ListSubheader, GridListTileBar,
  List, ListItem, Checkbox, ListItemText, ListItemSecondaryAction,
  Card, CardMedia, CardContent, CardActions,
} from '@material-ui/core';

// import ShoppingCartIcon  from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';

import Header from '../../../components/client/Header';
import './style.css'

const styles = theme => ({
 root: {
 }
});

class MainPage extends Component {
  state = {
    
  }

  render() {
    const { classes } = this.props;
    const { products, checkedCategoryIndexs } = this.state;
    return (
      <div className={classes.root} id="main-page">
        <Header />
        <div className="container text-center">
          <h1>Welcome to Shopping site</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora aliquam eius, in placeat itaque aut reprehenderit porro, tempore laboriosam dignissimos laborum optio accusamus quisquam cumque adipisci labore corporis sapiente repellat neque quibusdam alias obcaecati. Nobis praesentium rerum quaerat tempore dolorem, id consequatur voluptates qui nostrum repellat, ipsam in ex mollitia.</p>
          <br />
          <p>
            please fee free to contact me. <br />
            bugkiller
          </p>

          <Button>Start shopping</Button>

        </div>
      </div>
    )
  }
}


MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);