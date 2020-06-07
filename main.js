var game = new Game();
var pageCenterPile = document.querySelector('.center-pile')
var h1 = document.querySelector('h1');
var currentPlayer;

window.onload = startUp();

function startUp() {
  game.setGame();
  recallStorage();
  playerCardCount();
}
//event listener/handlers
window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  var keypress = event.which;

  if (keypress == 81 || keypress == 70) {
    currentPlayer = game.player1;
  } else if (keypress == 80 || keypress == 74) {
    currentPlayer = game.player2;
  } else if (keypress == 66) {
    game.addWild();
  }
  gameHandler(keypress);
}

function gameHandler(keypress) {
  if (keypress == 81 || keypress == 80) {
    hideGameMessage();
    game.movePlayersCard(currentPlayer);
    showCenterCard();
    playerCardCount();
  } else if (keypress == 70 || keypress == 74) {
    game.slap(currentPlayer);
    removeCenterPile();
    textToScreen();
    playerCardCount();
  }
}
//visualise cards
function showCenterCard() {
  var color;

  if (game.whoseTurn.id == "1") {
    color = "#EF476F";
  } else {
    color = "#06D6A0";
  }

  if (game.centerPile[0] !== undefined) {
  pageCenterPile.innerHTML =
    `<img src="${game.centerPile[0].src}" alt="${game.centerPile[0].suit}
    ${game.centerPile[0].type}" id="center-card" />`;

  document.getElementById('center-card').style.boxShadow= `0 0 13px 0px ${color}`;
  }

  showOrHideHand();
}

function removeCenterPile() {
  if (game.centerPile[0] == undefined) {
  pageCenterPile.innerHTML = "";
  }

  showOrHideHand();
}

function showOrHideHand(){
  var hand = document.querySelector(`#player-${currentPlayer.id}`)

  if (currentPlayer.hand[0] == undefined) {
    hand.classList.add('hidden');
  } else {
    hand.classList.remove('hidden');
  }
}
// game messages
function textToScreen() {
  h1.innerText = `${game.message}`;
  h1.classList.remove('hidden');

  if (game.message.includes('win')) {
    recallStorage();
  }
}

function hideGameMessage() {
  h1.classList.add('hidden');
}

// user info
function playerCardCount(info) {
    document.getElementById('hand-1-count').innerText = `${game.player1.hand.length} cards`;

    document.getElementById('hand-2-count').innerText = `${game.player2.hand.length} cards`;
}

function recallStorage() {
  var domWins;

  for (i = 1; i < 3; i++) {
    var storage = JSON.parse(localStorage.getItem(`Player ${i}`));
    domWins = `player-${i}-wins`;

    document.getElementById(domWins).innerText = `${storage || 0} Wins`;
  }
}
//
