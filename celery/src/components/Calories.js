import React, { Component } from 'react'
import { CountUp } from 'countup.js'

export default class Calories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goal: 2000
    }
  }

  countUpCal() {
    let from = this.props.prevTotal
    let to = this.props.currentTotal
    console.log(this.props)
    const countUp = new CountUp('totalcal', to, {startVal: from});
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  }

  calAlert() {
    if (this.props.currentTotal < this.state.goal) {
      return "You are safe to eat more!"
    }
    else {
      return "You have passed your calorie limit!"
    }
  }

  render() {
    this.countUpCal()
    return (
      <div class="fixed-bottom jumbotron">
        <div class="d-flex justify-content-center align-items-end">
        <h1 class="display-2" id='totalcal'> </h1>
        <h1 class="display-4">kcal</h1>
        </div>
        <p class="lead">{this.calAlert()}</p>
        <hr class="my-4"/>
        <p></p>
        <a class="btn btn-primary btn-lg" href="/" role="button">Set today's goal</a>
      </div>
    )
  }
}
