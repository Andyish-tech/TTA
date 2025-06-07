document.addEventListener('DOMContentLoaded', () => {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const addButton = document.getElementById('add');
    const subtractButton = document.getElementById('subtract');
    const multiplyButton = document.getElementById('multiply');
    const divideButton = document.getElementById('divide');
    const resultSpan = document.getElementById('result');

    function getNumbers() {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);
        return [num1, num2];
    }

    function updateResult(result) {
        resultSpan.textContent = result;
    }

    addButton.addEventListener('click', () => {
        const [num1, num2] = getNumbers();
        updateResult(num1 + num2);
    });

    subtractButton.addEventListener('click', () => {
        const [num1, num2] = getNumbers();
        updateResult(num1 - num2);
    });

    multiplyButton.addEventListener('click', () => {
        const [num1, num2] = getNumbers();
        updateResult(num1 * num2);
    });

    divideButton.addEventListener('click', () => {
        const [num1, num2] = getNumbers();
        if (num2 === 0) {
            updateResult('Error: Cannot divide by zero');
        } else {
            updateResult(num1 / num2);
        }
    });
});

