import React, { Component } from 'react';
import { 
  withStyles,
  TextField, Paper,
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
import Api from '../../../api';


const styles = {
  paperPadding: {
    padding: '10px',
    textAlign: 'center',
    minHeight: '90vh'
  }
}
class CategoryPage extends Component {

  state = {
    name: '',
    description: '',

    isEditmode: false,
    selectedId: '',
    snackBarOpen: false,
    snackbarMessage: '',
    errors: {},
    loading: false,
  }

  componentDidMount = () => {
    this.fetchCategoryList();
  }
  fetchCategoryList() {
    this.props.fetchAllCategories();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  onSubmit = () => {
    const errors = {}
    if (this.state.name == '') { errors['name'] = 'Please input the name'; }
    if (this.state.description == '') { errors['description'] = 'Please input the description'; }
    this.setState({ errors })
    if (Object.keys(errors).length > 0) { return }

    if (this.state.isEditmode) {
      Api.updateCategory({
        _id: this.state.selectedId,
        name: this.state.name,
        description: this.state.description
      })
      .then(res => {
        this.setState({ name: '', description: '', snackBarOpen: true, snackbarMessage: 'Successfully updated category' })
        this.fetchCategoryList();
      })
      .catch(err => {
        this.setState({ snackBarOpen: true, snackbarMessage: err.response.data.message });
      })
    } else {
      Api.createCategory({
        name: this.state.name,
        description: this.state.description
      })
      .then(res => {
        this.setState({ name: '', description: '', snackBarOpen: true, snackbarMessage: 'Successfully created category' })
        this.fetchCategoryList();
      })
      .catch(err => {
        this.setState({ snackBarOpen: true, snackbarMessage: err.response.data.message });
      })
    }

  }

  setEditMode = (data) => {
    this.setState({
      selectedId: data.value,
      name: data.original.name,
      description: data.original.description,
      isEditmode: true
    })
  }
  cancelEdit = () => {
    this.setState({ selectedId: '',  name: '',  description: '', isEditmode: false })
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

  render() {
    const { classes, categories } = this.props;
    const { errors, isEditmode } = this.state;
    const tableConfig = [
      {
        Header:'Category Name',
        accessor: 'name'
      },
      {
        Header:'Category Description',
        accessor: 'description'
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
              <h3>{ isEditmode ? ('Edit Category') : ('Create Category') }</h3>

              <form>
                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input id="name" value={this.state.name} onChange={this.handleChange('name')} error={errors.name} />
                  { errors.name && (<FormHelperText error={true}>Please input the name</FormHelperText>) }
                </FormControl>

                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <Input id="description" value={this.state.description} onChange={this.handleChange('description')} multiline={true} rows={7} error={errors.description} />
                  { errors.description && (<FormHelperText  error={true}>Please input the description</FormHelperText>) }
                </FormControl>

                
                <Button 
                  variant="contained" color="primary"
                  className="mt-2"
                  onClick={this.onSubmit}
                >{ isEditmode ? 'Edit Category' : 'Create Category' }</Button>
                { isEditmode && (
                <Button 
                  variant="contained" color="secondary"
                  className="mt-2"
                  onClick={this.cancelEdit}
                >Cancel</Button>
                )}

              </form>


            </Paper>
          </div>
          <div className="col-md-8">
            <Paper elevation={1} className={classes.paperPadding}>
              <h3> Categories </h3>
              <ReactTable 
                columns={tableConfig}
                data={categories}
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
  }
}

export default connect(mapStateToProps, { fetchAllCategories })(
  withStyles(styles)(CategoryPage)
)
