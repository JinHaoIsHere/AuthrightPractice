import React, {Component} from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
  state={
    showSideDrawer: false
  }
  sideDrawerCloseHandler = ()=>{
    this.setState({showSideDrawer: false});
  }

  sideDrawerOpenHandler = ()=>{
    this.setState((prevState)=>{
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }
  render(){
    return (
      <Aux>
        <Toolbar opened = {this.sideDrawerOpenHandler}></Toolbar>
        <SideDrawer closed={this.sideDrawerCloseHandler} open={this.state.showSideDrawer}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
      
    )   
  }
};

export default Layout;