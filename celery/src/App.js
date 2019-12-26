import React, { Component } from 'react';
import './App.css';
// import styled from "styled-components"

// const HeaderWrapper = styled.header`
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	width: 100%;
// 	height: 50px;
// 	background: #70a758;
// 	transition: 0.4s;
// 	z-index: 1000;`

export default class App extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      title:'Celery',
      users:[]
    }
  }

  componentDidMount() {
    console.log('COMPONENTDIDMOUNT');
  }

  addUser(event){
    event.preventDefault();
    let data = {
      name: this.refs.name.value,
      surname: this.refs.surname.value,
      id: Math.random().toFixed(3)
    }
    var request = new Request('http://localhost:3050/api/new-user', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(data)
    });

    fetch(request)
      .then(function(response){
        response.json()
          .then(function(data){
          })
      })
      .catch(function(err) {
        console.log(err)
      })
  }


  render() {
    return (
      <div className='App'>
        <h2>Add User</h2>
        <form ref='usersForm'>
          <input type='text' ref='name' placeholder='Name'/>
          <input type='text' ref='surname' placeholder='Surname'/>
          <button onClick={this.addUser.bind(this)}>Create</button>
        </form>
      </div>
      
    )
  }
}
