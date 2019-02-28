import React, {Component} from 'react'
import './expirationInput.css'

class ExpirationInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expireDate: String,
			month: Number,
			year: Number,
		}
	}

	//// on change function
	//// give format to expiration date input yearValue
	handleExpirateDate = (event) => {
		let expireLength = event.target.value.split(" ").join("").length;
		if(/^(00)$/.test(event.target.value)) {
			event.preventDefault();
			return this.state.expireDate;
		}

		let expiryDate = event.target.value.match(/(\d{1,2})/g);

		if(expiryDate) {
			if(expiryDate[0].length !== 1) {
				console.log(event.target.value);
				if(!this.validateMonth(expiryDate[0])) {
					event.preventDefault();
					return;
				}
			}
			if(expiryDate[1]) {
				if(!this.validateYear(expiryDate)) {
					event.preventDefault();
					return;
				}
			}
		}



		const expiry = this.formatExpirationDate(event);
		console.log("aca en on change hay: " + expiry);
		if(expiry != null) {
			this.setState({
				expireDate: expiry,
			})
		}
	}

	//// set the format of the expiration date
	formatExpirationDate = (event) => {
		let numberValue = event.target.value;
		if(!numberValue) {
			console.log("error");
		}

		console.log(numberValue);
		if(! /^(\d+)$/.test(numberValue) && !numberValue.includes("/")) {
			event.preventDefault();
			return;
		}

		if( /^[2-9]/.test(numberValue)) {
			numberValue = `0${numberValue}`;
		}

		numberValue = numberValue.match(/(\d{1,2})/g);
		if(numberValue.length === 1) {
			if(numberValue.includes("/")) {
				return numberValue[0];
			}
			if(/\d{2}/.test(numberValue)) {
				return `${numberValue[0]} / `;
			}
		}
		return numberValue.join(" / ");
	}

	//// on key press function
	//// check and validate the number input
	checkExpirationDate = (event) => {
		let expirationValue = "";
		if(event.target.value === this.state.expireDate) {
			 expirationValue = event.target.value.split(' / ').join('/').length;
		}

		if(!expirationValue) return null;
		if(expirationValue >= 5) {
			event.preventDefault();
		}
	}

	validateMonth = (monthValue) => {
		return /(0[1-9]|1[0-2])/.test(monthValue);
	}

	validateYear = (expirationDate) => {
		let actualYear = new Date().getFullYear().toString().substr(-2);
		let [month, year] = expirationDate;

		if(year.length > 1) {
			if(parseInt(year) > parseInt(actualYear)) return true;

			if(parseInt(year) === parseInt(actualYear) && parseInt(month) > new Date().getMonth() + 1 ) {
				return true;
			}
			else return false;
		}

		else {
			if(parseInt(year) >= parseInt(actualYear.substr(0,1))) {
				return true;
			}
		}
		return false
	}

	delete = (e) => {
		if(e.keyCode == '8') {
			console.log("borrando" + [this.state.expireDate]);
			this.setState({
				expireDate: ""
			})
		}
	}

	render() {
		return (
			<div className="dateInputContainer">
				<input
					className="dateInput"
					type="text"
					value={this.state.expireDate}
					onChange={e => this.handleExpirateDate(e)}
					onKeyPress={e => this.checkExpirationDate(e)}
					onKeyDown={e => this.delete(e)}
					placeholder="MM/YY"

					>
				</input>
			</div>
		)
	}

}

export default ExpirationInput;
