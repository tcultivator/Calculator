let prev = '';
let current = '';
let operator = '';

const mainDisplay = document.getElementById("value");
const historyDisplay = document.getElementById("history");

function updateDisplay() {
    // Show the full equation in history if we have an operator
    if (operator) {
        historyDisplay.innerHTML = `${prev} ${operator}`;
        mainDisplay.innerHTML = current || '0';
    } else {
        historyDisplay.innerHTML = '';
        mainDisplay.innerHTML = current || '0';
    }
}

function myfunction(number) {
    // Prevent multiple decimals
    if (number === '.' && current.includes('.')) return;

    if (current.length < 10) {
        current += number;
        updateDisplay();
    }
}

function myOperator(operation) {
    if (current === '' && prev === '') return;

    if (prev !== '' && current !== '') {
        compute();
    }

    operator = operation;
    prev = current;
    current = '';
    updateDisplay();
}

function del() {
    current = current.toString().slice(0, -1);
    updateDisplay();
}

function compute() {
    let result;
    const p = parseFloat(prev);
    const c = parseFloat(current);

    if (isNaN(p) || isNaN(c)) return;

    switch (operator) {
        case "+": result = p + c; break;
        case "-": result = p - c; break;
        case "*": result = p * c; break;
        case "/": result = c === 0 ? "Error" : p / c; break;
        default: return;
    }

    current = result.toString();
    operator = '';
    prev = '';
    updateDisplay();
}

function myCE(type) {
    if (type === 'C') {
        prev = '';
        operator = '';
        current = '';
    } else {
        current = '';
    }
    updateDisplay();
}

function percentageFormula() {
    if (current === '') return;
    current = (parseFloat(current) / 100).toString();
    updateDisplay();
}