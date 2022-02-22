//Stałe

const previousAction = document.querySelector('.previousAction');
const actualAction = document.querySelector('.actualAction');

const clear = document.querySelector('.clear');
const del = document.querySelector('.del')
const signs = document.querySelectorAll('.sign')
const numbers = document.querySelectorAll('.number')
const equal = document.querySelector('.equal')

//Zmienne

let previousOperand = '';
let actualOperand = '';
let operation = undefined;

//funkcje

// wybór danego operatora (jeśli jest dodana liczba wcześniej)

const selectOperation = (sign) => {
    if(actualOperand === '') {
        return
    }
    operation = sign
    previousOperand = actualOperand
    actualOperand = ''
}

//aktualizacja wyniku
const updateResult = () => {
    actualAction.innerText = actualOperand
    if (operation != null) {
        previousAction.innerText = previousOperand + operation
    } else {
        previousAction.innerText = ''
    }
};

//dodawanie liczby

const addNumber = (number) => {
    if(number === '•'){
        if(actualOperand.includes('.')){
            return 
        } 
        number = '.'
    }
    actualOperand = actualOperand.toString() + number.toString()
};

// usuwanie liczby

const removeNumber = () => {
    actualOperand = actualOperand.toString().slice(0, -1)
}



//pętla która po kliknięciu w liczbę dodaje ją do ekranu

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
});

// nasłuchanie kliknięcia del

del.addEventListener('click', () => {
    removeNumber()
    updateResult()
});

// nasłuchanie na operatory

signs.forEach((sign) => {
    sign.addEventListener('click', () => {
        selectOperation(sign.innerText)
        updateResult()
    })
})