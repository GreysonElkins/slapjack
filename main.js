var game = new Game();
var pageCenterPile = document.querySelector('.center-pile')
var h1 = document.querySelector('h1');

window.onload = game.setGame();

window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  var player;
  var keypress = event.which
  if (keypress == 81 || keypress == 70) {
    player = game.player1
  } else if (keypress == 80 || keypress == 74) {
    player = game.player2;
  }
  gameHandler(player, keypress);
}

function gameHandler(player, keypress) {
  if (keypress == 81 || keypress == 80) {
    hideText();
    game.movePlayersCard(player);
    showCard(player);
  } else if (keypress == 70 || keypress == 74) {
    game.slap(player);
    removePile(player);
    wipeHand(player);
    textToScreen(player);
  }
}

function showCard(player) {
  var color;

  if (player.id == "1") {
    color = "#009FB7";
  } else {
    color = "#fFD23F";
  }

  if (game.centerPile[0] !== undefined) {

  pageCenterPile.innerHTML =
    `<img src="${game.centerPile[0].src}" alt="${game.centerPile[0].suit}
    ${game.centerPile[0].type}" id="center-card" />`;

  document.getElementById('center-card').style.boxShadow = `0 0 13px 0px ${color}`;
  }

  wipeHand(player);
}

function removePile() {
  if (game.centerPile[0] == undefined) {
  pageCenterPile.innerHTML = "";
  }
}

function wipeHand(player){
  if (player.hand == []) {
    document.getElementById(`.${player}-hand`).classList.add('.hidden');
  }
}

function textToScreen(player){
  var playerNum;
  var opponent;

  if (player.id = "1") {
    playerNum = "Player 1";
    opponent = "Player 2";
  } else {
    playerNum = "Player 2";
    opponent = "Player 1"
  }


  if (game.message == 'SLAPJACK!' ||
  game.message == 'SANDWHICH!' ||
  game.message == 'DOUBLE!') {
    h1.innerText = `${game.message} ${playerNum} takes the pile!`
  } else if (game.message == "foul") {
    h1.innerText = `BAD SLAP! ${playerNum} foreits a card to ${opponent}!`
  } else if (game.message == "win") {
    h1.innerText = `${opponent} wins!`
  }
  h1.classList.remove('hidden')
}

function hideText() {
  h1.classList.add('hidden');
}
//
