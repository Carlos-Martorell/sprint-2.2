

const error = {
	1: "Please enter a valid name.",
	2: "Please enter a valid name.",
	3: "Please enter a valid email.",
	4: "Password must be between 4 and 8 characters and contain at least one letter and one number.",
	5: "Please enter a valid phone number.",
	6: "Please enter a valid address.",
	7: "Please fill in all required fields.",
	8: "Form submitted successfully."
}

let errorCount = 0;
	
const validateString = value => /^[A-Za-zÀ-ÿ\s]+$/.test(value);
const validateNumber = value => /^\d+$/.test(value);;
const validateRequiredField = value => (value.trim() === "" || value.length < 3);
const validateEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validatePasswordLettersNumbers = value =>  /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(value);
const validateNumCharactersPW = value => value.trim().length < 9 && value.trim().length > 3;
const validateNumCharactersPhone = value => value.trim().length > 8 && value.trim().length < 14;

const fName = document.getElementById("fName");
const fLastN = document.getElementById("fLastN");
const fEmail = document.getElementById("fEmail");
const fPassword = document.getElementById("fPassword");
const fPhone = document.getElementById("fPhone");
const fAddress = document.getElementById("fAddress");

const errorName = document.getElementById("errorName");
const errorLastN = document.getElementById("errorLastN");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");
const errorPhone = document.getElementById("errorPhone");
const errorAddress = document.getElementById("errorAddress");


const validateField = (value, input, errorElement, validationFunction, errorMessage) => {

	if (validationFunction(value)) {
		errorCount++;
		errorElement.innerHTML = errorMessage;
		input.classList.add("is-invalid");
	} else {
		errorElement.innerHTML = "";
		input.classList.remove("is-invalid");
	}
};

const validateNameOnBlur = () => {validateField(fName.value, fName, errorName, value => !validateString(value) || validateRequiredField(value), error[1]);};
const validateLastNameOnBlur = () => {validateField(fLastN.value, fLastN, errorLastN, value => !validateString(value) || validateRequiredField(value), error[2]);};
const validateEmailOnBlur = () => {validateField(fEmail.value, fEmail, errorEmail, value => !validateEmail(value) || validateRequiredField(value), error[3]);};
const validatePasswordOnBlur = () => {
	validateField(fPassword.value, fPassword, errorPassword, value =>
		!validatePasswordLettersNumbers(value) ||
		validateRequiredField(value) ||
		!validateNumCharactersPW(value), error[4]);
};
const validatePhoneOnBlur = () => {
	validateField(fPhone.value, fPhone, errorPhone, value =>
		!validateNumber(value) ||
		validateRequiredField(value) ||
		!validateNumCharactersPhone(value), error[5]);
};
const validateAddressOnBlur = () => {validateField(fAddress.value, fAddress, errorAddress, value => validateRequiredField(value), error[6]);};



const validate = (event) => {
	event.preventDefault();
	errorCount = 0

	
	validateField(fName.value, fName, errorName, value => !validateString(value) || validateRequiredField(value), error[1]);
	validateField(fLastN.value, fLastN, errorLastN,value => !validateString(value) || validateRequiredField(value), error[2]);
	validateField(fEmail.value, fEmail, errorEmail, value => !validateEmail(value) || validateRequiredField(value), error[3])
	validateField(fPassword.value, fPassword, errorPassword, value => !validatePasswordLettersNumbers(value) || validateRequiredField(value) || !validateNumCharactersPW(value), error[4]);
	validateField(fPhone.value, fPhone, errorPhone, value => !validateNumber(value) || validateRequiredField(value) || !validateNumCharactersPhone(value), error[5]);
	validateField(fAddress.value, fAddress, errorAddress, value => validateRequiredField(value), error[6]);

	console.log("Errores:", errorCount);

	if (errorCount === 0) {

		document.getElementById("alertBox").style.display = "none";
		document.getElementById("successMessage").style.display = "block";
		document.getElementById("successMessage").innerHTML = error[8];
	} else {
		document.getElementById("successMessage").style.display = "none";
		document.getElementById("alertBox").style.display = "block";
		document.getElementById("alertBox").innerHTML = error[7];
	}

}

fName.addEventListener("blur", validateNameOnBlur);
fLastN.addEventListener("blur", validateLastNameOnBlur);
fEmail.addEventListener("blur", validateEmailOnBlur);
fPassword.addEventListener("blur", validatePasswordOnBlur);
fPhone.addEventListener("blur", validatePhoneOnBlur);
fAddress.addEventListener("blur", validateAddressOnBlur);


document.querySelector(".form").addEventListener("submit", validate);