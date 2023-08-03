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
let storedInput;
let storedInput2;
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

// Clicking an operator converts userInput to storedInput.
// userInput reset to take next user inputted number.
const operators = document.querySelectorAll('.operator-button');
operators.forEach((button) => {
  button.addEventListener('click', ()=> {
    if (storedInput === undefined) {
      storedInput = Number(userInput.join(""));
      operator = button.id;
      while (userInput.length) {userInput.pop()};
      display.textContent = `${storedInput}`;
    }
    else {
      storedInput2 = Number(userInput.join(""));
      while (userInput.length) {userInput.pop()};
      result = findResult(storedInput, storedInput2, operator);
      display.textContent = `${result}`;
      operator = button.id;
      typeof result === 'string' ? storedInput = Number(result) : storedInput = result;
    }
  });
});


const equals = document.querySelector('#equals');
equals.addEventListener('click', ()=> {
  storedInput2 = Number(userInput.join(""));
  result = findResult(storedInput, storedInput2, operator);
  dispNum = checkLength(result);
  display.textContent = `${dispNum}`;
  storedInput = result;
  console.log(storedInput);
  console.log(typeof storedInput);
  while (userInput.length) {userInput.pop();}
});

function findResult(storedInput, storedInput2, operator) {
  if (operator === 'add') {return add(storedInput, storedInput2);}
  else if (operator === 'subtract') {return subtract(storedInput, storedInput2);}
  else if (operator === 'multiply') {return multiply(storedInput, storedInput2);}
  else if (operator === 'divide') {return divide(storedInput, storedInput2);}
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
function add(storedInput, storedInput2){
  return storedInput + storedInput2;
}

function subtract(storedInput, storedInput2){
  return storedInput - storedInput2;
}

function multiply(storedInput, storedInput2) {
  return storedInput * storedInput2;
}

function divide(storedInput, storedInput2) {
  return storedInput / storedInput2;
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', ()=> clearInfo());

function clearInfo() {
  // Undefined wil cause storedInput to be redefined in operator-button event listener 'click'
  storedInput = undefined;
  storedInput2 = 0;
  while(userInput.length) {userInput.pop();}
  display.textContent = 0;
}
