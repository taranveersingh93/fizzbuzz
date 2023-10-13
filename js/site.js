// Helper Functions

const getFirstFizzBuzz = (fizz, buzz) => {
    let smallerNum = buzz;
    if (buzz > fizz) {
        smallerNum = fizz;
    }

    for (let i = smallerNum; i <= fizz * buzz; i++) {
        if (i % fizz === 0 && i % buzz === 0) {
            return i;
        }
    }
}

const getClass = input => {
    if (input === "FizzBuzz") {
        return "table-primary";
    } else if (input === "Fizz") {
        return "table-light";
    } else if (input === "Buzz") {
        return "table-dark";
    } else {
        return "";
    }
}

const displayError = (error) => {
    Swal.fire(
        {
            backdrop: false,
            title: 'Oh no',
            text: error,
            icon: "error",
            confirmButtonColor: "#ff993b"
        }
    );
}

const checkInputValidity = (stop, fizz, buzz) => {
    const allNumbers = Number.isInteger(stop) && Number.isInteger(fizz) && Number.isInteger(buzz);
    const firstFizzBuzz = getFirstFizzBuzz(fizz, buzz);
    const minimumStop = stop >= firstFizzBuzz;
    const positiveNums = fizz > 0 && buzz > 0;
    const uniqueNums = fizz !== buzz;

    if (!allNumbers) {
        displayError("Please enter numerical values.");
    }

    if (!minimumStop) {
        displayError(`The stop value should atleast be ${firstFizzBuzz}`);
    } 

    if (!positiveNums) {
        displayError("The Fizz and Buzz value have to be greater than 0.");
    }

    if (!uniqueNums) {
        displayError("Please enter different fizz and buzz values.")
    }

    return  allNumbers && minimumStop && positiveNums && uniqueNums;
}

//DOM functions

const removeLogo = () => {
    const fizzBuzzLogo = document.querySelector('.fizzbuzz-logo');
    fizzBuzzLogo?.remove();
}

const generateFizzBuzz = (stop, fizz, buzz) => {
    const output = [];
    for (let i = 1; i <= stop; i++) {
        if (i % fizz === 0 && i % buzz === 0) {
            output.push("FizzBuzz");
        } else if (i % fizz === 0) {
            output.push("Fizz");
        } else if (i % buzz === 0) {
            output.push("Buzz");
        } else {
            output.push(i);
        }
    }
    return output;
}

// Recursion alternative

// const generateFizzBuzz = (stop, fizz, buzz, i) => {
//     if (i > stop) {
//         return [];
//     }
//     let currentEntry;
//         if (i % fizz === 0 && i % buzz === 0) {
//             currentEntry = "FizzBuzz";
//         } else if (i % fizz === 0) {
//             currentEntry = "Fizz";
//         } else if (i % buzz === 0) {
//             currentEntry = "Buzz";
//         } else {
//             currentEntry = i;
//         }
    
//     return [currentEntry, ...generateFizzBuzz(stop, fizz, buzz, i + 1)];
// }

const getValues = () => {
    const stopValue = parseInt(document.getElementById('stopValue').value);
    const fizzValue = parseInt(document.getElementById('fizzValue').value);
    const buzzValue = parseInt(document.getElementById('buzzValue').value);

    if (checkInputValidity(stopValue, fizzValue, buzzValue)) {  
        const generatedFizzBuzz = generateFizzBuzz(stopValue, fizzValue, buzzValue, 1);
        let rowLength;

        if (fizzValue > buzzValue) {
            rowLength = fizzValue;
        } else {
            rowLength = buzzValue;
        }

        displayFizzBuzz(generatedFizzBuzz, rowLength);
    }
}

const displayFizzBuzz = (listFizzBuzz, length) => {
    let html = '';
    let rowLength = length;
    if (rowLength > 5) {
        rowLength = 5;
    }
    for (let i = 0; i < listFizzBuzz.length; i++) {
        if (i % rowLength === 0) {
            html += '<tr>';
        }
        
        const tableData = listFizzBuzz[i];
        const className = getClass(tableData);
        
        html += `<td style="width: ${100/rowLength}%" class="${className}">${tableData}</td>`
        
        if (i % rowLength === rowLength - 1) {
            html += '</tr>';
        }
    };
    removeLogo();
    const displayTable = document.getElementById('results');
    displayTable.innerHTML = html;
}