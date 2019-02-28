import React, { Component } from 'react'

class ccvInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			securityCode : Number,
		}
	}

	setSecurityNumber = (event) => {
		if(this.props.length) {
			if(event.target.value.length > this.props.length) {
				event.preventDefault();
				return;
			}
		}
		this.setState({
			securityCode: event.target.value,
		})
	}

	checkInputLength = (event) => {

	}

	render() {
		return (
			<div className="ccvInputContainer">
				<input
					className="dateInput"
					type="number"
					value={this.state.securityCode}
					onChange={e => this.setSecurityNumber(e)}
					onKeyPress={e => this.checkInputLength(e)}
					placeholder="CCV"

					>
				</input>
			</div>
		)
	}
}

export default ccvInput;
