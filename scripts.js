const pwButton = document.getElementById("generate");
const passwordEl = document.getElementById("password");
const copyPassword = document.getElementById("copy");
const lengthEl = document.getElementById("length");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const btmcontainer = document.getElementById("bottom-container");

copyPassword.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = passwordEl.innerText;

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();

	function removeClass() {
		setTimeout(() => btmcontainer.classList.remove("open"), 3000);
	}

	btmcontainer.classList.add("open");
	removeClass();
});

function generatePassword() {
	const upperChecked = upper.checked;
	const lowerChecked = lower.checked;
	const numbersChecked = numbers.checked;
	const symbolsChecked = symbols.checked;

	const typesArr = [
		{ upperChecked, passwordfn: generateUpper },
		{ lowerChecked, passwordfn: generateLower },
		{ numbersChecked, passwordfn: generateNumbers },
		{ symbolsChecked, passwordfn: generateSymbols },
	];

	const typesArrFiltered = typesArr.filter((type) => Object.values(type)[0]);
	const length = lengthEl.value;
	var password = "";

	for (i = 0; i <= length; i++) {
		const chooseType = Math.floor(Math.random() * typesArrFiltered.length);

		const characterGenerator = typesArrFiltered[chooseType].passwordfn.call();
		password += characterGenerator;
	}
	passwordEl.innerText = password;
}

function generateLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function generateUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function generateNumbers() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function generateSymbols() {
	const symbols = "!@#$%^&*(){}[]=<>/,.";
	return symbols[Math.floor(Math.random() * symbols.length)];
}

pwButton.addEventListener("click", generatePassword);
