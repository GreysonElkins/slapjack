var game = new Game();
var pageCenterPile = document.querySelector('.center-pile')
var h1 = document.querySelector('h1');


window.onload = game.setGame();

window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  var player;
  var keypress = event.which
  if (keypress == 81 || keypress == 70) {
    player = game.player1;
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

  if (game.whoseTurn == "1") {
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
  if (player.hand[0] == undefined && player.id == "1") {
    document.querySelector('#player-1').classList.add('hidden');
  } else if (player.hand.length == 0 && player.id == "2") {
    document.querySelector('#player-2').classList.add('hidden');
  }
}

function textToScreen(player){
  if (game.message == 'SLAPJACK!' ||
  game.message == 'SANDWHICH!' ||
  game.message == 'DOUBLE!') {
    h1.innerText = `${game.message} Player ${player.id} takes the pile!`
  } else if (game.message == "foul") {
    h1.innerText = `BAD SLAP! Player ${player.id} foreits a card to Player ${player.opponent}!`
  } else if (game.message == "win") {
    h1.innerText = `${player.opponent} wins!`
  }
  h1.classList.remove('hidden')
}

function hideText() {
  h1.classList.add('hidden');
}
//
