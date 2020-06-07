var game = new Game();
var pageCenterPile = document.querySelector('.center-pile')

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
    game.movePlayersCard(player);
    showCard(player);
  } else if (keypress == 70 || keypress == 74) {
    game.slap(player);
    removePile();
    wipeHand(player);
  }
}

function showCard(player) {
  var color;

debugger
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
  if (game.centerPile == []) {
  pageCenterPile.innerHTML = "";
  }
}

function wipeHand(player){
  if (player.hand == []) {
    document.getElementById(`.${player}-hand`).classList.add('.hidden');
  }
}
