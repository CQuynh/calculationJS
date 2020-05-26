const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");
const clearButton = calculator.querySelector("[data-action=clear]");

keys.addEventListener("click", (e) => {
  //target = return the element trigger the event
  //element.match(selectorstrings)
  if (e.target.matches("button")) {
    //do something
    const key = e.target;
    //access value of data-* attribute
    const action = key.dataset.action;
    //return the text content of specific node. and all children
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    //save user click on key previous button type
    const previousKeyType = calculator.dataset.previousKeyType;

    //click on number
    if (!action) {
      //check if the user click on operator/= then click on number
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        //replace 0 with the clicked number
        display.textContent = keyContent;
      } else {
        //concate number
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    //click on operator
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      //enough when check the first value and operator?? anh check if users click operator the second time
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        //update the calculated value as the first value
        calculator.dataset.firstValue = calcValue;
      } else {
        //if there is no calculation, set displayedNum as the first value
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      //add custom attributes
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstValue = displayedNum;
      calculator.dataset.operator = action;
      console.log(calculator.dataset, "calculator after click operator");
    }

    //click on decimal dot (.)
    if (action === "decimal") {
      //append . only . is not existed
      if (!display.includes(".")) {
        display.textContent = displayedNum += ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        //if user click on operator/= then click decimal
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    //click on clear
    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    } else {
      clearButton.textContent = "CE";
    }

    //click on "="
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;
      if (firstValue) {
        //if click on = the second time, set the first value to the displayed number
        //5-1=4= firstvalue = 4, second and operator is - and 1 =>4-1=3 3-1=2
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        display.textContent = calculate(firstValue, operator, secondValue);
      }

      //set modValue = modifier value attribute
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }

    //Remove .is-depressed class from all keys
    //Array.from() => convert an array-like object into array type
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );
  }
});
const calculate = (n1, operator, n2) => {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  let result = "";

  if (operator === "add") {
    result = n1 + n2;
  } else if (operator === "subtract") {
    result = n1 - n2;
  } else if (operator === "multiply") {
    result = n1 * n2;
  } else if (operator === "divide") {
    result = n1 / n2;
  }
  return result;
};
