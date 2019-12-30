import React, { Component } from 'react'
import { CountUp } from 'countup.js'
import '../App.css'

export default class MonthCard extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      currentTotal: 0,
      user_id: this.props.user_id
    }
  }

  countUpCal() {
    let to = this.state.currentTotal
    const countUp = new CountUp(this.props.month, to);
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
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

  componentDidMount(){
    var month = this.props.month
    var id = this.state.user_id
    fetch('http://localhost:3000/api/monthly-records/'+id+'/'+month)
    .then(res => res.json())
    .then(
      (result) => {
        var total = 0
        result.forEach(record => total += Number(record.calories))
        this.setState({
          currentTotal: total
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }

  render() {
    console.log(this.state.currentTotal)
    return (
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{this.convertMonth(this.props.month)}</h5>
        <div class="d-flex flex-row justify-content-center">
        <h6 class="card-subtitle mb-2 text-muted" id={this.props.month}> </h6>
            {this.countUpCal()}
        <p class="card-subtitle mb-2 text-muted"> kcal</p>
        </div>
        <p href="#" class="card-link"> </p>
      </div>
    </div>
    )
  }
}