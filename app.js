const blockDisplay = document.querySelector('.block-container');
const keybordDisplay = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.date-container');
//"C:\Users\molek\AppData\Roaming\npm\firebase.ps1"
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]
let currentBlock = 0;
let currentRow = 0;
let isGameOver = false;
const wordle = 'SUPER';

const guessRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''], 
    ['','','','',''],
    ['','','','','']
]

guessRows.forEach((guessRow,guessRowIndex)=>{
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id','guessRow-'+ guessRowIndex);
    
    guessRow.forEach((guess,guessIndex) =>{
        const guessElement = document.createElement('div');
        guessElement.setAttribute('id','guessId-'+ guessIndex + 'guessRow-'+ guessRowIndex);
        guessElement.classList.add('block')
        rowElement.append(guessElement);
    })
    blockDisplay.append(rowElement);
});


keys.forEach(key =>{
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', ()=> handleClick(key))
    keybordDisplay.append(buttonElement);
})
const handleClick = (letter) =>{
    if(letter === "«"){
        deleteElement();
        console.log("guessrow",guessRows)
        return;
    }
    if(letter == 'ENTER'){
        checkRow();
        console.log("guessrow",guessRows)

        return
    }
    addLetter(letter);
    console.log(letter)
}

const addLetter = (letter) =>{
    if(currentBlock < 5 && currentRow <6){
    const block = document.getElementById('guessId-'+ currentBlock+'guessRow-'+currentRow);
    block.textContent = letter;
    guessRows[currentRow][currentBlock] = letter;
    block.setAttribute('data',letter);
    currentBlock++;
    console.log("guessrow", guessRows)
    }
}
const deleteElement = () =>{
    if(currentBlock>0){
        currentBlock--;
        const block = document.getElementById('guessId-'+ currentBlock+'guessRow-'+currentRow);
        block.textContent =""
        guessRows[currentRow][currentBlock] = ''
        block.setAttribute('data','');
        console.log("guessrow",guessRows)
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentBlock > 4) {
        flipTile();
        if (wordle == guess) {
            showMessage('Magnificent!')
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = true
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentBlock = 0
            }
         }   
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageElement.classList.add('message')
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 3000);
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowBlock = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowBlock.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowBlock.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}