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

// Selects all numbered buttons only.
// Clicking on numbers adds them to end of userNum array.
const numbers = document.querySelectorAll('.button-numbers .button');
numbers.forEach((button) => {
  button.addEventListener('click' , ()=> {
    userInput.push(Number(button.id));
    display.textContent = userInput.join("");
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
      console.log(`storedInput is ${storedInput}`);
    }
    else {
      storedInput2 = Number(userInput.join(""));
      while (userInput.length) {userInput.pop()};
      result = findResult(storedInput, storedInput2, operator);
      display.textContent = `${result}`;
      operator = button.id;
      console.log(`storedInput2 is ${storedInput2}`)
      storedInput = result;
      console.log(`storedInput is now ${storedInput}`)
    }
  });
});


const equals = document.querySelector('#equals');
equals.addEventListener('click', ()=> {
  storedInput2 = Number(userInput.join(""));
  result = findResult(storedInput, storedInput2, operator);
  display.textContent = `${result}`;
  while (userInput.length) {userInput.pop();}
  display.textContent = `${result}`;
  storedInput = result;
});

/* After operator is clicked, userInput is reset, and storedInput contains the value.
Use 'operator' as an argument to call the proper operator function. 
We are trying to combine 'equals' and 'operator' so that a result is created each time
an operator is selected.
'equals' needs to be it's own formula. Needs userInput, storedInput, and operator. 
Need to wait until at least 2 values are used.
Currently using
 */

function findResult(storedInput, storedInput2, operator) {
  if (operator === 'add') {return add(storedInput, storedInput2);}
  else if (operator === 'subtract') {return subtract(storedInput, storedInput2);}
  else if (operator === 'multiply') {return multiply(storedInput, storedInput2);}
  else if (operator === 'divide') {return divide(storedInput, storedInput2);}
}

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
  while(userInput.length) {userInput.pop()};
  display.textContent = 0;
}