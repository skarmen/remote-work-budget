import React, { Component } from 'react';

// Import Packages
import Swal from "sweetalert2";


class Currencies extends Component {
  constructor() {
    super();
    this.state = {
      housing: 0,
      bills: 0,
      entertainment: 0,
      food: 0,
      transport: 0,
      convertedIncome: 0,
      totalExpenses: 0,
      surplusShortage: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (evt) => {
    // and use it to target the key on our `state` object with the same name, using bracket syntax
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  calculateIncome = () => {
    // result is the userIncome in the new currency.
    let result = this.props.userIncome * this.props.targetRate;

    this.setState({
      convertedIncome: result.toFixed(2)
    }, () => {
      // call the surplus shortage function only when the convertedIncome is updated
      this.calculateSurplusShortage()
    })
  }

  calculateSurplusShortage = () => {
    // get the annual expenses in the new currency
    let newSurplusShortage = this.state.convertedIncome - this.state.totalExpenses
    this.setState({
      surplusShortage: newSurplusShortage.toFixed(2)
    })
  }



  calculateTotalExpenses = () => {
    // array to store all the string values from the state
    let expensesArray = [
      this.state.food,
      this.state.housing,
      this.state.bills,
      this.state.transport,
      this.state.entertainment
    ]
    // converting to array of numbers to use later in the calculation
    let newExpensesArray = expensesArray.map(number => {
      return parseFloat(number)
    })


    // building the calculation
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // takes the number array and uses the reducer to calculate the total sum of expenses
    let newTotal = newExpensesArray.reduce(reducer);
    if (this.props.targetRate) {
      this.setState(
        {
          totalExpenses: newTotal.toFixed(2),
        },
        () => {
          this.calculateIncome()
        }
      )
    } else {
       Swal.fire({
					text: `Please select target currency.`,
					showClass: {
						popup: 'animate__animated animate__fadeInDown',
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutUp',
					},
				})
    }
  }


  render() {
    return (
			<div>
				<div className="expenses">
					<div className="wrapper">
						<div className="expense">
							<label htmlFor="">Housing</label>
							<input
								name="housing"
								type="text"
								id="housing"
								onChange={this.handleChange}
								value={this.state.expensesArray}
							/>
						</div>
						<div className="expense">
							<label htmlFor="">Bills</label>
							<input
								name="bills"
								type="text"
								id="bills"
								onChange={this.handleChange}
								value={this.state.expensesArray}
							/>
						</div>
						<div className="expense">
							<label htmlFor="">Food</label>
							<input
								name="food"
								type="text"
								id="food"
								onChange={this.handleChange}
								value={this.state.expensesArray}
							/>
						</div>
						<div className="expense">
							<label htmlFor="">Transport</label>
							<input
								name="transport"
								type="text"
								id="transport"
								onChange={this.handleChange}
								value={this.state.expensesArray}
							/>
						</div>
						<div className="expense">
							<label htmlFor="">Entertainment</label>
							<input
								name="entertainment"
								type="text"
								id="entertainment"
								onChange={this.handleChange}
								value={this.state.expensesArray}
							/>
						</div>
						<div className="totalExpenses">
							<button
								className="calculateTotal"
								onClick={this.calculateTotalExpenses}
							>
								Calculate Total
							</button>
							{/* use conditional statement to display */}
							<p>Total: ${this.state.totalExpenses}</p>
						</div>
					</div>
				</div>
				<div className="results">
					<div className="wrapper">
						<h2>
							Your <span className="lineOne">Future</span> Financial Status
						</h2>
						<p>
							You are making: <br />
							<span className="resultStyle">
								${new Intl.NumberFormat().format(this.state.convertedIncome)}
							</span>
							&nbsp;
							{this.props.targetCurrencyCode}
						</p>

						{this.state.surplusShortage > 0 ? (
							<p>
								Your surplus is: <br />
								<span className="resultStyle">
									${new Intl.NumberFormat().format(this.state.surplusShortage)}
								</span>
								&nbsp;
								{this.props.targetCurrencyCode}
							</p>
						) : (
							<p>
								Your shortage is: <br />
								<span className="resultStyle">
									${new Intl.NumberFormat().format(this.state.surplusShortage)}
								</span>
								&nbsp;
								{this.props.targetCurrencyCode}
							</p>
						)}
					</div>
				</div>
			</div>
		)
  }
}
export default Currencies;