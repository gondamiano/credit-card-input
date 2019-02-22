export default function ValidateCard (cardNumber) {
	const lengthCardNumber = cardNumber.length;
	let sum = 0;
	let second = false;
	for(let i = lengthCardNumber - 1; i >= 0 ; i--) {

		let d = parseInt(cardNumber[i]);
		if(second) {
			d = d * 2;
		}

		sum += Math.floor((d / 10));
		sum += d % 10;
		second = !second;
	}
	console.log(sum);
	if(sum % 10 === 0) {
		console.log("perfecto");
	}
}
