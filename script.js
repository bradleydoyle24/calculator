// Display should be an array that is turned into a number?
const display = document.querySelector('#display');

// Arrays to be used for calculations
let userInput = [];
let operator;
let number1;
let number2;
let result;
let dispNum;
let decimalPresent = false;

// NUMBER KEYS
// Clicking a numbered button will add to userInput until 10 digits, then digits are overwritten.
const numbers = document.querySelectorAll('.button-numbers .numbers');
numbers.forEach((button) => {
  button.addEventListener('click' , ()=> {
    createUserInput(button.id);
  }); 
});

// decimalPresent prevents multiple decimals from being used.
let decimal = document.querySelector('#decimal');
decimal.addEventListener('click', ()=> {
  while (decimalPresent === false) {
    userInput.push('.');
    createDisplay(userInput.join(""));
    decimalPresent = true
  }
});

/* Function for number presses, to assign to key presses as well as screen clicks. */
function createUserInput(number) {
    // Removes leading 0 after calculation results in '0' on display, or display shows 'Infinity'.
    if((userInput.length === 1 && userInput == 0) 
    || (display.textContent == 'Infinity')) {
      while(userInput.length) {userInput.pop()};
    }
    userInput.push(Number(number));
    createDisplay(userInput.join(""));
  }

// OPERATOR KEYS
// Turns userInput array into either 'number1' or 'number2'.  All calculations are performed with these variables.
const operators = document.querySelectorAll('.operator-button');
operators.forEach((button) => {
  button.addEventListener('click', () => makeEquation(button))
});

function makeEquation(button) {
    // 'operator' undefined after pressing 'equals', otherwise, a calculation is performed with old values.
    if (operator === undefined) {operator = button.id};
    // 'number1' is undefined if it is first user input, or first user input after pressing equals.
    if (number1 === undefined) {
      getNumber1(userInput);
      operator = button.id;
    }
    else {
      /* After first user input, all user input is set to 'number2'. Results of each calculation are 
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
      decimalPresent = false;
    }
  };

function getNumber1(array) {
  number1 = Number(array.join(""));
  while (array.length) {
    array.pop()
  }
  createDisplay(number1);
  decimalPresent = false;
}

// EQUALS BUTTON
const equals = document.getElementById('=');
equals.addEventListener('click', () => getEquals(userInput));

function getEquals(array) {
  number2 = Number(array.join(""));
  result = findResult(number1, number2, operator);
  createDisplay(result);
  //'operator' undefined after pressing 'equals', otherwise, a calculation is performed with old values.
  while (array.length) {array.pop();}
    operator = undefined;
  let numString = result.toString();
  for(i = 0; i < numString.length; i++) {
    if (numString[i] === 'e') {break};
    array.push(numString[i]);
  }
  // 'number1' reset to undefined so that a number will have to be entered for a calculation to be performed. */
  number1 = undefined;
}

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
    let sciResult = Number(result).toExponential(3);
    return sciResult;
  }
}

function findResult(number1, number2, operator) {
  if (operator === undefined) {return number2};
  if (operator === '+') {return add(number1, number2);}
  else if (operator === '-') {return subtract(number1, number2);}
  else if (operator === '*') {return multiply(number1, number2);}
  else if (operator === '/') {return divide(number1, number2);}
}

// OPERATOR FUNCTIONS
function add(number1, number2){
  if (number1 === undefined) {
    number1 = 0;
  }
  return number1 + number2;
}

function subtract(number1, number2){
  if (number1 === undefined) {
    number1 = 0;
  }
  return number1 - number2;
}

function multiply(number1, number2) {
  if (number1 === undefined) {
    number1 = 1;
  }
  return number1 * number2;
}

function divide(number1, number2) {
  if (number1 === undefined) {
    number1 = 1;
  }
  return number1 / number2;
}

// CLEAR BUTTON
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

// BACKSPACE BUTTON
let backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', () => backspace(userInput));

function backspace(array) {
  if (display.textContent === 'Infinity') {
    while(array.length) {
      array.pop();
    }
    display.textContent = 0;
  }
  if(array.length > 1) {
    array.pop();
    number = array.join("");
    result = checkLength(number);
    createDisplay(result);
  }
  else {
    array.pop();
    display.textContent = 0;
  }
}


//KEYBOARD INPUTS 
window.addEventListener('keydown', (e) => matchNumber(e));
window.addEventListener('keydown', (e) => matchOperator(e));
window.addEventListener('keydown', (e) => getEqualsKeyboard(e));
window.addEventListener('keydown', (e) => backspaceKey(e));
window.addEventListener('keydown', (e) => clearKeyboard(e));

function matchNumber(e) {
  numbers.forEach((number) => {
    if (number.id === e.key) {
      createUserInput(e.key);
    }
  });
}

function matchOperator(e) {
  operators.forEach((button) => {
    if (button.id === e.key) {
      makeEquation(button);
    }
  });
}

function getEqualsKeyboard(e) {
  if((e.key === '=') || (e.key === 'Enter')) {
    getEquals(userInput);
  }
} 

function backspaceKey(e) {
  if (e.key === 'Backspace') {
    backspace(userInput);
  }
}

function clearKeyboard(e) {
  if (e.key === 'c') {
    clearInfo();
  }
}

window.addEventListener('keydown', (e) => console.log(e.key));