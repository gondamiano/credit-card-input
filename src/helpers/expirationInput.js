import React, {Component} from 'react'
import './expirationInput.css'

class ExpirationInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: Number,
			month: Number,
			year: Number,
		}
	}

	checkExpirationDate = (event) => {
		if(event.target.value.length === 2) {
			this.setState({
				number: this.state.number.substring(0,2) + '/' + this.state.number.substring(2,4)
			})
		}
		else if(event.target.value.length === 5) event.preventDefault();
	}

	render() {
		return (
			<div className="dateInputContainer">
				<input
					className="dateInput"
					type="text"
					value={this.state.number}
					onChange={e => this.setState({ number: e.target.value })}
					placeholder="MM/YY"
					onKeyPress={e => this.checkExpirationDate(e)}
					>
				</input>
			</div>
		)
	}

}

export default ExpirationInput;
