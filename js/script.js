const flashcards = document.getElementsByClassName('flashcards')[0]
const createBox = document.getElementsByClassName('create-box')[0]
const question = document.getElementById('question')
const answer = document.getElementById('answer')

let newCardBtn = document.querySelector('#newCard')
let closeCardBtn = document.querySelector('#closeBtn')
let saveBtn = document.querySelector('#saveBtn')
let delCards = document.querySelector('#delCards')

window.addEventListener('load', function () {
    let contentArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : []
    contentArray.forEach(element => divMAker(element));
})

delCards.addEventListener('click', function () {
    delFlashcards()
})

function delFlashcards() {
    localStorage.clear()
    flashcards.innerHTML = ''
    contentArray = []
}

closeCardBtn.addEventListener('click', function () {
    hideCreateCardBox()
})

function hideCreateCardBox() {
    createBox.style.display = 'none'
}

newCardBtn.addEventListener('click', function () {
    showCreateCardBox()
})

function showCreateCardBox() {
    createBox.style.display = 'block'
}

saveBtn.addEventListener('click', function () {
    addFlashcard()
})

function addFlashcard() {
    let contentArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : []
    let flashcard_info = {
        id: question.value+answer.value ,
        'my_question': question.value,
        'my_answer': answer.value
    }
    contentArray.push(flashcard_info)
    localStorage.setItem('items', JSON.stringify(contentArray))
    divMAker(contentArray[contentArray.length - 1])
    question.value = ''
    answer.value = ''
}

function removeBtnClick() {
    let removeBlock = document.querySelector('.flashcard')
    let localContentArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : []
    let newArray = []
    localContentArray.forEach(element => {
        if (element.id != removeBlock.id){
            newArray.push(element)
        }
    })

    localStorage.clear()
    flashcards.innerHTML = ''
    localStorage.setItem('items', JSON.stringify(newArray))
    newArray.forEach(element => divMAker(element));
}

function divMAker(text) {
    let div = document.createElement('div')
    let h2_question = document.createElement('h2')
    let h2_answer = document.createElement('h2')
    div.className = 'flashcard'
    div.id = text.id
    h2_question.setAttribute('style', 'border-top: 1px solid red; padding: 15px; margin-top: 30px;')
    h2_question.innerHTML = text.my_question
    h2_answer.setAttribute('style', 'text-align: center; display: none; color:red')
    h2_answer.innerHTML = text.my_answer

    let removeBtn = document.createElement('p')
    removeBtn.innerHTML = 'X'
    removeBtn.setAttribute('style', 'color: red; float: right; margin: 8px 8px 0 0')

    div.appendChild(removeBtn)
    div.appendChild(h2_question)
    div.appendChild(h2_answer)

    div.addEventListener('click', function () {
        if (h2_answer.style.display == 'none') {
            h2_answer.style.display = 'block'
        }
        else {
            h2_answer.style.display = 'none'
        }
    })
    flashcards.appendChild(div)
    removeBtn.addEventListener('click', removeBtnClick)
}