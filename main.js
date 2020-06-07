var game = new Game();
var player1 = game.player1
var player2 = game.player2
var keypress = event.which

window.onload = game.setGame();

window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  if (keypress == 81) {
    game.movePlayersCard(game.player1);
    placeCard(player1);
  } else if (keypress == 70) {
    game.slap(player1);

  } else if (keypress == 80) {
    game.movePlayersCard(game.player2);
    placeCard(player1);
  } else if (keypress == 74) {
    game.slap(player2);
  }
}

function gameHandler(player, event) {
  if (keypress == 81 || keypress == 80) {
    game.movePlayersCard(player);
    placeCard(player);
  } 
}

function placeCard(player) {
  var color;
  var centerCard = document.getElementById('center-card');

  if (player == game.player1) {
    color = "#009FB7";
  } else {
    color = "#fFD23F";
  }

  if (game.centerPile[0] !== undefined) {
  pageCenterPile.innerHTML =
    `<img src="${game.centerPile[0].src}" alt="${game.centerPile[0].suit}
    ${game.centerPile[0].type}" id="center-card" />`;
  centerCard.style.boxShadow = `0 0 13px 0px ${color}`;
  }

  wipeHand(player);
}

function removePile() {
  var pageCenterPile = document.querySelector('.center-pile')
  if (game.centerPile == []) {
  pageCenterPile.innerHTML = "";
  }
}

function wipeHand(player){
  if (player.hand == []) {
    document.getElementById(`.${player}-hand`).classList.add.('.hidden')
  }
}
