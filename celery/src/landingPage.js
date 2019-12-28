import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import auth from './auth'

export default class landingPage extends Component {
  constructor(props)  {
    super(props)
    this.state = {
      title:'Celery',
      users:[]
    }

  }

  componentDidMount() {
    console.log('COMPONENTDIDMOUNT')
    fetch('http://localhost:3000/api/users')
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          users: result
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }

  addUser(event){
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

  removeUser(id){
    var request = new Request('http://localhost:3000/api/remove/'+id, {
      method: 'DELETE',
    })

    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          let users = this.state.users
          let user = users.find(user => user.id === id)
          users.splice(users.indexOf(user),1)
          this.setState({
            users: users
          })
          console.log("User removed")
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {
    let users = this.state.users
    return (
      <div className='App'>
        <h2>Add User</h2>
        <form ref='usersForm'>
          <input type='text' ref='name' placeholder='Name'/>
          <input type='text' ref='surname' placeholder='Surname'/>
          <button onClick={this.addUser.bind(this)}>Create</button>
        </form>
        <ul>
          {users.map(user =>
          <li key={user.id}>
            {user.name} {user.surname}
            <Link
            onClick={
              () => {
                auth.login()
              }
            }
            to={{
              pathname: '/records',
              state: {
                id: user.id
              }
            }}

            >
              Login
            </Link>
            <button onClick={this.removeUser.bind(this, user.id)}>
              Remove
            </button>
          </li>)}
        </ul>
        {/* <pre>{JSON.stringify(users)}</pre> */}
      </div>
    )
  }
}
