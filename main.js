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
    showCenterCard(player);
  } else if (keypress == 70 || keypress == 74) {
    game.slap(player);
    removePile(player);
    wipeHand(player);
    textToScreen(player);
  }
}

function showCenterCard(player) {
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

function showHand(player){
  if (player.hand[0] !== undefined) {
    document.querySelector(`#player-${player.id}`).classList.remove('hidden');
  }
}
//IF OPPONENT SLAPS WHILE YOU HAVE A HAIL MARY, WILL THEY WIN?
function textToScreen(player){
  if (game.message == "win") {
    h1.innerText = `${game.message}`
  } else if (game.message == 'SLAPJACK!' ||
  game.message == 'SANDWHICH!' ||
  game.message == 'DOUBLE!') {
    h1.innerText = `${game.message} Player ${player.id} takes the pile!`
    showHand(player)
  } else if (game.message == "foul") {
    h1.innerText = `BAD SLAP! Player ${player.id} foreits a card to Player ${player.opponent}!`
    showHand(game.togglePlayer(player));
    //
  }
  h1.classList.remove('hidden')
}

function hideText() {
  h1.classList.add('hidden');
}
//
