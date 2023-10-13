const displayError = () => {
    Swal.fire(
        {
            backdrop: false,
            title: 'Oh no',
            text: "Please enter valid numbers",
            icon: "error"
        }
    );
}

// stop point > fizzbuzz 
// fizz and buzz not equal 


const checkInputValidity = (stop, fizz, buzz) => {
    return Number.isInteger(stop) && Number.isInteger(fizz) && Number.isInteger(buzz) && stop > 1;
}

const getValues = () => {
    const stopValue = parseInt(document.getElementById('stopValue').value);
    const fizzValue = parseInt(document.getElementById('fizzValue').value);
    const buzzValue = parseInt(document.getElementById('buzzValue').value);

    if (checkInputValidity(stopValue, fizzValue, buzzValue)) {  
        const generatedFizzBuzz = generateFizzBuzz(stopValue, fizzValue, buzzValue);
        let rowLength;

        if (fizzValue > buzzValue) {
            rowLength = fizzValue;
        } else {
            rowLength = buzzValue;
        }

        displayFizzBuzz(generatedFizzBuzz, rowLength);
    } else {
        displayError();
    }
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

const removeLogo = () => {
    const fizzBuzzLogo = document.querySelector('.fizzbuzz-logo');
    fizzBuzzLogo?.remove();
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

const displayFizzBuzz = (listFizzBuzz, rowLength) => {
    let html = '';
    for (let i = 0; i < listFizzBuzz.length; i++) {
        if (i % rowLength === 0) {
            html += '<tr>';
        }
        
        const tableData = listFizzBuzz[i];
        const className = getClass(tableData);
        
        html += `<td class="${className}">${tableData}</td>`
        
        if (i % rowLength === rowLength - 1) {
            html += '</tr>';
        }
    };
    removeLogo();
    const displayTable = document.getElementById('results');
    displayTable.innerHTML = html;
}