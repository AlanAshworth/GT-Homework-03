// Assignment Code
var generateBtn = document.querySelector("#generate");

// function generatePassword() {
//   // 1. Initialize pw variable
//   // 2. Filer out unconfirmed (false) types
//   // 3. Loop over length call generator function for each type
//   // 4. Add final pw to the pa variable and return
//   let generatedPassword = ""; // Initialize empty string to append characters
//   let length = setPasswordLength();
//   let lower = confirm("Should include lowercase?"); // Boolean check; filter out if false
//   let upper = confirm("Should include uppercase?"); // Boolean check; filter out if false
//   let numerics = confirm("Should include numerics?"); // Boolean check; filter out if false
//   let specials = confirm("Should include special caracters?"); // Boolean check; filter out if false
//   console.log(length, lower, upper, numerics, specials); // check input data types

//   const passwordCriteria = lower + upper + numerics + specials; // count the number if inputs
//   console.log("Password Criteria: ", passwordCriteria); // check the number of inputs

//   // pass prompts and confirms to an array of objects with keys. Then filter out objects set to false [0].
//   const criteriaArray = [{ lower }, { upper }, { numerics }, { specials }].filter(
//     item => Object.values(item)[0]
//   );
//   console.log("typesArr: ", criteriaArray); // check the number of objects in typesArr

//   // if no Booleans is set to True, do not proceed
//   // if (passwordCriteria === 0) {
//   //   return ""; // returns nothing
//   // }

//   // Looping in Objects - https://zellwk.com/blog/looping-through-js-objects/ -
//   // for (let i = 0; i < length; i += passwordCriteria) {
//   //   criteriaArray.forEach(value => {
//   //     const generatorName = Object.keys(value)[0];
//   //     generatedPassword += randomCriteriaGenerator[generatorName]();
//   //   });
//   // }
//   // return generatedPassword;

//   // const finalPassword = generatedPassword.slice(0, length);
//   // return finalPassword;
// }

const lowerCaseCharCodes = arrayFromLowToHigh(97, 122);
const upperCaseCharCodes = arrayFromLowToHigh(65, 90);
const numericCaseCharCodes = arrayFromLowToHigh(48, 57);
const specialCaseCharCodes = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(58, 64)).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123,126));

function generatePassword() {
  let generatedPassword = [];
  let length = setPasswordLength();
  let lower = confirm("Should include lowercase?"); // Boolean check; filter out if false
  let upper = confirm("Should include uppercase?"); // Boolean check; filter out if false
  let numeric = confirm("Should include numerics?"); // Boolean check; filter out if false
  let special = confirm("Should include special caracters?"); // Boolean check; filter out if false
  const passwordCriteria = lower + upper + numeric + special;

  if(passwordCriteria !== 0){
    let charcodes = lowerCaseCharCodes;
    // if(lower === true){charcodes = charcodes.concat(lowerCaseCharCodes);}
    if(upper === true){charcodes = charcodes.concat(upperCaseCharCodes);}
    if(numeric === true){charcodes.concat(numericCaseCharCodes);}
    if(special === true){charcodes = charcodes.concat(specialCaseCharCodes);}

    for (let i = 0; i < length; i++) {
      const characterCode = charcodes[Math.floor(Math.random() * length)];
      generatedPassword.push(String.fromCharCode(characterCode));
    }
    return generatedPassword.join('');
  }
  return "";// Returns Nothing
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
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
  var inputlength = parseInt(
    prompt(
      "Set password length.\nCannot be less than 8 or greater than 128 characters:"
    )
  );

  if (inputlength != null && inputlength > 7 && inputlength < 129) {
    return inputlength;
  } else {
    setPasswordLength();
  }
}

// Random Object --------------------------------------------------------------
// Pass the values returned by the Generators to a randomGenerator object.
const randomCriteriaGenerator = {
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

// console.log(getRandomLower());
// console.log(getRandomUpper());
// console.log(getRandomNumber());
// console.log(getRandomSpecialCharacter());
// console.log(randomGenerator);
