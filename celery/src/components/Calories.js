import React, { Component } from 'react'
import { CountUp } from 'countup.js'

export default class Calories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goal: 2000
    }
  }

  componentDidMount(){
    var id = this.props.user_id
    fetch('http://localhost:3000/api/goals/'+id)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          goal: result[0].maxcal
        })
        console.log(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  countUpCal() {
    let from = this.props.prevTotal
    let to = this.props.currentTotal
    const countUp = new CountUp('totalcal', to, {startVal: from});
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  }

  calAlert() {
    var curr = this.props.currentTotal
    var goal = this.state.goal
    if (curr <= goal) {
      return "You can consume " + (goal-curr) + ' more kcal!'
    }
    else {
      return "You have passed your calorie limit!"
    }
  }

  changeMaxCal(){
    var id = this.props.user_id
    var goal = this.refs.goal.value
    console.log(goal)
    fetch('http://localhost:3000/api/change-goals/'+id+'/'+goal)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            goal: goal
          })
          console.log(result)
        },
        (error) => {
          console.log(error)
        }
      )
    this.forceUpdate()
  }


  render() {
    var goal = this.state.goal
    return (
      <div>
      <div class="fixed-bottom jumbotron">
        <div class="d-flex justify-content-center align-items-end" id='calnumber'>
          <h1 class="display-2" id='totalcal'> </h1>
            {this.countUpCal()}
          <h1 class="display-4">kcal</h1>
        </div>
        <p class="lead">{this.calAlert()}</p>
        <hr class="my-4"/>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#changeGoal">
          Set your calorie limit
        </button>
      </div>
      <div class="modal fade" id="changeGoal" tabindex="-1" role="dialog" aria-labelledby="changeGoalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="changeGoalLabel">Set calorie limit</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form name='goalform'>
                <input class="form-control mr-sm-2" type='text' ref='goal' placeholder={goal}/>
                <div class='d-flex flex-row-reverse'>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.changeMaxCal.bind(this)}>Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}
