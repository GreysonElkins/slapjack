var game = new Game();
var pageCenterPile = document.querySelector('.center-pile')
var h1 = document.querySelector('h1');
var currentPlayer;

window.onload = startUp();


function startUp() {
  game.setGame();
  recallStorage();
  handCount();
}

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
    handCount();
  } else if (keypress == 70 || keypress == 74) {
    game.slap(currentPlayer);
    removePile();
    textToScreen();
    handCount();
  }
}

function showCenterCard() {
  var color;

  if (game.whoseTurn.id == "1") {
    color = "#06D6A0";
  } else {
    color = "#EF476F";
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

function textToScreen() {
  h1.innerText = `${game.message}`;
  h1.classList.remove('hidden');

  if (game.message.includes('win')) {
    recallStorage();
  }
}

function hideText() {
  h1.classList.add('hidden');
}

function recallStorage() {
  var newPlayer = `0`
  var whichPlayer;

  for (i = 1; i < 3; i++) {
    var storage = JSON.parse(localStorage.getItem(`Player ${i}`));
    whichPlayer = `player${i}wins`;

    document.getElementById(whichPlayer).innerText = `${storage || 0} Wins`;
  }
}

function handCount(info) {
    document.getElementById('player1count').innerText = `${game.player1.hand.length} cards`;

    document.getElementById('player2count').innerText = `${game.player2.hand.length} cards`;
}

//
