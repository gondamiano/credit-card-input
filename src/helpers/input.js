import React, { Component } from 'react';
import './input.css';
import validateCard from './ValidateCard.js';
import CcvInput from './ccvInput.js';
import logo from '../utils/cardsLogo';

import {
	getTypeCardByValue,
	getTypeByNumber,
	getCardFormat,
	}
	from '../utils/cardFormat';

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cardType: Object,
			cardNumber: String,
			cardNumberMaxLength: 13,
			logoSource: logo.placeholder
		};
	}

	validateCard = (event) => {
		validateCard(event.target.value);
		this.setState({
			cardNumber : event.target.value
		})
	}

	checkCardType = (e) => {
		const numberLength = e.target.value.split(" ").join("").length;

		if(numberLength === this.state.cardNumberMaxLength) e.preventDefault();
		const cardType = getTypeCardByValue(e.target.value);

		if(cardType !== undefined) {
			this.setState({
				cardType: cardType,
				cardNumberMaxLength: cardType.maxCardLength,
				logoSource: logo[cardType.type] || logo.placeholder,
			})
		}
	}

	inputHandler = (val) => {
		this.setState({ cardNumber: getCardFormat(val)});
		if(val === "") {
			this.setState({
				logoSource: logo.placeholder,
			})
		}
	}

	render() {
		const ccvlength = this.state.cardType.cvvLength;

		if(ccvlength)
		return (
			<div className="container">
			<img src={this.state.logoSource} alt="asd" className="LogoImg" />
				<input type="text" className="input"
				 placeholder="Number Card"
				 value={this.state.cardNumber}
				 onChange={e => this.inputHandler(e.target.value)}
				 onKeyPress={this.checkCardType}>
				</input>
				<CcvInput length={ccvlength} />
			</div>
		)

		else return (
			<div className="container">
			<img src={this.state.logoSource} alt="asd" className="LogoImg" />
				<input type="text" className="input"
				 placeholder="Number Card"
				 value={this.state.cardNumber}
				 onChange={e => this.inputHandler(e.target.value)}
				 onKeyPress={this.checkCardType}>
				</input>
			</div>
		)
	}
}

export default Input;
