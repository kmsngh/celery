import React, { Component } from 'react'
import auth from './auth'
import DailyRecords from './components/DailyRecords'
import MonthlyRecords from './components/MonthlyRecords'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

export default class records extends Component {
  constructor(props)  {
    super(props)
    var d = new Date()
    this.state = {
      user_id: this.props.location.state.id,
      user_name: this.props.location.state.name,
      user_surname: this.props.location.state.surname,
      records:[],
      currentTotal: 0,
      prevTotal: 0,
      currMonth: String(d.getMonth() + 1),
      currDay: String(d.getDate()),
      active: 0
    }
    this.active= 0
  }


  render() {
    let name = this.state.user_name
    let surname = this.state.user_surname
    var active = (<div>
      <ul class="nav nav-pills nav-fill">
      <li class="nav-item">
        <p style={{cursor:'pointer'}} class="nav-link active">Daily</p>
      </li>
      <li class="nav-item">
        <p style={{cursor:'pointer'}} class="nav-link" onClick={()=>{this.setState({active:1})}}>Monthly</p>
      </li>
      </ul>
      <DailyRecords state={this.state}/>
    </div>)
    if(this.state.active === 1) {
      active = (<div>
        <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
          <p style={{cursor:'pointer'}} class="nav-link"onClick={()=>{this.setState({active:0})}}>Daily</p>
        </li>
        <li class="nav-item">
          <p style={{cursor:'pointer'}} class="nav-link active">Monthly</p>
        </li>
        </ul>
        <MonthlyRecords state={this.state}/>
      </div>)
    }
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <a href='/' class="navbar-brand">Celery</a>
          <span class="navbar-text">
            Logged in as {name} {surname}
          </span>
          <button class="btn btn-danger my-2 my-sm-0" onClick={() => {auth.logout(() => {this.props.history.push('/')})}}>
            Log Out
          </button>
        </nav>
        
        <div>
        {active}
        </div>
      </div>
    )
  }
}
