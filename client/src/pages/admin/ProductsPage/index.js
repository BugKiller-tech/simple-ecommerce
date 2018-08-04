import React, { Component } from 'react';
import { 
  withStyles,
  TextField, Paper,
  Select, MenuItem,
  Input, InputLabel, FormHelperText, FormControl,
  Button, IconButton,
  Snackbar,
} from '@material-ui/core';
import { 
  Edit as EditIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import { fetchAllCategories } from '../../../actions/categories';
import { fetchAllProducts } from '../../../actions/products';
import Api from '../../../api';


const styles = {
  paperPadding: {
    padding: '10px',
    textAlign: 'center',
    minHeight: '90vh'
  }
}
class ProductsPage extends Component {

  state = {
    selectedCategoryId: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    imgSrc: '',

    isEditmode: false,
    selectedProductId: '',
    snackBarOpen: false,
    snackbarMessage: '',
    errors: {},
    loading: false,
  }

  componentDidMount = () => {
    this.fetchCategoryList();
    this.fetchProductList();
  }
  fetchCategoryList() {
    this.props.fetchAllCategories();
  }
  fetchProductList() {
    this.props.fetchAllProducts();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleChangeCategory = name => event => {
    this.setState({
      [name]: event.target.value,
      selectedProductId: '',
      isEditmode: false,
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      imgSrc: '',
    });
  };

  onSubmit = () => {
    const errors = {}
    if (this.state.selectedCategoryId == '') errors['selectedCategoryId'] = 'Please pick the category for this product.'
    if (this.state.name == '') { errors['name'] = 'Please input the name'; }
    if (this.state.description == '') { errors['description'] = 'Please input the description'; }
    if (this.state.price <= 0) { errors['price'] = 'Please input the price as greater than 0'; }
    if (this.state.isEditmode == false &&  this.state.imageUrl == '') { errors['imageUrl'] = 'Please pick one image file'; }
    this.setState({ errors })
    if (Object.keys(errors).length > 0) { return }

    const formData = new FormData();
    if (this.state.isEditmode) formData.append('_id',this.state.selectedProductId);
    if (this.state.imageUrl != '') formData.append('product', this.state.imageUrl);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('price', this.state.price);
    formData.append('category', this.state.selectedCategoryId);

    Api.createProduct(formData)
    .then(res => {
      if (this.state.isEditmode)
        this.setState({ name: '', description: '', price: 0, imgSrc: '', snackBarOpen: true, snackbarMessage: 'Successfully updated category', isEditmode: false })
      else
        this.setState({ name: '', description: '', price: 0, imgSrc: '', snackBarOpen: true, snackbarMessage: 'Successfully created product' })

      this.fetchProductList();
    })
    .catch(err => {
      this.setState({ snackBarOpen: true, snackbarMessage: err.response.data.message });
    })

  }

  setEditMode = (data) => {
    this.setState({
      selectedProductId: data.value,
      name: data.original.name,
      description: data.original.description,
      price: data.original.price,
      imgSrc: data.original.imageUrl,  // this is for preview
      isEditmode: true
    })
  }
  cancelEdit = () => {
    this.setState({ selectedProductId: '',  name: '',  description: '', price: 0, imageUrl: '', imgSrc: '', isEditmode: false })
  }
  deleteCategory = (data) => {
    if (!window.confirm('Do you want to delete this category ?')) { return; }
    Api.deleteCategory({
      _id: data.value
    })
    .then(res => { 
      this.setState({ name: '', description: '', snackBarOpen: true, snackbarMessage: 'Successfully deleted category' })
      this.fetchCategoryList();
     })
    .catch(err => { this.setState({ snackBarOpen: true, snackbarMessage: err.response.data.message }); });
  }

  onChangeFile = (e) => {
    if (e.target.files[0]) {
      this.setState({
          imageUrl: e.target.files[0],
          imgSrc: URL.createObjectURL(e.target.files[0])
      })
    }
  }


  render() {
    const { classes, categories, products } = this.props;
    const { errors, isEditmode } = this.state;
    const tableConfig = [
      {
        Header:'Product Name',
        accessor: 'name'
      },
      {
        Header:'Category Description',
        accessor: 'description'
      },
      {
        Header:'Image',
        accessor: 'imageUrl',
        Cell: (data) => (
          <div><img className="img-thumbnail" src={data.value} style={{maxHeight: '100px' }} /></div>
        )
      },
      {
        Header: 'Action',
        accessor: '_id',
        Cell: data => (
          <div>
            <IconButton onClick={() => this.setEditMode(data) }><EditIcon/></IconButton>
            <IconButton onClick={() => this.deleteCategory(data) }><DeleteIcon/></IconButton>
          </div>          
        )
      }
    ]
    const filteredProducts = products.filter(item => {
      return item.category._id == this.state.selectedCategoryId
    })

    const categoryOptions = categories.map((item, idx) => (
      <MenuItem value={item._id} key={idx}>{item.name}</MenuItem>
    ))


    return (
      <div className="container-fluid">
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
        <div className="row">
          <div className="col-md-4">
            <Paper elevation={1} className={classes.paperPadding}>
              <h3>{ isEditmode ? ('Edit Product') : ('Create Product') }</h3>

              <form>
                <FormControl className={classes.formControl} fullWidth={true}>
                  <Select
                    value={this.state.selectedCategoryId}
                    fullWidth={true}
                    name="category"
                    onChange={this.handleChangeCategory('selectedCategoryId')} >
                    { categoryOptions }
                  </Select>
                  { errors.selectedCategoryId && (<FormHelperText error={true}>{ errors.selectedCategoryId }</FormHelperText>) }
                </FormControl>
                
                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input id="name" value={this.state.name} onChange={this.handleChange('name')} error={errors.name} />
                  { errors.name && (<FormHelperText error={true}>{ errors.name }</FormHelperText>) }
                </FormControl>

                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input id="description" value={this.state.description} onChange={this.handleChange('description')} multiline={true} rows={7} error={errors.description} />
                  { errors.description && (<FormHelperText  error={true}>{errors.description } </FormHelperText>) }
                </FormControl>

                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel htmlFor="description">Price</InputLabel>
                  <Input id="price" type="number" step="0.01" value={this.state.price} onChange={this.handleChange('price')} error={errors.price} />
                  { errors.price && (<FormHelperText  error={true}>{errors.price}</FormHelperText>) }
                </FormControl>
                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel htmlFor="description">Image File</InputLabel>
                  <input type="file" name="imageUrl" onChange={this.onChangeFile} className="form-control" style={{ marginTop: '40px' }} />
                  { errors.imageUrl && (<FormHelperText  error={true}>{errors.imageUrl}</FormHelperText>) }
                </FormControl>
               
                <Button 
                  variant="contained" color="primary"
                  className="mt-2"
                  onClick={this.onSubmit}
                >{ isEditmode ? 'Edit Product' : 'Create Product' }</Button>
                &nbsp;&nbsp;&nbsp;
                { isEditmode && (
                <Button 
                  variant="contained" color="secondary"
                  className="mt-2"
                  onClick={this.cancelEdit}
                >Cancel</Button>
                )}
                <br />
                <img src={this.state.imgSrc} className="img-thumbnail" style={{ maxHeight: '370px' }} />
                
              </form>


            </Paper>
          </div>
          <div className="col-md-8">
            <Paper elevation={1} className={classes.paperPadding}>
              <h3> All Products </h3>
              <ReactTable 
                columns={tableConfig}
                data={filteredProducts}
                defaultPageSize={10}
              />
            </Paper>              
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories.categories,
    products: state.products.products,
  }
}

export default connect(mapStateToProps, 
  { 
    fetchAllCategories,
    fetchAllProducts
  }
)(
  withStyles(styles)(ProductsPage)
)
