/*
const for each button (id)
  event listener

const for display
  able to alter text content

variable to store user clicked option
  add on until operator is clicked

variable to store next user clicked option
  create on the fly as user clicks

variable to store user clicked operator

variable to show current result
  so user can use to calculate with future operands
*/



// Display should be an array that is turned into a number?
const display = document.querySelector('#display');

// Arrays to be used for calculations
let userInput = [];
let operator;
let number1;
let number2;
let result;
let dispNum;

// Selects all numbered buttons only.
// Clicking on numbers adds them to end of userNum array.
// If/else limits numbers entered to be <= 10 digits in length. 
const numbers = document.querySelectorAll('.button-numbers .button');
numbers.forEach((button) => {
  button.addEventListener('click' , ()=> {
    if(userInput.length < 10) {
      userInput.push(Number(button.id));
      display.textContent = userInput.join("");
    } else {
      userInput.push(Number(button.id));
      let tempArray = userInput.slice(1);
      userInput = tempArray;
      display.textContent = userInput.join("");
    }
  }); 
});


const operators = document.querySelectorAll('.operator-button');
operators.forEach((button) => {
  button.addEventListener('click', ()=> {
    // Variable 'operator' reset to 'undefined' at end of 'equals' button function.
    if (operator === undefined) {operator = button.id};
    // Checks if this is the first user input. 
    if (number1 === undefined) {
      number1 = Number(userInput.join(""));
      operator = button.id;
      while (userInput.length) {userInput.pop()};
      display.textContent = `${number1}`;
    }
    else {
      // After first user input, all user input is set to number2.
      number2 = Number(userInput.join(""));
      while (userInput.length) {userInput.pop()};
      operator = button.id;
      result = findResult(number1, number2, operator);
      dispNum = checkLength(result);
      display.textContent = `${dispNum}`;
      number1 = result;
    }
  });
});


const equals = document.querySelector('#equals');
equals.addEventListener('click', ()=> {
  number2 = Number(userInput.join(""));
  result = findResult(number1, number2, operator);
  dispNum = checkLength(result);
  display.textContent = `${dispNum}`; 
  // Sets number1 to result so that it is automatically used in next equation.
  number1 = result;
  while (userInput.length) {userInput.pop();}
  // Waits for user to click another operator before a calculation is performed.
  operator = undefined;
  let numString = result.toString();
  // userInput array is used to generate number2 of equation.
  for(i = 0; i < numString.length; i++) {
    userInput.push(numString[i]);
  }
});

function findResult(number1, number2, operator) {
  if (operator === 'add') {return add(number1, number2);}
  else if (operator === 'subtract') {return subtract(number1, number2);}
  else if (operator === 'multiply') {return multiply(number1, number2);}
  else if (operator === 'divide') {return divide(number1, number2);}
}

function checkLength(result) {
  let string = result.toString();
  if (string.length < 11) {
    return result;
  } else {
    let sciResult = result.toExponential(3);
    return sciResult;
  }
}

// Function to check length of result and return in scientific notation if needed.
// If negative, need to leave room for negative sign, so only have 9 digits available.
// Turn into string.
// Check length of string.
// If length > 10 (9 for negative numbers):
//  convert to scientific notation.
//  1.234 e10;
/*
Need to store true number in memory, but display scientific notation.
'result' needs to stay as true number, and used this way when entering more numbers
Display needs to be in scientific notation, limited to 4 digits.
*/ 

// Operator Functions
function add(number1, number2){
  return number1 + number2;
}

function subtract(number1, number2){
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', ()=> clearInfo());

function clearInfo() {
  // Undefined wil cause number1 to be redefined in operator-button event listener 'click'
  number1 = undefined;
  number2 = 0;
  while(userInput.length) {userInput.pop();}
  display.textContent = 0;
}
