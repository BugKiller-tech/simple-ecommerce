import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Api from '../../../api';
import {
  Paper,
  LinearProgress,
  IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Chip
} from '@material-ui/core';
import { 
  List as ListIcon,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../../../actions/orders';

class OrdersPage extends Component {

  state = {

    openModal: false,

    selectedOrder: {},
    loading: false,
  }

  componentDidMount = () => {
    this.fetchOrders();    
  }
  fetchOrders = () => {
    this.props.fetchAllOrders();    
  }

  handleOpenModal = scroll => () => {
    this.setState({ openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  displayDetailForOrder = (order) => {
    this.setState({
      openModal: true,
      selectedOrder: order
    })
  }

  setAsDelivered = (_id) => {
    if (!window.confirm('Do you want to make this as delivered?')) { return; }
    Api.setAsDeliveredOrder({ _id })
    .then(res => {
      this.handleCloseModal();
      this.fetchOrders()
    })
    .catch(err => {
      alert('Can not make this as delivered!')
    })
  }

  render () {
    const { loading, selectedOrder } = this.state;
    const { orders } = this.props;
    const tableConfig = [
      {
        Header: 'Order ID',
        accessor: 'orderId'
      },
      {
        Header: 'User',
        accessor: 'user',
        Cell: data => (
          <div>{data.value ? data.value.firstName + ' ' + data.value.lastName : 'Unknown'}</div>
        )
      },
      {
        Header: 'Paid Id',
        accessor: 'paymentId'
      },
      {
        Header: 'Delivery Status',
        accessor: 'delivered',
        Cell: data => (
          <div>
            { data.value ? <span class="badge badge-success">Delivered</span> : <span class="badge badge-warning">Delivering</span> }
          </div>
        )
      },
      {
        Header: 'View',
        accessor: 'orders',
        Cell: data => (
          <div>
            <IconButton onClick={ () => this.displayDetailForOrder(data.original) }><ListIcon></ListIcon></IconButton>
          </div>
        )
      },
    ];

    let selectedOrderDetail = (<div></div>);
    let selectedOrderTotalPrice = 0;
    if (selectedOrder && selectedOrder.orders) {
      selectedOrderDetail = selectedOrder.orders.map((item, idx) => {
        selectedOrderTotalPrice += item.price * item.count
        return (
          <div className="row" key={idx}>
            <div className="col-md-3">
              <img src={item.imageUrl} className="img-thumbnail"/>
            </div>
            <div className="col-md-6"> { item.name } - <Chip label={item.category ? item.category.name : 'Unknow Category' }></Chip>  </div>
            <div className="col-md-3"> { '$' + item.price + ' X ' + item.count + ' = ' + item.price * item.count }  </div>
          </div>
        )
      });
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            {loading && <LinearProgress />}
          </div>
          <div className="col-md-2">

          </div>
        </div>
        <Paper elevation={2} style={{ padding: '20px' }}>
          <h3>Order Management</h3>
          <ReactTable 
            columns = {tableConfig}
            data={orders}
          />
        </Paper>


        <Dialog
          fullWidth
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Order Details</DialogTitle>
          <DialogContent>
          <hr />
          {   selectedOrderDetail   }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseModal} color="primary">
              Close
            </Button>
            <Button onClick={() => this.setAsDelivered(selectedOrder._id)} color="primary" variant="outlined">
              Set As Delivered
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.orders.orders
  }
}
export default connect(
  mapStateToProps,
  { fetchAllOrders }
)(OrdersPage);