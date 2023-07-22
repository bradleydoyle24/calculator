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
let display = document.querySelector('.display');

// Array to be used for display
let userNum = [];

// query selector all returns array.  name button by id.
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click' , ()=> {
    userNum.push(button.id);
    display.textContent = userNum.join("");
    console.log(userNum);
  }); 
});