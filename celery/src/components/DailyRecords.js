import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '../App.css'
import Calories from './Calories'

export default class DailyRecords extends Component {
  
  constructor(props){
    super(props)
    this.state = this.props.state
  }

  componentDidMount(){
    var month = this.state.currMonth
    var day = this.state.currDay
    let id = this.state.user_id
    console.log('RECORDS MOUNTED')
    fetch('http://localhost:3000/api/records/'+id+'/'+month+'/'+day)
    .then(res => res.json())
    .then(
      (result) => {
        var total = 0
        result.forEach(record => total += Number(record.calories))
        var currentTotal = this.state.currentTotal

        this.setState({
          records: result,
          prevTotal: currentTotal,
          currentTotal: total
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }
  
  addRecord(event) {
    event.preventDefault()
    let record_data = {
      id: Math.random().toFixed(15),
      user_id: this.state.user_id,
      month: this.refs.month.value,
      day: this.refs.day.value,
      mealtype: this.refs.mealtype.value,
      calories: this.refs.calories.value,
      menu: this.refs.menu.value
    }
    var request = new Request('http://localhost:3000/api/new-record', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(record_data)
    })

    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
          if (record_data.month === this.state.currMonth && record_data.day === this.state.currDay) {
            let records = this.state.records
            records.push(record_data)
            let currentTotal = this.state.currentTotal
            let newTotal = currentTotal + Number(record_data.calories)
            this.setState({
              records: records,
              prevTotal: currentTotal,
              currentTotal: newTotal
            })
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }

  removeRecord(id){
    var request = new Request('http://localhost:3000/api/remove-record/'+id, {
      method: 'DELETE'
    })

    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          let records = this.state.records
          let record = records.find(record => record.id === id)
          records.splice(records.indexOf(record),1)
          let currentTotal = this.state.currentTotal
          let newTotal = currentTotal - Number(record.calories)
          this.setState({
            records: records,
            prevTotal: currentTotal,
            currentTotal: newTotal
          })
          console.log("Record removed")
        },
        (error) => {
          console.log(error)
        }
      )
  }

  updateRecords(event){
    event.preventDefault()
    var month = this.refs.month1.value
    var day = this.refs.day1.value
    var id = this.state.user_id
    this.setState({
      currDay: day,
      currMonth: month
    })
    fetch('http://localhost:3000/api/records/'+id+'/'+month+'/'+day)
    .then(res => res.json())
    .then(
      (result) => {
        var total = 0
        result.forEach(record => total += Number(record.calories))
        var currentTotal = this.state.currentTotal

        this.setState({
          records: result,
          prevTotal: currentTotal,
          currentTotal: total
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }

  mealType(i) {
    switch(i) {
      case '1':
        return 'Breakfast'
      case '2':
        return 'Lunch'
      case '3':
        return 'Dinner'
      case '4':
        return 'Snack'
      default:
        return 'ERROR'
    }
  }


  convertMonth(m) {
    switch (m){
      case '1':
        return 'January'
      case '2':
        return 'February'
      case '3':
        return 'March'
      case '4':
        return 'April'
      case '5':
        return 'May'
      case '6':
        return 'June'
      case '7':
        return 'July'
      case '8':
        return 'August'
      case '9':
        return 'September'
      case '10':
        return 'October'
      case '11':
        return 'November'
      case '12':
        return "December"
      default:
        return "ERROR"
    }
  }

  render() {
    return (
      <div name='Daily table'>
        <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#newRecord">
        Add new record
        </button>
      <div class="modal fade" id="newRecord" tabindex="-1" role="dialog" aria-labelledby="newRecordLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="newRecordLabel">Add new record</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form name='newrecordform'>
          <form>
            <div class="form-row">
              <div class="col">
                <select class="form-control" ref='month' name='Month'>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div class="col">
                <select class="form-control" ref='day' name='Day'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              </div>
              <div class="col">
                <select class="form-control" type="text" ref='mealtype' name='Meal type'>
                  <option value="1">Breakfast</option>
                  <option value="2">Lunch</option>
                  <option value="3">Dinner</option>
                  <option value="4">Snack</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <input type="text" class="form-control" ref='calories' placeholder='Calories (kcal)'/>
              </div>
              <div class="col">
                <input type="text" class="form-control" ref='menu' placeholder='Menu'/>
              </div>
            </div>
            <div class="form-row">
              <div class="col">
              <button data-dismiss="modal" class="btn btn-info" onClick={this.addRecord.bind(this)}>
                Add
              </button>
              </div>
            </div>
          </form>
              </form>
            </div>
          </div>
        </div>
      </div>
        </div>
        <div class="text-center">
          <h5 class='float-center text-center'>Record from {this.convertMonth(this.state.currMonth)} {this.state.currDay}</h5>
        </div>
        <div class="d-flex justify-content-center">
          <form id="limit2">
            <div class="form-row">
              <div class="col">
                <select class="form-control" ref='month1' name='Month'>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div class="col">
                <select class="form-control" ref='day1' name='Day'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              </div>
              <button class="btn btn-info my-2 my-sm-0" onClick={this.updateRecords.bind(this)}>
                Search
              </button>
            </div>
          </form>
        </div>
        <div class='records'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Meal Type</th>
              <th scope="col">Calories (kcal)</th>
              <th scope="col">Menu</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {this.state.records.map(record =>
            <tr>
              <td>{this.mealType(record.mealtype)}</td>
              <td>{record.calories}</td>
              <td>{record.menu}</td>
              <td>
              <button type="button" class="close" aria-label="Close" onClick={this.removeRecord.bind(this, record.id)}>
                <span aria-hidden="true">&times;</span>
              </button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        </div>
        <Calories prevTotal={this.state.prevTotal} currentTotal={this.state.currentTotal} user_id={this.state.user_id}/>
      </div>
    )
  }
}
