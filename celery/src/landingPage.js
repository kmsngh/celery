import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import auth from './auth'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <nav class="navbar navbar-light bg-light">
          <a href='/' class="navbar-brand">Celery</a>
          <form class="form-inline" ref='usersForm'>
            <input class="form-control mr-sm-2" type='text' ref='name' placeholder='Name'/>
            <input class="form-control mr-sm-2" type='text' ref='surname' placeholder='Surname'/>
            <button class="btn btn-outline-success my-2 my-sm-0" onClick={this.addUser.bind(this)}>Create</button>
          </form>
        </nav>
        <div class="d-flex justify-content-center">
          <ul id="limit">
            {users.map(user =>
            <li class="list-group-item" key={user.id}>
              <div class="card-body">
                <h5 class="card-title">{user.name} {user.surname}</h5>
              <Link onClick={() => {auth.login()}}to={{pathname: '/records', state:{id: user.id, name: user.name, surname: user.surname}}}>
                <button class="btn btn-info">Log In</button>
              </Link>
                <button class="btn btn-danger" onClick={this.removeUser.bind(this, user.id)}>Remove</button>
              </div>
            </li>)}
          </ul>
        </div>
      </div>
    )
  }
}
