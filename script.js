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

// Clicking a numbered button will add to userInput until 10 digits, then digits are overwritten.
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

// Turns userInput array into either 'number1' or 'number2'.  All calculations are performed with these variables.
const operators = document.querySelectorAll('.operator-button');
operators.forEach((button) => {
  button.addEventListener('click', ()=> {
    // 'operator' undefined after pressing 'equals', otherwise, a calculation is performed with old values.
    if (operator === undefined) {operator = button.id};
    // 'number1' is undefined if it is first user input, or first user input after pressing equals.
    if (number1 === undefined) {
      number1 = Number(userInput.join(""));
      operator = button.id;
      while (userInput.length) {
        userInput.pop()
      };
      createDisplay(number1);
    }
    else {
      /* After first user input, all user input is set to 'number2'. Results of calculations are 
      then set to 'number1' so running calculations can be performed without clicking 'equals' 
      each time. */
      number2 = Number(userInput.join(""));
      while (userInput.length) {
        userInput.pop();
      }
      result = findResult(number1, number2, operator);
      operator = button.id;
      createDisplay(result);
      number1 = result;
    }
  });
});

/* 'operator' undefined after pressing 'equals', otherwise, a calculation is performed with old values.
number1 reset to undefined so that a number will have to be entered for a calculation to be performed. */
const equals = document.querySelector('#equals');
equals.addEventListener('click', ()=> {
  number2 = Number(userInput.join(""));
  result = findResult(number1, number2, operator);
  createDisplay(result);
  while (userInput.length) {userInput.pop();}
    operator = undefined;
  let numString = result.toString();
  for(i = 0; i < numString.length; i++) {
    userInput.push(numString[i]);
  }
  number1 = undefined;
});

// Changes display to scientific notation if number > 10 characters long.
function createDisplay(number){
  dispNum = checkLength(number);
  display.textContent = `${dispNum}`; 
}

// Checks length of result for display.  If > 10, converts to scientific notation (which is a string).
// The returned value is used as the display only and the true value still used in calculations.
function checkLength(result) {
  let string = result.toString();
  if (string.length < 11) {
    return result;
  } else {
    let sciResult = result.toExponential(3);
    return sciResult;
  }
}

function findResult(number1, number2, operator) {
  if (operator === 'add') {return add(number1, number2);}
  else if (operator === 'subtract') {return subtract(number1, number2);}
  else if (operator === 'multiply') {return multiply(number1, number2);}
  else if (operator === 'divide') {return divide(number1, number2);}
}

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
  number1 = undefined;
  number2 = undefined;
  while(userInput.length) {userInput.pop();}
  display.textContent = 0;
  result = 0;
  operator = undefined;
}

/*
Allow calculator to be used by pressing keys on keyboard.  
Number keys
operators
enter = equals

also forgot decimals!!
*/

