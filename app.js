
numbers = document.querySelectorAll('.numbers');
operators = document.querySelectorAll('.operators');
let values = [];
let tmp = ''
let operator = 0;


function populateNumber(e) {
    if (operator !== 0) values.push(operator);
    if(tmp.length > 12) tmp = tmp.substring(0,12);
    if (e.key ) {
        tmp += e.key 
    }
    operator = 0;
    tmp += e.target.id;
    document.getElementById('display').textContent = tmp;
    console.log(event.key);
}

function decPointAdd() {
    if (!tmp.includes('.')) {
        tmp += '.';
        console.log('sho');
        document.getElementById('display').textContent = tmp;
	}
}

function populateOperator(e) {
    document.getElementById('.').disabled = false;
    if (e.key ) {
       operator = e.key;
    }
    if (e.target.id) {
       operator = e.target.id;
    }
    
    
    if (tmp !== '') { 
        values.push(+tmp);
        tmp = ''
    }
    document.getElementById('display').textContent = operator;
}

function calc() {
    if (values[0]) { 
    if (tmp !== '') { 
        values.push(+tmp);
        tmp = ''
    }
    for (let i = 0; i < values.length; i++) {
        if (values[i] === '*' || values[i] === '/'){
           result = operate(values[i], values[i-1], values[i+1]);
           values.splice(i-1,3, result)
           i--
        }
    }
    for (let i = 0; i < values.length; i++) {
        if (values[i] === '+' || values[i] === '-'){
            result = operate(values[i], values[i-1], values[i+1]);
            values.splice(i-1,3, result);
            i--;
         }
    }
    document.getElementById('display').textContent = round(values[0], 12);
   } else {
    document.getElementById('display').textContent = 0;
   }

    
    
}

function clear() {
    values = [];
    tmp = '';
    operator = 0;
    document.getElementById('.').disabled = false;
    document.getElementById('display').textContent = values;

}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

function deleteLast()  {
    tmp = tmp.substring(0, tmp.length - 1);
    document.getElementById('display').textContent = tmp;
}

//EL for numbers
numbers.forEach(el => {el.addEventListener('click',  populateNumber)});


//EL for operator
operators.forEach(el => {el.addEventListener('click', event=> {
    populateOperator(event);
})
});

//EL for =
document.getElementById('=').addEventListener('click', calc);

//EL for clear
document.getElementById('c').addEventListener('click', clear);
//EL for dec point
document.getElementById('.').addEventListener('click', decPointAdd);

//EL for back
document.getElementById('<').addEventListener('click', deleteLast);

//EL for key
document.addEventListener('keydown', event => {
    if(event.key >=0 && event.key <=9 || event.key === '.') {
        populateNumber(event);
    }
    if(event.key === '/' || event.key === '*' || event.key === '-' || event.key === '+' ){
        populateOperator(event);
    }
    if(event.key === 'Enter' ){
        calc(event);
    }
    if(event.key === 'Backspace'){
        deleteLast()
    }

    if(event.key === '.'){
        decPointAdd()
    }
});
//Math functions

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a *b;
}

function divide(a,b) {
    if(b === 0){
        clear();
        return document.getElementById('display').textContent = 'ERROR';
    }
    return a / b;

}

function operate(operator, a, b) {
    if (operator === '+') {
      return  add(a, b);
    } else if (operator === '-') {
      return  subtract(a,b)
    } else if (operator === '*') {
       return  multiply(a,b)
    } else if (operator === '/') {
       return  divide(a,b)
    }
}
