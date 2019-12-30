import React, { Component } from 'react'
import MonthCard from './MonthCard'
import '../App.css'

export default class MonthlyRecords extends Component {
  render() {
    var id = this.props.state.user_id
    return (
      <div class="container monthly-records">
        <div class="row">
          <div class="col">
            <MonthCard user_id={id} month='1'/>
          </div>
          <div class="col">
            <MonthCard user_id={id} month='2'/>
          </div>
          <div class="col">
            <MonthCard user_id={id} month='3'/>
          </div>
          <div class="col">
            <MonthCard user_id={id} month='4'/>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <MonthCard user_id={id} month='5'/>
          </div>
          <div class="col-sm">
            <MonthCard user_id={id} month='6'/>
          </div>
          <div class="col-sm">
            <MonthCard user_id={id} month='7'/>
          </div>
          <div class="col-sm">
            <MonthCard user_id={id} month='8'/>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <MonthCard user_id={id} month='9'/>
          </div>
          <div class="col-sm">
            <MonthCard user_id={id} month='10'/>
          </div>
          <div class="col-sm">
            <MonthCard user_id={id} month='11'/>
          </div>
          <div class="col-sm">
            <MonthCard user_id={id} month='12'/>
          </div>
        </div>
      </div>
    )
  }
}
