let deckID = ''
let button = document.querySelector('.getCard')
let result = document.querySelector('#result')

//Get a deck ID from deckofcardsapi
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data)
    deckID = data.deck_id
  })
  .catch((err) => {
    console.log(`error ${err}`)
  })

button.addEventListener('click', getCard)

function getCard() {
  //Use the deck we got to draw cards for two players and display the images
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data)
      document.querySelector('#playerOneCard').src = data.cards[0].image
      document.querySelector('#playerTwoCard').src = data.cards[1].image
      const playerOneCardValue = straightening(data.cards[0].value)
      const playerTwoCardValue = straightening(data.cards[1].value)

      console.log(playerOneCardValue, playerTwoCardValue)

      if (playerOneCardValue > playerTwoCardValue) {
        result.innerText = 'Player One Wins!!!!'
      } else if (playerOneCardValue < playerTwoCardValue) {
        result.innerText = 'Player Two Wins!!!!'
      } else {
        result.innerText = `it's a tie!!!!`
      }
    })
    .catch((err) => {
      console.log(`error ${err}`)
    })
}

function straightening(value) {
  let lowerCaseVal = value.toLowerCase()
  switch (lowerCaseVal) {
    case 'ace':
      return 14
      break
    case 'king':
      return 13
      break
    case 'queen':
      return 12
      break
    case 'jack':
      return 11
      break
    default:
      return Number(lowerCaseVal)
      break
  }
}

setInterval(function () {
  if (result.innerText != 'Result') {
    console.log('it worked')
    result.classList.toggle('winnerJingle')
  }
}, 0500)
