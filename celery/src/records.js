import React, { Component } from 'react'
import auth from './auth'
import Calories from './components/Calories'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

export default class records extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      user_id: this.props.location.state.id,
      user_name: this.props.location.state.name,
      user_surname: this.props.location.state.surname,
      records:[],
      currentTotal: 0,
      prevTotal: 0
    }
  }

  componentDidMount(){
    let id = this.state.user_id
    console.log('RECORDS MOUNTED')
    fetch('http://localhost:3000/api/records/'+id)
    .then(res => res.json())
    .then(
      (result) => {

        var total = 0
        result.forEach(record => total += Number(record.kcal))
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
          let records = this.state.records
          records.push(record_data)
          let currentTotal = this.state.currentTotal
          let newTotal = currentTotal + Number(record_data.kcal)
          this.setState({
            records: records,
            prevTotal: currentTotal,
            currentTotal: newTotal
          })
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
          let newTotal = currentTotal - Number(record.kcal)
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

  render() {
    let records = this.state.records
    let name = this.state.user_name
    let surname = this.state.user_surname
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
        <div class="d-flex justify-content-center">
          <form id="limit">
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
              <div class="col">
                <input type="text" class="form-control" ref='calories' placeholder='Calories (kcal)'/>
              </div>
              <div class="col">
                <input type="text" class="form-control" ref='menu' placeholder='Menu'/>
              </div>
              <button class="btn btn-info my-2 my-sm-0" onClick={this.addRecord.bind(this)}>
                Add
              </button>
            </div>
          </form>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Calories (kcal)</th>
              <th scope="col">Menu</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {records.map(record =>
            <tr>
              <td>{record.time}</td>
              <td>{record.kcal}</td>
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
        <Calories prevTotal={this.state.prevTotal} currentTotal={this.state.currentTotal}/>
      </div>
    )
  }
}
