var game = new Game();
var pageCenterPile = document.querySelector('.center-pile')
var player1hand = document.querySelector();
var player2hand = document.querySelector();

window.onload = game.setGame();

window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  if (event.which == 81) {
    game.movePlayersCard(game.player1);
    placeCard(game.player1);
  } else if (event.which == 70) {
    game.slap(game.player1);

  } else if (event.which == 80) {
    game.movePlayersCard(game.player2);
    placeCard(game.player1);
  } else if (event.which == 74) {
    game.slap(game.player2);
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
}

function removeCard(pile) {
  pile.innerHTML = "";
}
