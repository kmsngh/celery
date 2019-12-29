import React, { Component } from 'react'
import auth from './auth'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class records extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      user_id: this.props.location.state.id,
      user_name: this.props.location.state.name,
      user_surname: this.props.location.state.surname,
      records:[]
    }

  }
  componentDidMount(){
    let id = this.state.user_id
    console.log('RECORDS MOUNTED')
    fetch('http://localhost:3000/api/records/'+id)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          records: result
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
      time: this.refs.time.value,
      kcal: this.refs.kcal.value,
      menu: this.refs.menu.value,
      id: Math.random().toFixed(15),
      user_id: this.state.user_id
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
          console.log(result)
          let records = this.state.records
          records.push(record_data)
          console.log(records)
          this.setState({
            records: records
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
          this.setState({
            records: records
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
        <div>
          <form ref='recordsForm'>
            <input type='text' ref='time' placeholder='Time'/>
            <input type='text' ref='kcal' placeholder='Calories (kcal)'/>
            <input type='text' ref='menu' placeholder='Menu'/>
            <button onClick={this.addRecord.bind(this)}>Create</button>
          </form>
        </div>
        
        <ul>
          {records.map(record =>
          <li key={record.id}>
            {record.time} {record.kcal} {record.menu}
            <button onClick={this.removeRecord.bind(this, record.id)}>
              Remove
            </button>
          </li>)}
        </ul>
      </div>
    )
  }
}
