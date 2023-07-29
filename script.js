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


const operators = document.querySelectorAll('.operator-button');
operators.forEach((button) => {
  button.addEventListener('click', ()=> {
    storedInput = Number(userInput.join(""));
    while (userInput.length) {userInput.pop()};
    operator = button.id;
  });
});

const equals = document.querySelector('#equals');
equals.addEventListener('click', ()=> {
  if (operator === 'add') {result = add(storedInput, Number(userInput.join("")));}
  else if (operator === 'subtract') {result = subtract(storedInput, Number(userInput.join("")));}
  else if (operator === 'multiply') {result = multiply(storedInput, Number(userInput.join("")));}
  else if (operator === 'divide') {result = divide(storedInput, Number(userInput.join("")));}
  display.textContent = `${result}`;
  while (userInput.length) {userInput.pop();}
  userInput.push(result);
});

// Operator Functions
function add(storedInput, userInput){
  return storedInput + userInput;
}

function subtract(storedInput, userInput){
  return storedInput - userInput;
}

function multiply(storedInput, userInput) {
  return storedInput * userInput;
}

function divide(storedInput, userInput) {
  return storedInput / userInput;
}

const clear = document.querySelector('#clear');
clear.addEventListener('click', ()=> clearInfo());

function clearInfo() {
  storedInput = 0;
  while(userInput.length) {userInput.pop()};
  display.textContent = storedInput;
}