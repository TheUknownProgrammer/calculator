const calculationArea = document.getElementById("calculation");
var historyCalculation = [];
var calculated = false;
var previousAnswerVal;

const getLastChar = (str) => str[str.length - 1];

function append(char) {
    if (calculated) {
        calculationArea.innerHTML = "";
        calculated = false;
    }

    if (isNaN(char)) { // if not a number 
        if (calculationArea.innerHTML != "") {
            calculationArea.innerHTML += char
        }
    } else { // if a number is inserted to the calculator
        calculationArea.innerHTML += char;
    }

    calculationArea.scrollTo(calculationArea.scrollWidth, 0)
}

function calculate() {
    // add a check here if the innerHTML of calculatorArea have at least one operator of those +,-,*,/.
    if (!calculated && calculationArea.innerHTML != "") {
        try {
            let result = eval(calculationArea.innerHTML);
            calculationArea.innerHTML = eval(result);
            historyCalculation.push(result);
            previousAnswerVal = result;
        } catch (err) {
            calculationArea.innerHTML = err.message;
        }
    }
    calculated = true;
}

function clearCalculation() {
    calculationArea.innerHTML = "";
}

function removeCharacter() {
    if (!calculated) {
        calculationArea.innerHTML = calculationArea.innerHTML.substring(0, calculationArea.innerHTML.length - 1);
    }
}

function previousAnswer() {
    if (previousAnswerVal != undefined && !calculated) {
        if (!isNaN(getLastChar(calculationArea.innerHTML))) {
            calculationArea.innerHTML += "*" + previousAnswerVal;
        } else {
            calculationArea.innerHTML += previousAnswerVal;
        }
    }
}

function addDot() {
    if (calculationArea.innerHTML != "" && !calculated) {
        var newStr = calculationArea.innerHTML.replaceAll(/[*/+-]/gi, ",");
        var newArr = newStr.split(",").filter((item) => item != "");
        var lastNumber = newArr[newArr.length - 1];

        console.log(newArr);

        if (!lastNumber.includes(".")) {
            calculationArea.innerHTML += ".";
        }
    }
}
