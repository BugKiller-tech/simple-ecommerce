import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { 
  IconButton, Typography, Button, 
  // GridList, GridListTile, ListSubheader, GridListTileBar,
  List, ListItem, Checkbox, ListItemText, ListItemSecondaryAction,
  Card, CardMedia, CardContent, CardActions,
} from '@material-ui/core';

// import ShoppingCartIcon  from '@material-ui/icons/ShoppingCart';
import { ShoppingCart, Info, Comment, AddShoppingCart } from '@material-ui/icons';
import PropTypes from 'prop-types';

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
    products: [
      {
        title: 'Woman clothes',
        price: 300,
        img: 'https://www.dhresource.com/0x0s/f2-albu-g2-M00-76-EF-rBVaG1ZcDaiAI_S8AAck08HRLEA820.jpg/2016-women-clothes-summer-sexy-lace-stitching.jpg'
      },
      {
        title: 'Woman clothes1',
        price: 300,
        img: 'http://www.yukisale.com/images/japanese%20dress/woman%20clothes%20wholesale%20trendy%20dress%20K3402%20Orange1.jpg'
      },
      {
        title: 'Best cloth',
        price: 300,
        img: 'https://image.dhgate.com/0x0/f2/albu/g4/M00/DF/7D/rBVaEFcU-n2AJatYAAIwiDPnfyI156.jpg'
      },
      {
        title: 'Woman clothes',
        price: 300,
        img: 'data:image/jpeg;base64,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'
      },
      {
        title: 'Woman clothes',
        price: 300,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxbWvoGm2aajEQxpsR2ZGGjlI2V0P3bZ1fdUrqrbQ_sj4OEMhRGw'
      },
      {
        title: 'Woman clothes',
        price: 300,
        img: 'https://cdn.shopify.com/s/files/1/0986/0776/products/Flywear_Rhythm_High_Impact_Top_-_Printed_Top_-_Yoga_clothes_-_Yoga_Clothing_-_Women_Clothes_-_Woman_Clothing_-_Actiwear_-_Workout_Clothes_large.jpg?v=1461798299'
      },
      {
        title: 'Woman clothes',
        price: 300,
        img: 'https://www.dhresource.com/0x0s/f2-albu-g5-M01-9C-35-rBVaI1jeLQKAApmxAAFCZzj9GD0029.jpg/2017-spring-new-pattern-lace-embroidery-coattail.jpg'
      },
      {
        title: 'Shirt',
        price: 300,
        img: 'https://ae01.alicdn.com/kf/HTB1WCsvRFXXXXc6XVXXq6xXFXXXf/Casual-Blouse-Shirt-Long-Sleeve-Blusas-Femininas-Roupas-Woman-Clothes-Body-Ladies-Work-Wear-Female-Office.jpg_640x640.jpg'
      },
    ],

    checkedCategoryIndexs: [0]
  }

  handleToggleCategory = () => {

  }

  render() {
    const { classes } = this.props;
    const { products, checkedCategoryIndexs } = this.state;
    return (
      <div className={classes.root}>
        <Header />
        
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-md-3">
            <List>
              {[0, 1, 2, 3].map(value => (
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggleCategory(value)}
                  className={classes.listItem}
                >
                  <Checkbox
                    checked={this.state.checkedCategoryIndexs.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={`Woman clothes ${value + 1}`} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Comments">
                      <Comment />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            </div>
            <div className="col-md-9">
              <div className="row">
                {products.map((product, idx) => (
                  <div className="col-lg-4 col-md-6 mb-3" key={idx}>
                  <Card>
                    <CardMedia
                      className={classes.media}
                      image={product.img}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="headline" component="h2">
                        {product.title}
                      </Typography>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Details
                      </Button>
                      <Button size="small" color="primary">
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

export default withStyles(styles)(ShopPage);