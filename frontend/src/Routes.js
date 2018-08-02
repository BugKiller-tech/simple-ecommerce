import React, { Component } from 'react';
import { Router, Route, BrowserRouter, Switch } from 'react-router-dom';

import Login from './pages/Login';
import MainPage from './pages/client/MainPage';
import ShopPage from './pages/client/ShopPage';
import MyCartPage from './pages/client/MyCartPage';

import AdminPage from './pages/admin/AdminPage';

class Routes extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/cart' component={MyCartPage} />
          <Route path='/shop' component={ShopPage} />

          <Route path='/admin' component={AdminPage} />
          <Route path='/' component={MainPage} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes