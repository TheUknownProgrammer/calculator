const calculationArea = document.getElementById("calculation");
var historyCalculation = [];
var calculated = false;
var previousAnswerVal;

const getLastChar = (str) => str[str.length - 1];

function append(char) {
    if (calculated) {
        calculationArea.textContent = "";
        calculated = false;
    }

    if (isNaN(char)) { // if not a number 
        if (calculationArea.textContent != "") {
            calculationArea.textContent += char
        }
    } else { // if a number is inserted to the calculator
        calculationArea.textContent += char;
    }

    calculationArea.scrollTo(calculationArea.scrollWidth, 0)
}

function calculate() {
    if (!calculated && calculationArea.textContent != "") {
        try {
            let result = eval(calculationArea.textContent);
            calculationArea.textContent = eval(result);
            historyCalculation.push(result);
            previousAnswerVal = result;
        } catch (err) {
            calculationArea.textContent = err.message;
        }
    }
    calculated = true;
}

function clearCalculation() {
    calculationArea.textContent = "";
}

function removeCharacter() {
    if (!calculated) {
        calculationArea.textContent = calculationArea.textContent.substring(0, calculationArea.textContent.length - 1);
    }
}

function previousAnswer() {
    if (previousAnswerVal != undefined && !calculated) {
        if (!isNaN(getLastChar(calculationArea.textContent))) {
            calculationArea.textContent += "*" + previousAnswerVal;
        } else {
            calculationArea.textContent += previousAnswerVal;
        }
    }
}

function addDot() {
    if (!calculated) {
        if (calculationArea.textContent != "") {
            var newStr = calculationArea.textContent.replaceAll(/[*/+-]/gi, ",");
            var newArr = newStr.split(",").filter((item) => item != "");
            var lastNumber = newArr[newArr.length - 1];

            console.log(newArr);

            if (!lastNumber.includes(".")) {
                calculationArea.textContent += ".";
            }
        } else {
            calculationArea.textContent += ".";
        }
    }
}
