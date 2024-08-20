

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let previousInput = '';
let operation = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const op = button.getAttribute('data-operation');

        if (value) {
            handleNumber(value);
        } else if (op) {
            handleOperation(op);
        } else if (button.id === 'clear') {
            clearDisplay();
        } else if (button.id === 'equals') {
            calculateResult();
        }
    });
});

function handleNumber(num) {
    if (currentInput.includes('.') && num === '.') return;
    currentInput += num;
    updateDisplay(currentInput);
}

function handleOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = '';
    updateDisplay('0');
}

function calculateResult() {
    let result = 0;
    const previous = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(previous) || isNaN(current)) return;

    switch (operation) {
        case 'add':
            result = previous + current;
            break;
        case 'subtract':
            result = previous - current;
            break;
        case 'multiply':
            result = previous * current;
            break;
        case 'divide':
            result = previous / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.textContent = value.substring(0, 10); // Limit display length
}
