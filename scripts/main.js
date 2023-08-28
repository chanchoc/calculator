/* Archivo de código principal.
Contiene las principales funcionalidades del proyecto. */

// Variables necesarias
let currentTotal = 0;
let buffer = "0";
let previousOperator = null;
const calcScreen = document.getElementById("calc-numbers");

// Agarro los botones tocados desde el front-end
let input = document.querySelectorAll(".btn");
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("click", (event) => {
        buttonClick(event.target.innerText);
    });
}

// Elijo que hacer dependiendo del tipo de boton seleccionado
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value); // Simbolos
    } else {
        handleNumber(value); // Numeros
    }
    rerenderScreen(); // Mostrar por pantalla
}

// Funcion para manejar los simbolos
function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            currentTotal = 0;
            previousOperator = null;
            break;
        case "DEL":
            buffer = buffer.length === 1 ? "0" : buffer.substring(0, buffer.length - 1);
            break;
        case ".":
            buffer = !buffer.includes(value) ? buffer + value : buffer;
            break;
        case "+ / -":
            if (!["0", "0."].includes(buffer)) {
                buffer = buffer.includes("-") ? buffer.replace("-", "") : "-" + buffer;
                break;
            }
            break;
        case "=":
            if (previousOperator === null) {
                break;
            } else {
                handleMath(buffer);
                buffer = String(currentTotal);
                previousOperator = "=";
                break;
            }
        default:
            handleMath(value);
            break;
    }
}

// Funcion para manejar las operaciones
function handleMath(value) {
    if (currentTotal === 0 || previousOperator === "=") {
        currentTotal = parseFloat(buffer);
    } else {
        switch (previousOperator) {
            case "+":
                currentTotal += parseFloat(buffer);
                break;
            case "-":
                currentTotal -= parseFloat(buffer);
                break;
            case "x":
                currentTotal *= parseFloat(buffer);
                break;
            case "÷":
                currentTotal /= parseFloat(buffer);
            default:
                break;
        }
    }
    previousOperator = value;
    buffer = "0";
}

// Funcion para manejar el ingreso de los numeros
function handleNumber(value) {
    buffer = buffer === "0" ? value : buffer + value;
}

// Funcion para rerenderizar el valor ingresado
function rerenderScreen() {
    calcScreen.value = buffer;
}
