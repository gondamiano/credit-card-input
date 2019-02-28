export const CARD_TYPE = [
	{
		type: 'visa',
		format: /(\d{1,4})/g,
		pattern: /^4/,
		maxCardLength: 16,
		cvvLength: 3
	},
	{
		type: 'mastercard',
		format: /(\d{1,4})/g,
		pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
		maxCardLength: 16,
		cvvLength: 3
	},
	{
		type: 'maestro',
		format: /(\d{1,4})/g,
		pattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
		maxCardLength: 19,
		cvvLength: 3
	},
	{
		type: 'visaelectron',
		format: /(\d{1,4})/g,
		pattern: /^4(026|17500|405|508|844|91[37])/,
		maxCardLength: 16,
		cvvLength: 3
	},
	{
		type: 'americanexpress',
		format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
		pattern: /^3[47]/,
		maxCardLength: 15,
		cvvLength: 4
	}
]


export const getTypeCardByValue = value => CARD_TYPE.filter(cardType => cardType.pattern.test(value))[0];

export const getTypeByNumber = cardNumber => {
	const cardType = CARD_TYPE.filter(cardType => cardType.pattern.test(cardNumber))[0];
	return cardType;
}

export const getCardFormat = cardNumber => {
	const cardNumberType = getTypeByNumber(cardNumber);
	if(!cardNumberType) return cardNumber;
	const { format } = cardNumberType;
	if(format.global) {
		return cardNumber.match(format).join(" ");
	}
	const execNumber = format.exec(cardNumber.split(" ").join(""));
	if(execNumber) {
		return execNumber
		.splice(1,3)
		.filter(x => x)
		.join(" ");
	}
}

export const checkMaxLengthWithoutSpace = (cardNumber , currentCardLength) => {
	const cardType = getTypeByNumber(cardNumber);
	return cardType && currentCardLength >= cardType.maxCardLength;
}
