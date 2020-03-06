// Global Variables
var passwordLength; //Mark for delete

// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  // 1. Initialize pw variable
  // 2. Filer out unconfirmed (false) types
  // 3. Loop over length call generator function for each type
  // 4. Add final pw to the pa variable and return
  var length = prompt("Enter password length"); // psuedo-code: getPasswordlength();
  var lower = confirm("should include lowercase?"); // Boolean check; filter out if false
  var upper = confirm("should include uppercase?"); // Boolean check; filter out if false
  var numerics = confirm("should include numerics?"); // Boolean check; filter out if false
  var specials = confirm("should include special caracters?"); // Boolean check; filter out if false

  // check input data types
  console.log(length, lower, upper, numerics, specials);

  let generatedPassword = "";

  const typesCount = lower + upper + numerics + specials;
  console.log("typesCount: ", typesCount);

  //pass values into generatePassword()
  const typesArr = [{ lower }, { upper }, { numerics }, { specials }].filter(
    item => Object.values(item)[0]
  );

  console.log("typesArr: ", typesArr);

  //if no Booleans is set to True, do not proceed
  if (typesCount === 0) {
    return ""; // returns nothing
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const generatorName = Object.keys(type)[0];
      console.log("generatorName: ", generatorName);

      generatedPassword += randomGenerator[generatorName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Prompts --------------------------------------------------------------------

function setPasswordLength(inputlength) {
  var inputlength = prompt(
    "Set password length.\nCannot be less than 8 or greater than 128 characters:"
  );

  if (
    inputlength != null &&
    parseInt(inputlength) > 7 &&
    parseInt(inputlength) < 129
  ) {
    this.passwordLength = inputlength;
  } else {
    setPasswordLength();
  }
}

function setUpperCharacters(inputUpperCase) {
  var inputUpperCase = prompt("Add Upper Case characters:");
  var letters = /^[A-Za-z]+$/;

  if (inputUpperCase != null && inputUpperCase.value.match(letters)) {
    for (let i = 0; i < inputUpperCase.length; i++) {
      this.specialArray = inputUpperCase.split();
    }
  } else {
    setUpperCharacters();
  }
}

// Random Object --------------------------------------------------------------
// Pass the values returned by the Generators to a randomGenerator object.
const randomGenerator = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  special: getRandomSpecialCharacter
};

// Generators ----- https://www.w3schools.com/html/html_charset.asp -----------

function getRandomLower() {
  // HTML Charset; Browsers use unicodes to represent characters. The String
  // object has a method that generates a string from a unicode value.
  // Set limit of unicode generation up to 26 by multiplying random value by 26 (26 being the total number of characters in the alphabet).
  // Use Math.floor to return only whole values of the randomly generated number.
  // Add 97 to formula to ensure the codes generated are spaning the length of lowercase charsets: 97 - 122
  // Wrap formula with String's fromCharCode() to convert evaluated number to browser string representation.
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  // Similar to getRandomLower()'s functionality, but adding 65 to ensure the span of randomly generated values start at charset 65.
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  // Similar to getRandomLower()'s functionality, but span of numbers is from 0 - 9 (10 digits), and the unicode starts at 48.
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSpecialCharacter() {
  // Initialize a constant string whose state cannot be altered. Length of string is 0 - 32 characters.
  // Added escape characters to string to handle backslash and quotes. Outside quotes encapsulate the variety of symbols to be used.
  const symbols = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Function Calls--------------------------------------------------------------

console.log(getRandomLower());
console.log(getRandomUpper());
console.log(getRandomNumber());
console.log(getRandomSpecialCharacter());

console.log(generatePassword());
