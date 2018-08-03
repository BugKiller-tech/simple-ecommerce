import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { 
  IconButton, Typography, Button, 
  // GridList, GridListTile, ListSubheader, GridListTileBar,
  List, ListItem, Checkbox, ListItemText, ListItemSecondaryAction,
  Card, CardMedia, CardContent, CardActions,
  Chip, Tooltip,
  Snackbar
} from '@material-ui/core';

// import ShoppingCartIcon  from '@material-ui/icons/ShoppingCart';
import { ShoppingCart, Info, Comment, AddShoppingCart } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../../../actions/categories';
import { fetchAllProducts } from '../../../actions/products';
import { addThingToCart } from '../../../actions/cart';
import SearchBar from 'material-ui-search-bar'

import Header from '../../../components/client/Header';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    margin: '5px',
  },
  badge: {
    top: -10,
    right: -15,
    fontSize: '10px', 
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
    paddingTop: '90%',
  },
});

class ShopPage extends Component {

  state = {
    searchKey: '',
    checkedCategoryIndexs: [],


    snackBarOpen: false,
    snackbarMessage: '',
  }
  componentDidMount = () => {
    this.fetchData();
  }
  fetchData = () => {
    this.props.fetchAllCategories();
    this.props.fetchAllProducts();
  }

  handleToggleCategory = (_id) => {
    const { checkedCategoryIndexs } = this.state;
    const currentIndex = checkedCategoryIndexs.indexOf(_id);
    const newChecked = [...checkedCategoryIndexs];

    if (currentIndex === -1) {
      newChecked.push(_id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedCategoryIndexs: newChecked,
    });
  }
  addToCart = (product) => {
    console.log(product);
    this.props.addThingToCart(product);
    this.setState({ snackBarOpen: true, snackbarMessage: 'Successfully added to cart' })
  }

  render() {
    const { classes } = this.props;
    const { checkedCategoryIndexs, searchKey } = this.state;
    const { products, categories } = this.props;

    const filteredProducts = products.filter(product => {
      let isVisible = false;
      if (checkedCategoryIndexs.length == 0 || checkedCategoryIndexs.indexOf(product.category._id) != -1) {
        if (product.description.includes(searchKey)) isVisible = true;
      }
      return isVisible;
    })
    return (
      <div className={classes.root}>
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
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-3">
            <List>
              {categories.map(category => (
                <ListItem
                  key={category._id}
                  role={undefined}
                  dense
                  button
                  onClick={() => this.handleToggleCategory(category._id)}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={this.state.checkedCategoryIndexs.indexOf(category._id) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={category.name} />
                  <ListItemSecondaryAction>
                    <Tooltip title={category.description.length >100 ? category.description.substring(0, 30) + '....' : category.description }>
                      <IconButton aria-label="Comments">
                        <Comment />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-12 pb-2">
                  <SearchBar
                    value={this.state.searchKey}
                    onChange={(newValue) => this.setState({ searchKey: newValue })}
                    onRequestSearch={() => { this.setState({ searchKey: '' }) }}
                  />
                </div>
                {filteredProducts.map((product, idx) => (
                  <div className="col-lg-4 col-md-6 mb-3" key={idx}>
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image={product.imageUrl}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        {product.name}
                      </Typography>
                      <Typography gutterBottom variant="headline" component="h2">
                        <Chip label={`$ ${product.price}`}></Chip>
                      </Typography>
                      <Typography component="p">
                        { product.description.length > 100 ? product.description.substring(0, 100) + ' ... ...' : product.description }
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Details
                      </Button>
                      <Button size="small" color="primary" onClick={ () => this.addToCart(product) }>
                        <AddShoppingCart></AddShoppingCart>
                      </Button>
                    </CardActions>
                  </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


ShopPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.categories,
    products: state.products.products
  }
}
export default connect(
  mapStateToProps,
  {
    fetchAllCategories,
    fetchAllProducts,
    addThingToCart,
  }
) (
withStyles(styles)(ShopPage));