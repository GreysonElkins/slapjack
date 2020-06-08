var startAppSection = document.querySelector('.start-game');
var userForm = document.querySelector('.player-form');
var pageCenterPile = document.querySelector('.center-pile');
var h1 = document.querySelector('h1');

var currentPlayer;
var newPlayer1;
var newPlayer2;

startAppSection.addEventListener('click', startAppHandler);
userForm.addEventListener('click', userFormHandler);
window.addEventListener('keydown', handleGameKeyDown);

//event handlers
function startAppHandler(event) {
  if (event.target.id === 'start') {
    startGame();
    startAppSection.classList.add('hidden');
  } else if (event.target.id === 'make-new-players') {
    showForm();
    startAppSection.classList.add('hidden');
  }
}

function handleGameKeyDown(event) {
  var keypress = event.which;

  if (keypress === 81 || keypress === 70) {
    currentPlayer = game.player1;
  } else if (keypress === 80 || keypress === 74) {
    currentPlayer = game.player2;
  } else if (keypress === 66) {
    game.addWild();
  }
  gameHandler(keypress);
}

function gameHandler(keypress) {
  if (keypress === 81 || keypress === 80) {
    hideGameMessage();
    game.movePlayersCard(currentPlayer);
    showCenterCard();
    playerCardCount();
  } else if (keypress === 70 || keypress === 74) {
    game.slap(currentPlayer);
    removeCenterPile();
    textToScreen();
    playerCardCount();
  }
}

function userFormHandler(event) {
  if (event.target.id === "save-user") {
    checkUserInput();
  } else if (event.target.id === "yes") {
    yesSelectUser(event);
  } else if (event.target.id === "no") {
    noSelectUser(event);
  }
}

//site set-up
function startGame(firstplayer, secondplayer) {
  var player1 = firstplayer || "Player 1"
  var player2 = secondplayer || "Player 2"

  game = new Game(player1, player2);
  showUserNames();
  game.setGame();
  findWinCount();
  playerCardCount()
  document.querySelector(`#player-1-hand`).classList.remove('hidden');
  document.querySelector(`#player-2-hand`).classList.remove('hidden');
}

function setUpPlayerData(playerName, num) {
  player = JSON.parse(localStorage.getItem(playerName)) || playerName;
  if (player === undefined && num === 1) {
    player = "Player 1";
  }
  if (player === undefined && num === 2) {
    player = "Player 2";
  }
  return player
}

// gameplay
function showCenterCard() {
  var color;

  if (game.whoseTurn.id === "1") {
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

  hideHand(currentPlayer);
  showHand(currentPlayer);
}

function removeCenterPile() {
  if (game.centerPile[0] === undefined) {
  pageCenterPile.innerHTML = "";
  }

  hideHand(currentPlayer);
  showHand(currentPlayer);
}

function hideHand(whichPlayer){
  var hand = document.querySelector(`#player-${whichPlayer.id}-hand`)

  if (whichPlayer.hand[0] === undefined) {
    hand.classList.add('hidden');
  }
}

function showHand(whichPlayer) {
  var hand = document.querySelector(`#player-${whichPlayer.id}-hand`);

  if (whichPlayer.hand[0] !== undefined) {
    hand.classList.remove('hidden');
  }
}
// game messages
function textToScreen() {
  h1.innerText = `${game.message}`;
  h1.classList.remove('hidden');

  if (game.message.includes('wins!')) {
    findWinCount();
  }
}

function hideGameMessage() {
  h1.classList.add('hidden');
}
// displaying user info
function playerCardCount() {
    document.getElementById('hand-1-count').innerText = `${game.player1.hand.length} cards`;

    document.getElementById('hand-2-count').innerText = `${game.player2.hand.length} cards`;

    hideHand(game.findOpponent(currentPlayer));
}

function findWinCount() {
  player1 = game.player1
  player2 = game.player2
  var subject = player1;

  for (i = 1; i < 3; i++) {
    if (i === 2) {
      subject = player2;
    }
    if (subject.winCount === 1) {
      document.getElementById(`player-${i}-wins`).innerText = `${subject.winCount || 0} Win`;
    } else {
      document.getElementById(`player-${i}-wins`).innerText = `${subject.winCount || 0} Wins`;
    }
  }
}
//user creation -"I finished this and now I'm wishing I had put these methods in the player class :(, maybe tomorrow"
function checkUserInput() {
  var userInputField = document.querySelector('input')

  if (userInputField.value !== "" &&
  checkForUser(userInputField.value) === false) {
    saveNewUser(userInputField.value)
    }
}

function checkForUser(input) {
  if (localStorage.getItem(input) !== null) {
    document.querySelector('.old-user-msg').classList.remove('hidden');

    hideForm();
    return true;
  } else {
    return false;
  }
}

function saveNewUser(input) {
    if (newPlayer1 === undefined) {
      newPlayer1 = input;
      promptPlayerTwo();
    } else if (newPlayer2 === undefined) {
      newPlayer2 = input;
      hideForm();
      startGame(newPlayer1, newPlayer2);
    }
}

function hideForm() {
  for (i = 0; i < 3; i++){
  document.querySelectorAll('.form-element')[i].classList.add('hidden');
  }
}

function showForm() {
  for (i = 0; i < 3; i++) {
  document.querySelectorAll('.form-element')[i].classList.remove('hidden');
  }
}

function showUserNames() {
  h2 = document.querySelectorAll('h2');

  if (game.player1.name !== "Player 1" || game.player2.name !== "Player 2") {
    h2[0].innerText = game.player1.name;
    h2[1].innerText = game.player2.name;
  }
}
// recalling previous custom user
function determineFormUser(event) {
  if (document.querySelector('#direction').innerText.includes('1')) {
    return "player1";
  } else {
    return "player2";
  }
}

function yesSelectUser(event) {
  var player = determineFormUser(event);
  var userInputField = document.querySelector('input').value

  if (player === "player1") {
    newPlayer1 = JSON.parse(localStorage.getItem(userInputField));
    promptPlayerTwo();
  } else if(player === "player2") {
    newPlayer2 = JSON.parse(localStorage.getItem(userInputField));

    startGame(newPlayer1, newPlayer2);
  }
  document.querySelector('.old-user-msg').classList.add('hidden');
}

function noSelectUser(){
  var player = determineFormUser(event)
  var inputValue = document.querySelector('input').value

  if (player === "player1") {
    newPlayer1 = inputValue;
    promptPlayerTwo();
  } else if (player == "player2") {
    newPlayer2 = inputValue;
    startGame(newPlayer1, newPlayer2);
  }
  document.querySelector('.old-user-msg').classList.add('hidden');
}

function promptPlayerTwo() {
  document.querySelector('input').value = "";

  document.querySelector('#direction').innerText = "Enter Player 2's Name:"

  showForm();
}
