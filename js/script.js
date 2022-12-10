const flashcards = document.getElementsByClassName('flashcards')[0]
const createBox = document.getElementsByClassName('create-box')[0]
const question = document.getElementById('question')
const answer = document.getElementById('answer')
let contentArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : []
let newCardBtn = document.querySelector('#newCard')
let closeCardBtn = document.querySelector('#closeBtn')
let saveBtn = document.querySelector('#saveBtn')
let delCards = document.querySelector('#delCards')

delCards.addEventListener('click', function(){
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

saveBtn.addEventListener('click', function(){
    addFlashcard()
})

function addFlashcard() {
    let flashcard_info = {
        'my_question': question.value,
        'my_answer': answer.value
    }
    contentArray.push(flashcard_info)
    localStorage.setItem('items', JSON.stringify(contentArray))
    divMAker(contentArray[contentArray.length - 1])
    question.value = ''
    answer.value = ''
}
console.log('test')
contentArray.forEach(element=>divMAker(element));

function divMAker(text) {
    let div = document.createElement('div')
    let h2_question = document.createElement('h2')
    let h2_answer = document.createElement('h2')
    div.className = 'flashcard'
    h2_question.setAttribute('style', 'border-top: 1px solid red; padding: 15px; margin-top: 30px;')
    h2_question.innerHTML = text.my_question
    h2_answer.setAttribute('style', 'text-align: center; display: none; color:red')
    h2_answer.innerHTML = text.my_answer
    div.appendChild(h2_question)
    div.appendChild(h2_answer)
    div.addEventListener('click', function(){
        if(h2_answer.style.display == 'none'){
            h2_answer.style.display = 'block'
        }
        else{
            h2_answer.style.display = 'none'
        }
    })
    flashcards.appendChild(div)
}
