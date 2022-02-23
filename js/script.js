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

//FUNKCJE

//obliczanie resultLoopu (sprwadzenie)

const count = () => {
    let action 
    
    if(!previousOperand || !actualOperand){
        return
    }
    
    const previous = parseFloat(previousOperand)
    const actual = parseFloat(actualOperand)

    if(isNaN(previous) || isNaN(actual)) {
        return
      }

    switch (operation) {

          case '+':
          action = previous + actual
          break

          case '-':
          action = previous - actual
          break

          case '×':
          action = previous * actual
          break

          case '÷':
          if(actual === 0){
            alert('Numbers cannot be divided by 0!')
            clearResult()
            return
          } 
          action = previous / actual 
          break

          case '^':
          if(previous.toString().includes('.') || previous<0){
            alert('You can only use natural numbers')
            clearResult()
            return
          } 
            action = Math.pow(previous, actual)
          break

          
          case '!':
          if(previous.toString().includes('.') || previous<0){
            alert('You can only use natural numbers')
            clearResult()
            return
          }
          
          if (previous == 0 ) {
            action = 1
            console.log('pierwsza opcja action', action)
          }
          let resultLoop = 1
          for(let i=1; i<=previous; ++i){
              
              resultLoop= resultLoop*i
              action = resultLoop
          }
          
          console.log('druga opcja action, previous i', action, previous);
          
          break

          default:
          return
    }
actualOperand = action
operation = undefined
previousOperand = ''

}

// wybór danego operatora (jeśli jest dodana liczba wcześniej)

const selectOperation = (sign) => {
    if(actualOperand === '') {
        return
    }
    if (previousOperand !== '') {
        const previous = previousAction.innerText
        if(actualOperand.toString === '0' && previous[previous.length - 1] === '÷'){
            clearResult()
            return
        }
        count ()
    }
    operation = sign
    previousOperand = actualOperand
    actualOperand = ''
}

//aktualizacja resultLoopu
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

// usuwanie resultLoopu

const clearResult = () => {
    previousOperand = '';
    actualOperand = '';
    operation = undefined;
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

equal.addEventListener('click', () => {
    count()
    updateResult()
})

clear.addEventListener('click', () => {
    clearResult()
    updateResult()
})