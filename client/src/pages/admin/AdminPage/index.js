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
  Button,
} from '@material-ui/core';
import { 
  Menu as MenuIcon, 
  Send as SendIcon,
  Drafts as DraftsIcon,
  Category as CategoryIcon,
  Work as WorkIcon,
  List as ListIcon,
  ExitToApp as ExitToAppIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import { Route, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { userLogout } from '../../../actions/users';

import CategoryPage from '../CategoryPage';
import ProductsPage from '../ProductsPage';
import OrdersPage from '../OrdersPage';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'scroll',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    paddingTop: '50px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


  

class  AdminPage extends Component{

  state = {
    open: false,
  };

  componentDidMount = () => {
    if (!this.props.isAdmin) {
      this.props.history.push('/');
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  gotoHomePage = () => {
    this.props.history.push('/');
  }
  
  signOut = () => {
    this.props.userLogout();
    this.props.history.push('/');
  }

  render() {
    const { classes, theme, match } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap style={{ flexGrow: 1 }}>
              Admin Page
            </Typography>
            <Button onClick={this.gotoHomePage} color="inherit">Goto Home Page</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />

          <List
              component="nav"
              // subheader={<ListSubheader component="div">Please pick one</ListSubheader>}
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

            <ListItem button onClick={this.signOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText inset primary="Log out" />
            </ListItem>
          </List>
          
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar}>
            <Route path={`${match.url}/categories`} component={CategoryPage} />
            <Route path={`${match.url}/products`} component={ProductsPage} />
            <Route path={`${match.url}/orders`} component={OrdersPage} />
          </div>
        </main>
      </div>
    );
  }
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAdmin: (state.auth.user && state.auth.user.isAdmin),
  }
}

export default connect(
  mapStateToProps,
  { userLogout }
)(withStyles(styles, { withTheme: true })(AdminPage));
