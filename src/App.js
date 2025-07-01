import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function Calculator() {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

      const clear = () => {
        setCurrentOperand('0');
        setPreviousOperand('');
        setOperation(null);
        setResetDisplay(false);
      };

      const deleteNumber = () => {
        if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
          setCurrentOperand('0');
        } else {
          setCurrentOperand(currentOperand.slice(0, -1));
        }
      };

      const appendNumber = (number) => {
        if (number === '.' && currentOperand.includes('.')) return;
        if (resetDisplay) {
          setCurrentOperand(number);
          setResetDisplay(false);
        } else {
          setCurrentOperand(currentOperand === '0' && number !== '.' ? number : currentOperand + number);
        }
      };

      const chooseOperation = (op) => {
        if (currentOperand === '0' && previousOperand === '') return;
        
        if (previousOperand !== '') {
          compute();
        }
        
        setPreviousOperand(currentOperand + ' ' + op);
        setOperation(op);
        setResetDisplay(true);
      };

      const compute = () => {
        if (!operation || currentOperand === '' || previousOperand === '') return;
        
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        let result;
        
        switch (operation) {
          case '+':
            result = prev + current;
            break;
          case '-':
            result = prev - current;
            break;
          case '*':
            result = prev * current;
            break;
          case '÷':
            result = prev / current;
            break;
          default:
            return;
        }
        
        setCurrentOperand(result.toString());
        setPreviousOperand('');
        setOperation(null);
        setResetDisplay(true);
      };

      return (
        <div className="calculator">
          <div className="display">
            <div className="previous-operand">{previousOperand}</div>
            <div className="current-operand">{currentOperand}</div>
          </div>
          <div className="buttons">
            <button onClick={clear} className="clear span-two">AC</button>
            <button onClick={deleteNumber} className="delete">DEL</button>
            <button onClick={() => chooseOperation('÷')} className="operation">÷</button>
            <button onClick={() => appendNumber('7')}>7</button>
            <button onClick={() => appendNumber('8')}>8</button>
            <button onClick={() => appendNumber('9')}>9</button>
            <button onClick={() => chooseOperation('*')} className="operation">×</button>
            <button onClick={() => appendNumber('4')}>4</button>
            <button onClick={() => appendNumber('5')}>5</button>
            <button onClick={() => appendNumber('6')}>6</button>
            <button onClick={() => chooseOperation('-')} className="operation">-</button>
            <button onClick={() => appendNumber('1')}>1</button>
            <button onClick={() => appendNumber('2')}>2</button>
            <button onClick={() => appendNumber('3')}>3</button>
            <button onClick={() => chooseOperation('+')} className="operation">+</button>
            <button onClick={() => appendNumber('0')} className="span-two">0</button>
            <button onClick={() => appendNumber('.')}>.</button>
            <button onClick={compute} className="equals">=</button>
          </div>
        </div>
      );
    }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Calculator />);
