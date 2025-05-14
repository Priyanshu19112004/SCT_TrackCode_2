const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');

let expression = "";

function updateDisplay(value) {
  display.value = value;
}

buttons.forEach(button => {
  const value = button.dataset.value;
  if (value) {
    button.addEventListener('click', () => {
      expression += value;
      updateDisplay(expression);
    });
  }
});

equals.addEventListener('click', () => {
  try {
    const result = eval(expression); 
    if (!isFinite(result)) throw new Error("Math Error");
    updateDisplay(result);
    expression = result.toString();
  } catch {
    updateDisplay("Error");
    expression = "";
  }
});


clear.addEventListener('click', () => {
  expression = "";
  updateDisplay("");
});

backspace.addEventListener('click', () => {
  expression = expression.slice(0, -1);
  updateDisplay(expression);
});

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (/[\d\+\-\*\/\.]/.test(key)) {
    expression += key;
    updateDisplay(expression);
  } 
  else if (key === 'Enter') {
    e.preventDefault();
    try {
      const result = eval(expression);
      if (!isFinite(result)) throw new Error("Math Error");
      updateDisplay(result);
      expression = result.toString();
    } catch {
      updateDisplay("Error");
      expression = "";
    }
  }
  
  else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  }
  
  else if (key === 'Escape') {
    expression = "";
    updateDisplay("");
  }
});
