// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
  let generatedPassword = [];
  let length = setPasswordLength();
  let lower = confirm("Criteria: Include lower-case characters?");              // Boolean check; to be filtered out if false
  let upper = confirm("Criteria: Include upper-case characters?");              // Boolean check; to be filtered out if false
  let numeric = confirm("Criteria: Include numeric characters?");               // Boolean check; to be filtered out if false
  let special = confirm("Criteria: Include special characters?");               // Boolean check; to be filtered out if false
  const passwordCriteria = lower + upper + numeric + special;                   // Tallies the amount of criteria

  if (passwordCriteria !== 0) {                                                 // Block run only if tallied criteria greater than zero
    let charcodes = [];
    if (lower === true) {
      charcodes = charcodes.concat(lowerCaseCharCodes);
    }
    if (upper === true) {
      charcodes = charcodes.concat(upperCaseCharCodes);
    }
    if (numeric === true) {
      charcodes = charcodes.concat(numericCaseCharCodes);
    }
    if (special === true) {
      charcodes = charcodes.concat(specialCaseCharCodes);
    }

    for (let i = 0; i < length; i++) {
      const characterCode =
        charcodes[Math.floor(Math.random() * charcodes.length)];
      generatedPassword.push(String.fromCharCode(characterCode));               // Get character from each passed code
    }
    return generatedPassword.join("");
  }
  return "No password criteria passed. Must provide criteria.";                 // Message upon not providing character criteria
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Helper Functions -----------------------------------------------------------
/*
Helper function. Used with generatePassword().
Sets a predetermined chracater length for a generated password.
Input must be a number, cannot be null, and has lower and upper boundaries.

(inputLength) - numerical input
*/
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

/*
Helper function. Used with Charsets.
Takes minimum and maximum charset values and stores range of values inclusively
in array.

(min) - lower boundary -inclusive], (max) - upper boundary [inclusive]
*/
function arrayFromMinToMax(min, max) {
  const array = [];
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  return array;
}

// Charsets ----- https://www.w3schools.com/html/html_charset.asp -------------
const lowerCaseCharCodes = arrayFromMinToMax(97, 122);
const upperCaseCharCodes = arrayFromMinToMax(65, 90);
const numericCaseCharCodes = arrayFromMinToMax(48, 57);
const specialCaseCharCodes = arrayFromMinToMax(32, 47)
  .concat(arrayFromMinToMax(58, 64))
  .concat(arrayFromMinToMax(91, 96))
  .concat(arrayFromMinToMax(123, 126));