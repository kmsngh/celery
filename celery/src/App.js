import React, { Component } from 'react'
import LandingPage from './landingPage'
import Records from './records'
import { ProtectedRoute } from './protectedRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
  Route,
  Switch
} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <ProtectedRoute exact path='/records' component={Records}/>
          <Route path='*' component={()=>'404 NOT FOUND'}/>
        </Switch>
      </div>
    )
  }
}

