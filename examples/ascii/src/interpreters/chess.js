import chess from './chess.json';

function sortWordLength(a, b) {
	if (a[0].length === b[0].length) {
		return parseInt(a[1]) > parseInt(b[1]);
	}
	return a[0].length < b[0].length ? 1 : -1;
}

function loadChess() {
	let chessWords = [];
	
	for (let i=0;i<chess.length;i++) {
	
	}
	// for (dec in ascii) {
	// 	ch = ascii[dec][0];
	// 	words = ascii[dec][1];
	// 	dec = parseInt(dec);
	// 	if (dec >= 65 && dec <= 90) { // A-Z
	// 		let lch = ch.toLowerCase();
	// 		let letter = dec + 32;
	// 		let letterwords = ascii[letter][1];
	// 		letterwords.forEach((lw) => {
	// 			words.unshift("upper case " + lw);
	// 			words.unshift("capital " + lw);
	// 		});
	// 		// words = words.concat(letterwords);
	// 		// words.unshift("uppercase " + lch);
	// 		words.unshift("upper case " + lch);
	// 		words.unshift("capital " + lch);
	// 	} else if (dec >= 97 && dec <= 122) { // a-z
	// 		// words.unshift("lowercase " + ch);
	// 		words.unshift("letter " + ch);
	// 		words.unshift("lower case " + ch);
	// 		words.unshift(ch);
	// 	}
	// 	if (words.length === 0) {
	// 		asciiWords.push([ch, dec]);
	// 	} else {
	// 		words.forEach(function (word) {
	// 			asciiWords.push([word, dec]);
	// 		});
	// 	}
	// }
	// asciiWords.sort(sortWordLength);
	
	
	const chessInterpreter = function(text) {
		
		return ['pawn','e',8];
		
		// let index = null;
		//
		// let w;
		// let strIndex;
		// for (let i = 0; i < asciiWords.length; i++) {
		// 	w = asciiWords[i][0];
		//
		//
		// 	let same = false;
		// 	if (text === w) {
		// 		index = i;
		// 		strIndex = 0;
		// 		same = true;
		// 		break;
		// 	} else {
		// 		let reg = new RegExp("^" + w + " | " + w + " | " + w + "$");
		// 		let m = text.match(reg);
		// 		if (m) {
		// 			index = i;
		// 			strIndex = m.index;
		// 			break;
		// 		}
		// 	}
		// }
		// if (index !== null) {
		// 	let found = asciiWords[index][0];
		// 	let dec = asciiWords[index][1];
		// 	// let ch = ascii[dec][0];
		// 	let before = text.substring(0, strIndex);
		// 	let after = text.substring(strIndex + found.length + 1);
		// 	let ret = []; //b,found,a];
		// 	let b = chessInterpreter(before);
		// 	let a = chessInterpreter(after);
		//
		// 	if (b) ret.push(b);
		//
		// 	ret.push(dec);
		//
		// 	if (a) ret.push(a);
		// 	let r = ret.flat();
		// 	return r;
		// } else {
		// 	//
		// }
	};
	
	return chessInterpreter;
}

export default {
	data: chess,
	interpreter: loadChess()
};