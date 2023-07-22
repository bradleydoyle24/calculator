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

// Array to be used for display
let userNum = [];
let result = [];

// Selects all numbered buttons only.
const numbers = document.querySelectorAll('.button-numbers .button');
numbers.forEach((button) => {
  button.addEventListener('click' , ()=> {
    userNum.push(button.id);
    display.textContent = userNum.join("");
  }); 
});

const operators = document.querySelectorAll('.button-operators .button');
operators.forEach((button) => {
  button.addEventListener('click', ()=> {
    // Move value to result so that userNum can be deleted and rewritten with new value.
    // Combine result and userNum in way specified by operator to produce the result
    if(button.id === 'add') {add(userNum);} 
    else if(button.id === 'subtract') {subtract(userNum);}
    while(userNum.length) {
      userNum.pop();
    }
  });
});

function add(userNum){
  answer = Number(userNum.join("")) + Number(result.join(""));
  while(result.length) {result.pop()};
  result.push(answer);
  answer = 0;
  display.textContent = result.join("");
  while(userNum.length) {userNum.pop()};
}

function subtract(userNum){
  answer = Number(userNum.join("")) - Number(result.join(""));
  while(result.length) {result.pop()};
  result.push(answer);
  answer = 0;
  display.textContent = result.join("");
  while(userNum.length) {userNum.pop()};
}