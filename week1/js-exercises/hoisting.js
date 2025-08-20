// 1.
const cube = function(x) {
  return x * x * x;
}

// 2.
const fullName=function(first, last) {
  return first + " " + last;
}

// 3.
const power=function(base, exp) {
  if (exp === 0) {
    return 1;
  }
  return base * power(base, exp - 1);
}

// 4.
const sumCubes=function(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + cube(numbers[i]);
  }
  return total;
}
/*
console.log(message);
var message = 'Hi there!';
//variable declarations using var are hoisted to the top, but their initializations are not.

console.log(message);
let message = 'Hi there!';
//varriable declarations using let are not hoisted in the same way.

console.log(showMessage());
const showMessage = function(){
  return 'Hi there!';
};
//function declarations are hoisted, so this works even though the function is defined later in the code.

console.log(showMessage());
function showMessage(){
  return 'Hi there!';
}
//function expressions are not hoisted in the same way
*/

// 1.
let values = [10, 20, 30];
for(let i = 0; i < values.length; i++){
  console.log(values[i]);
}

// 2.

let lastLogin = '1/1/1970';
function welcome(first, last) {
  return `Welcome, ${first} ${last}! You last logged in on ${lastLogin}.`
};
console.log(welcome('Charlie', 'Munger'));