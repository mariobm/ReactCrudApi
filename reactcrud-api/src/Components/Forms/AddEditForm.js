import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    name: '',
    category: '',
    price: '',
    stocked: false,
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onStockChange = e => {
    this.setState({stocked: e.target.checked})
  } 

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        category: this.state.category,
        price: this.state.price,
        stocked: this.state.stocked
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        category: this.state.category,
        price: this.state.price,
        stocked: this.state.stocked
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, name, category, price, stocked } = this.props.item
      this.setState({ id, name, category, price, stocked })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">Product name</Label>
          <Input type="text" name="name" id="first" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Category</Label>
          <Input type="text" name="category" id="last" onChange={this.onChange} value={this.state.category === null ? '' : this.state.category}  />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="number" name="price" id="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price}  />
        </FormGroup>
        <FormGroup>
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" name="stocked" id="defaultUnchecked" onChange={this.onStockChange} value={this.state.stocked === null ? '' : this.state.stocked} />
            <Label className="custom-control-label" for="defaultUnchecked">On stock</Label>
        </div>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm