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

const styles = theme => ({
 
});

class MainPage extends Component {
  state = {
    
  }

  render() {
    const { classes } = this.props;
    const { products, checkedCategoryIndexs } = this.state;
    return (
      <div className={classes.root}>
        <Header />
        <div className="container-fluid">
          main page
        </div>
      </div>
    )
  }
}


MainPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);