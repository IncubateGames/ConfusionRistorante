import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import Menu from './components/MenuComponent';
import './App.css';
import {DISHES} from './shared/dishes';

class App extends Component {
  
  constructor(porps){
    super(porps);

    this.state = {
      dishes: DISHES
    };  
  }

  render() {
    return (
      <div>
        <Navbar dark color='primary'>
          <div className="container">
            <NavbarBrand href="/">Restorante Con Fusion!</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }  
}

export default App;
