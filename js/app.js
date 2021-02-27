const refs = {
    buttonStart: document.querySelector('.gameStart'),
    gameSection: document.querySelector('.game-section'),
    buttonSkip: document.querySelector('.gameSkip')
}

let newArr=[...window.questions];
let index;
let totalPrize = 0;
let currentPrize = 100;
let currentAnswer;
let indexOfAnswer;
const index0 = 0;
const index1 = 1;
const index2 = 2;
const index3 = 3;
const million = 1000000;
const delay = 200;


refs.buttonStart.addEventListener('click', gameStart); 
refs.buttonSkip.addEventListener('click', qnSkip);

function mathrandom(arr) {
    index = Math.floor(Math.random() * arr.length);
    return index;  
}

function rendering(arr) {
    refs.gameSection.innerHTML = '';
    mathrandom(arr);

    refs.gameSection.innerHTML = `
        <h2 class="question_title">${arr[index].question}</h2>
        
        <ul class="list">
        <li class="answer_item">${arr[index].content[index0]}</li>
        <li class="answer_item">${arr[index].content[index1]}</li>
        <li class="answer_item">${arr[index].content[index2]}</li>
        <li class="answer_item">${arr[index].content[index3]}</li>
      </ul>

      <p class="text_total text">Total prize: ${totalPrize}</p>
      <p class="text_prize text">Prize on current round: ${currentPrize}</p>`
    
}


function markUpRenderingWin() {
    refs.buttonSkip.classList.remove('is-open'); 
    refs.gameSection.innerHTML = `<p class="info-text">Congratulations!!!! You won: ${million}</p>`;
}

function markupIncorrect() {
    refs.buttonSkip.classList.remove('is-open');  
   
  refs.gameSection.innerHTML = `<p class="info-text">Game over.Your prize is: ${totalPrize}</p>`;
}


function gameStart() {

    newArr = [...window.questions];
    refs.buttonStart.disabled = true;

    rendering(newArr);

    refs.buttonSkip.classList.add('is-open');  
    
    refs.gameSection.addEventListener('click', e => {
       
        let response = refs.gameSection.querySelector('.list');
        let responseArr = [...response.children];
        
        currentAnswer = e.target;
        indexOfAnswer = responseArr.indexOf(currentAnswer);
 
        if (indexOfAnswer === newArr[index].correct && totalPrize < million) {
            
            totalPrize += currentPrize;
            currentPrize = currentPrize * index2;

            const totalPrizeText = refs.gameSection.querySelector('.text_total');
            const currentPrizeText = refs.gameSection.querySelector('.text_prize');
            totalPrizeText.textContent = `Total prize: ${totalPrize}`;
            currentPrizeText.textContent = `Prize on current round: ${currentPrize}`;

            filterNewArr(index, newArr);
            refs.gameSection.innerHTML = '';
            rendering(newArr);
            
            if(totalPrize >= million){
               markUpRenderingWin();     
            }

        } else if (indexOfAnswer !== newArr[index].correct){
            markupIncorrect();
        } 
    })

}

function filterNewArr(num, arr) {
    arr.splice(num, 1);
    return arr;
}   

function qnSkip(){
    filterNewArr(index, newArr);
    setTimeout(() => {
 rendering(newArr); 
}, delay)
    refs.buttonSkip.disabled = true;
}