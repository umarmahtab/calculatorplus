document.addEventListener('DOMContentLoaded', () => {
    if (window.initDarkVeilBackground) {
        window.initDarkVeilBackground({
            hueShift: 0,
            noiseIntensity: 0,
            scanlineIntensity: 0,
            speed: 0.5,
            scanlineFrequency: 0,
            warpAmount: 0
        });
    }

    // --- DOM Element Selectors ---
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const expressionDisplay = document.querySelector('.screen-expression');
    const resultDisplay = document.querySelector('.screen-result');
    const buttons = document.querySelector('.calculator-buttons');

    // --- State Variables ---
    let currentInput = '0';
    let expression = '';
    let lastOperator = null;
    let shouldResetDisplay = false;
    let history = [];

    // --- History DOM ---
    const historyToggle = document.querySelector('.history-toggle');
    const historyPanel = document.querySelector('.history-panel');
    const historyClose = document.querySelector('.history-close');
    const historyList = document.querySelector('.history-list');

    // --- History Functions ---
    const addToHistory = (expr, result) => {
        history.unshift({ expression: expr, result: result });
        if (history.length > 5) history.pop();
        renderHistory();
    };

    const renderHistory = () => {
        if (history.length === 0) {
            historyList.innerHTML = '<div class="history-empty">No calculations yet</div>';
            return;
        }
        historyList.innerHTML = history.map((item, i) =>
            `<div class="history-item" data-index="${i}">
                <div class="history-item-expression">${item.expression}</div>
                <div class="history-item-result">= ${item.result}</div>
            </div>`
        ).join('');
    };

    // --- History Toggle ---
    historyToggle.addEventListener('click', () => {
        historyPanel.classList.toggle('open');
    });
    historyClose.addEventListener('click', () => {
        historyPanel.classList.remove('open');
    });

    // --- History Item Click (use result) ---
    historyList.addEventListener('click', (e) => {
        const item = e.target.closest('.history-item');
        if (!item) return;
        const index = parseInt(item.dataset.index);
        currentInput = history[index].result;
        expression = '';
        shouldResetDisplay = true;
        historyPanel.classList.remove('open');
        updateDisplay();
    });

    // --- Evaluate Expression with BODMAS ---
    const evaluateExpression = (expr) => {
        try {
            // Replace display operators with JavaScript operators
            let result = expr.replace(/÷/g, '/').replace(/×/g, '*');
            
            // Use Function constructor to safely evaluate (better than eval)
            const answer = Function('"use strict"; return (' + result + ')')();
            return String(answer);
        } catch (e) {
            return 'Error';
        }
    };

    // --- Theme Toggle Logic ---
    const themes = ['dark', 'light', 'amoled', 'glass'];
    let currentThemeIndex = 0;
    
    themeToggle.addEventListener('click', () => {
        body.classList.remove(themes[currentThemeIndex]);
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        body.classList.add(themes[currentThemeIndex]);
    });

    // --- Update Display Function ---
    const updateDisplay = () => {
        try {
            // Show the expression and current input, but hide 0 after operators
            let display = expression;
            
            // Only add currentInput if it's not '0' (placeholder) or if expression is empty
            if (currentInput !== '0' || expression === '') {
                display += currentInput;
            }
            
            resultDisplay.textContent = display;
            
            // Auto-scroll to the right
            setTimeout(() => {
                if (resultDisplay && resultDisplay.scrollWidth > resultDisplay.clientWidth) {
                    resultDisplay.scrollLeft = resultDisplay.scrollWidth;
                }
            }, 0);
        } catch (err) {
            console.log('Error in updateDisplay:', err);
        }
    };
    
    // --- Format Number with Commas ---
    const formatNumber = (numStr) => {
        if (typeof numStr !== 'string') numStr = String(numStr);
        if (numStr.includes('Infinity') || numStr.includes('NaN')) return 'Error';
        const [integerPart, decimalPart] = numStr.split('.');
        const formattedInteger = parseFloat(integerPart).toLocaleString('en-US', {
            maximumFractionDigits: 0
        });
        return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    };

    // --- Calculation Logic ---
    const calculate = (val1, op, val2) => {
        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);
        if (op === '+') return num1 + num2;
        if (op === '-') return num1 - num2;
        if (op === '*') return num1 * num2;
        if (op === '/') {
            if (num2 === 0) return 'Infinity'; // Division by zero
            return num1 / num2;
        }
        return num2;
    };

    // --- Button Click Handler ---
    buttons.addEventListener('click', (e) => {
        const button = e.target.closest('.btn');
        if (!button) return;

        const key = button.dataset.key;
        const keyType = button.classList.contains('btn-number') ? 'number'
                      : button.classList.contains('btn-operator') ? 'operator'
                      : 'special'; // equals, clear, backspace

        handleKeyPress(key, keyType);
    });

    // --- Key Press Logic ---
    const handleKeyPress = (key, keyType) => {
        // Handle special keys first (clear, backspace, equals)
        if (key === 'clear') {
            currentInput = '0';
            expression = '';
            shouldResetDisplay = false;
            updateDisplay();
            return;
        }
        else if (key === 'backspace') {
            if (currentInput === '0') return;
            currentInput = currentInput.slice(0, -1);
            if (currentInput === '' || currentInput === '-') {
                currentInput = '0';
            }
            updateDisplay();
            return;
        }
        else if (key === '=') {
            if (expression === '') return;
            
            // Add the last number to the expression
            expression += currentInput;
            
            // Evaluate the full expression with BODMAS
            const result = evaluateExpression(expression);
            
            // Save to history
            addToHistory(expression, result);
            
            // Show the calculation in main display with = sign
            resultDisplay.textContent = expression + ' = ' + result;
            currentInput = result;
            expression = '';
            shouldResetDisplay = true;
            
            // Auto-scroll to show result
            setTimeout(() => {
                resultDisplay.scrollLeft = resultDisplay.scrollWidth;
            }, 0);
            return;
        }
        
        // Now handle regular keys
        if (keyType === 'number') {
            if (shouldResetDisplay) {
                currentInput = '';
                shouldResetDisplay = false;
            }
            if (key === '.') {
                if (currentInput.includes('.')) return; // Prevent multiple decimals
                if (currentInput === '') currentInput = '0';
            }
            // Limit input to 20 characters to prevent overflow
            if (currentInput.length >= 20) return;
            
            if (currentInput === '0' && key !== '.') {
                currentInput = key;
            } else {
                currentInput += key;
            }
        }
        else if (keyType === 'operator') {
            if (key === '%') {
                // Handle percentage
                const num = parseFloat(currentInput);
                currentInput = String(num / 100);
                shouldResetDisplay = false;
            } else {
                // Limit expression length to prevent overflow
                const newExpressionLength = expression.length + currentInput.length + 4; // 4 for spaces and operator
                if (newExpressionLength > 50) return;
                
                // Add number to expression
                expression += currentInput;
                
                // Convert operator for display
                const displayOp = key === '/' ? '÷' : key === '*' ? '×' : key;
                expression += ' ' + displayOp + ' ';
                
                currentInput = '0';
                shouldResetDisplay = true;
            }
        }

        updateDisplay();
    };

    // --- Initial Display Update ---
    updateDisplay();
});

