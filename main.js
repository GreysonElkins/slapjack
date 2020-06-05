var game = new Game();

window.onload = game.setGame();

window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  if (event.which == 81) {
    game.movePlayersCard(game.player1);
  } else if (event.which == 70) {
    game.slap(game.player1);
  } else if (event.which == 80) {
    game.movePlayersCard(game.player2);
  } else if (event.which == 74) {
    game.slap(game.player2);
  }
}
