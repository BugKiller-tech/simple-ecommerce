import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { 
  IconButton, Typography, Button, 
  // GridList, GridListTile, ListSubheader, GridListTileBar,
  List, ListItem, Checkbox, ListItemText, ListItemSecondaryAction,
  Card, CardMedia, CardContent, CardActions,
  Chip, Tooltip,
  Snackbar,
  Dialog, Slide, AppBar, Toolbar, Divider
} from '@material-ui/core';
// import ShoppingCartIcon  from '@material-ui/icons/ShoppingCart';
import { 
  ShoppingCart, Info, Comment, AddShoppingCart,
  Close as CloseIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../../../actions/categories';
import { fetchAllProducts } from '../../../actions/products';
import { addThingToCart } from '../../../actions/cart';
import SearchBar from 'material-ui-search-bar'

import Header from '../../../components/client/Header';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}




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
    paddingTop: '100%',
  },
});

class ShopPage extends Component {

  state = {
    searchKey: '',
    checkedCategoryIndexs: [],


    snackBarOpen: false,
    snackbarMessage: '',


    openModal: false,
    detailProduct: {},
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

  handleClickModalOpen = () => {
    this.setState({ openModal: true });
  };

  handleModalClose = () => {
    this.setState({ openModal: false });
  };

  displayDetail = (product) => {
    this.setState({ detailProduct: product, openModal: true })
  }

  render() {
    const { classes } = this.props;
    const { checkedCategoryIndexs, searchKey, detailProduct } = this.state;
    const { products, categories } = this.props;

    const filteredProducts = products.filter(product => {
      let isVisible = false;
      if (checkedCategoryIndexs.length == 0 || (product.category && checkedCategoryIndexs.indexOf(product.category._id) != -1) ) {
        if (product.name.toLowerCase().includes(searchKey.toLowerCase())) { 
          isVisible = true; 
        } else if (product.description.toLowerCase().includes(searchKey.toLowerCase())) { isVisible = true; }
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


        <Dialog
          fullScreen
          open={this.state.openModal}
          onClose={this.handleModalClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleModalClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {detailProduct.name}
              </Typography>
              <Button color="inherit" onClick={() => { this.addToCart(detailProduct);  this.handleModalClose();}}>
                Add To Cart
              </Button>
            </Toolbar>
          </AppBar>
          <div className="container" style={{ marginTop: '70px'}}>
            <div className="row">
              <div className="col-md-6">
                <img src={detailProduct.imageUrl} className="img-thumbnail" style={{ minWidth: '80%' }}  />
              </div>
              <div className="col-md-6">
                <div className="alert alert-success">CATEGORY: { detailProduct.category ? detailProduct.category.name : 'Unknown' }</div>
                <h3>{detailProduct.name}</h3>
                <p>{detailProduct.description}</p>
                <hr />
                <Chip label={`$ ${detailProduct.price}`} style={{ fontSize: '1.5rem' }}></Chip>
              </div>
            </div>
          </div>
        </Dialog>





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
                      <Button size="small" color="primary" onClick={() => { this.displayDetail(product) }}>
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