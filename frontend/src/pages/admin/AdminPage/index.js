import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { 
  List, ListItem, ListItemIcon, ListItemText, ListSubheader,
  Typography, Divider,
  SwipeableDrawer,
  IconButton, Collapse,
} from '@material-ui/core';
import { 
  Menu as MenuIcon, 
  Send as SendIcon,
  Drafts as DraftsIcon,
  Category as CategoryIcon,
  Work as WorkIcon,
  List as ListIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

import { Route, NavLink } from 'react-router-dom';

import CategoryPage from '../CategoryPage';
import ProductsPage from '../ProductsPage';
import OrdersPage from '../OrdersPage';


const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    marginTop: '90px',
  }
});

class  AdminPage extends Component{

  state = {
    drawerIsOpen: false,
  }

  toggleDrawer = (isOpen) => {
    this.setState({ drawerIsOpen: isOpen });
  }
  render() {
    const { classes, match } = this.props;
    const { drawerIsOpen } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="absolute">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => { drawerIsOpen ? this.toggleDrawer(false) : this.toggleDrawer(true)} }>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Admin Page
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
            open={this.state.drawerIsOpen}
            onClose={() => {this.toggleDrawer(false)}}
            onOpen={() => {this.toggleDrawer(true)}}
          >
          <div
            tabIndex={0}
            role="button"
            onClick={() => {this.toggleDrawer(false)}}
            onKeyDown={() => {this.toggleDrawer(false)}}
          >
            <List
              component="nav"
              subheader={<ListSubheader component="div">Please pick one</ListSubheader>}
            >
              <ListItem button component={NavLink} to="/admin/categories">
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText inset primary="Categories"/>
              </ListItem>
              <ListItem button component={NavLink} to="/admin/products">
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText inset primary="Products" />
              </ListItem>
              <Divider />
              <ListItem button component={NavLink} to="/admin/orders">
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText inset primary="Orders" />
              </ListItem>

              <ListItem button >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText inset primary="Log out" />
              </ListItem>

            </List>
          </div>
        </SwipeableDrawer>
        <main className={classes.content}>
          <Route path={`${match.url}/categories`} component={CategoryPage} />
          <Route path={`${match.url}/products`} component={ProductsPage} />
          <Route path={`${match.url}/orders`} component={OrdersPage} />
        </main>
      </div>
    );
  };
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminPage);