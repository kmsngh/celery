import React, { Component } from 'react'
import auth from './auth'

export default class records extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      userid: this.props.location.state.id,
      userRecords:[]
    }

  }
  componentDidMount(){
    let id = this.state.userid
    console.log('RECORDS MOUNTED')
    fetch('http://localhost:3000/api/records/'+id)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          userRecords: result
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }

  addRecord(event) {
    event.preventDefault()
    let user_data = {
      name: this.refs.name.value,
      surname: this.refs.surname.value,
      id: Math.random().toFixed(15)
    }
    var request = new Request('http://localhost:3000/api/new-user', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(user_data)
    })



    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          let users = this.state.users
          users.push(user_data)
          console.log(users)
          this.setState({
            users: users
          })
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          auth.logout(() => {
            this.props.history.push('/')
          })
        }}>
          Log Out
        </button>
        <div>
          <form ref='recordsForm'>
            <input type='datetime-local' ref='time' placeholder='Time'/>
            <input type='text' ref='kcal' placeholder='Calories (kcal)'/>
            <input type='text' ref='menu' placeholder='Menu'/>
            <button onClick={this.addRecord.bind(this)}>Create</button>
          </form>
        </div>
      </div>
    )
  }
}
