import React, { Component } from 'react';
import { Router, Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import MainPage from './client/MainPage';
import ShopPage from './client/ShopPage';
import MyCartPage from './client/MyCartPage';

import AdminPage from './admin/AdminPage';

class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/cart' component={MyCartPage} />

          <Route path='/admin' component={AdminPage} />
          <Route path='/' component={ShopPage} />
          {/* <Route path='/' component={MainPage} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes