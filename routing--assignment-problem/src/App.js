import React, { Component } from 'react';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <nav>
            <ul>
              <li><Link to='/courses'>Courses</Link></li>
              <li><Link to='/users'>Users</Link></li>
            </ul>
          </nav>
          <ol style={{ textAlign: 'left' }}>
            <li>Load the "Course" component as a nested component of "Courses"</li>
            <li>Add a 404 error page and render it for any unknown routes</li>
            <li>Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
          </ol>
          <Switch>

            <Route path='/courses' component={Courses}></Route>
            <Route path='/users' component={Users}></Route>
            <Redirect from="/all-courses" to="/courses" />
            <Route render={()=>{return (<div>404 not found</div>)}} />
          </Switch>


        </div>
      </BrowserRouter>
    );
  }
}

export default App;
