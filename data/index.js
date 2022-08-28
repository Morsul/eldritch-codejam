import "./css/index.css"

import ancientsData from './ancients'
import difficulties from './difficulties'
// import {brownCards, blueCards, greenCards} from './mythicCards'
import * as Cards from './mythicCards'

let deckInfo = {
  cardColor:[
    'greenCards',
    'brownCards',
    'blueCards',
  ],
  levelName:[
    'firstStage',
    'secondStage',
    'thirdStage'
  ],
  currentLevel : 0,
  cardCount: [
    {
      greenCards:0,
      blueCards:0,
      brownCards:0
    },
     {
      greenCards:0,
      blueCards:0,
      brownCards:0
    },
    {
      greenCards:0,
      blueCards:0,
      brownCards:0
    },
  ],
  cardList:[
    [],[],[]
  ],
  chosenAncient: null,
  setAncient(ancientNum){
    this.chosenAncient = ancientNum;
    this.setCardCount(ancientsData[this.chosenAncient]);
  },
  setCardCount(ancientInfo) {
    if(this.chosenAncient != null){
      this.cardCount.forEach((cC,cCIndex)=>{
        this.cardColor.forEach(cL => {
          cC[cL] = ancientInfo[this.levelName[cCIndex]][cL]
        })
      })
      stageList(this.cardCount)
      this.shuffleDeck()
    }
  },

  exception: ['',''],

  setDificulty(filter){
    this.exception[0] = filter[0]
    this.exception[1] = filter[1]
    this.setCardCount(ancientsData[this.chosenAncient]);
  },

  shuffleDeck(){
    this.currentLevel = 0;
    decRevealed.classList.remove('active')
    deckFliper.classList.add('active')
    let filteredCards = new Object();

    this.cardColor.forEach(e=>{
      filteredCards[e] = Array.from(CardFilter(this.exception[0], Cards[e]))
    })

    this.cardCount.forEach((cC, cCIndex)=>{
      this.cardList[cCIndex] = []

      this.cardColor.forEach(cL =>{
        let pickCardCount = cC[cL];
        let counter = 0;

        while(counter < pickCardCount) {
          let num = Math.floor(Math.random() * filteredCards[cL].length)
          let onlyExLeft = filteredCards[cL].every(elem=>elem.difficulty == this.exception[1]);
          if (filteredCards[cL][num].difficulty != this.exception[1] || onlyExLeft){
            this.cardList[cCIndex].push(filteredCards[cL][num].id);
            filteredCards[cL].splice(num, 1);
            counter++
          }

          if (filteredCards[cL].length==0){
            counter = pickCardCount;
          }
        }

      })
    })
  },

  decreaseCardCount(cardColor, rngCard){
    this.cardList[this.currentLevel].splice(rngCard, 1);
    this.cardCount[this.currentLevel][cardColor]--;
    if(this.cardList[this.currentLevel].length==0){
      this.currentLevel++
    }
    if(this.currentLevel >= 3){
      deckFliper.classList.remove('active');
    }
    stageList(this.cardCount);
    
  }
};

function CardFilter(exception, oldCardArray){
  if(exception == ''){
    return oldCardArray
  }
  return oldCardArray.filter(ele=> ele.difficulty != exception);
}

let ancientsList =  document.querySelector('.ancients_list')
let dificultyList =  document.querySelector('.dificulty_list')
let stageCards = document.querySelectorAll('.stageCards');
let card_list = document.querySelector('.card_list');
let decRevealed = document.querySelector('.dec_revealed')
let deckFliper = document.querySelector('.deck_unrevealed');
deckFliper.addEventListener('click', cardReveal)

ancientsData.forEach((e, index) =>{
  let ancientWrap = document.createElement("div");
  ancientWrap.classList.add('ancient_wrap')

  let ancientRadio = createRadio(e.id, 'ancients')
  ancientRadio.addEventListener('change', ()=>{deckInfo.setAncient(index)})

  let ancientImg = document.createElement("img");
  ancientImg.src = e.cardFace;

  let ancientLabel = createLabel(e.id)

  ancientLabel.appendChild(ancientImg);
  ancientWrap.append(ancientRadio, ancientLabel)
  ancientsList.appendChild(ancientWrap)
})

difficulties.forEach(e =>{
  let dificultyWrap = document.createElement("div");
  dificultyWrap.classList.add('dificulty_wrap');

  let dificultyRadio = createRadio(e.id, 'dificulty');

  if(e.id == 'normal'){
    dificultyRadio.checked = true;
  }
  dificultyRadio.addEventListener('change',()=>deckInfo.setDificulty(e.filter))

  let dificultyLabel = createLabel(e.id)

  dificultyLabel.innerText = e.name;

  dificultyWrap.append(dificultyRadio, dificultyLabel)
  dificultyList.appendChild(dificultyWrap)
})

function createRadio(id, name){
  let radio = document.createElement("input");
  radio.setAttribute('type', 'radio');
  radio.setAttribute('name', `${name}`);
  radio.setAttribute('id', `${id}`);
  return radio ;
}

function createLabel(id){
  let label = document.createElement("label");
  label.setAttribute('for', `${id}`);
  return label;
}

function stageList(ancientInfo){
  card_list.classList.add('visible');
  stageCards.forEach((e, eIndex)=>{
    deckInfo.cardColor.forEach((cL)=>{
      e.querySelector(`.${cL}`).innerText = ancientInfo[eIndex][cL]
    })
  })
}

function cardReveal(){
  let flipedImage = document.querySelector('.dec_revealed img');
  let currentLevel = deckInfo.currentLevel;
  let rngCard = Math.floor(Math.random() * deckInfo.cardList[currentLevel].length)
  let cardId = deckInfo.cardList[currentLevel][rngCard];
  let cardColor = cardId.replace(/[0-9]/g, '')+'Cards';
  let currentCard = Cards[cardColor].find(e => {return e.id == cardId})

  flipedImage.src = currentCard.cardFace
  decRevealed.classList.add('active')
  deckInfo.decreaseCardCount(cardColor, rngCard);
}