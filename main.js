var game = new Game();
var pageCenterPile = document.querySelector('.center-pile')
var h1 = document.querySelector('h1');
var currentPlayer;

window.onload = game.setGame();

window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  // var player;
  var keypress = event.which
  if (keypress == 81 || keypress == 70) {
    currentPlayer = game.player1;
  } else if (keypress == 80 || keypress == 74) {
    currentPlayer = game.player2;
  }
  gameHandler(keypress);
}

function gameHandler(keypress) {
  if (keypress == 81 || keypress == 80) {
    hideText();
    game.movePlayersCard(currentPlayer);
    showCenterCard();
  } else if (keypress == 70 || keypress == 74) {
    game.slap(currentPlayer);
    removePile();
    textToScreen();
  }
}

function showCenterCard() {
  var color;

  if (game.whoseTurn.id == "1") {
    color = "#FFD23F";
  } else {
    color = "#009FB7";
  }

  if (game.centerPile[0] !== undefined) {
  pageCenterPile.innerHTML =
    `<img src="${game.centerPile[0].src}" alt="${game.centerPile[0].suit}
    ${game.centerPile[0].type}" id="center-card" />`;

  document.getElementById('center-card').style.boxShadow = `0 0 13px 0px ${color}`;
  }

  showOrHideHand();
}

function removePile() {
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

//IF OPPONENT SLAPS WHILE YOU HAVE A HAIL MARY, WILL THEY WIN?
function textToScreen() {
  h1.innerText = `${game.message}`;
  h1.classList.remove('hidden');
}

function hideText() {
  h1.classList.add('hidden');
}
//
