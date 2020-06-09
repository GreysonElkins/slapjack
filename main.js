var startAppSection = document.querySelector('.start-game');
var userForm = document.querySelector('.player-form');
var pageCenterPile = document.querySelector('.center-pile');
var h1 = document.querySelector('h1');
var userFormElements = document.querySelectorAll('.form-element')

var game = new Game();
var currentPlayer = game.whoseTurn

startAppSection.addEventListener('click', startAppHandler);
userForm.addEventListener('click', userFormHandler);
window.addEventListener('keydown', handleGameKeyDown);

//event handlers
function startAppHandler(event) {
  if (event.target.id === 'start') {
    setMatchPage();
    startAppSection.classList.add('hidden');
  } else if (event.target.id === 'make-new-players') {
    showUserInputForm();
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
  if (keypress === 81 && currentPlayer === game.player1
    || keypress === 80 && currentPlayer === game.player2) {
      hideGameMessage();
      var color = determineCenterCardShadow()
      game.movePlayersCard(currentPlayer);
      showCenterCard(color);
      showPlayerCardCount();
  } else if (keypress === 70 && game.centerPile[0] !== undefined
    || keypress === 74 && game.centerPile[0] !== undefined) {
      game.slap(currentPlayer);
      removeCenterPile();
      textToScreen();
      showPlayerCardCount();
  }
}
function userFormHandler(event) {
  if (event.target.id === 'save-user') {
    checkUserInput();
  } else if (event.target.id === 'yes'
    || event.target.id === 'no') {
      createOrChooseUser(event);
  }
}
//site set-up
function setMatchPage() {
  showUserNames();
  game.setGame();
  showWinCount();
  showPlayerCardCount()
  document.querySelector(`#player-1-hand`).classList.remove('hidden');
  document.querySelector(`#player-2-hand`).classList.remove('hidden');
}

function setUpPlayerData(playerName) {
  player = JSON.parse(localStorage.getItem(playerName)) || playerName;
  return player
}
// gameplay
function showCenterCard(color) {
  if (game.centerPile[0] !== undefined) {
  pageCenterPile.innerHTML =
    `<img src="${game.centerPile[0].src}" alt="${game.centerPile[0].suit}
    ${game.centerPile[0].type}" id="center-card" />`;

  document.getElementById('center-card').style.boxShadow= `0 0 13px 0px ${color}`;
  }

  hideHand(currentPlayer);
  showHand(currentPlayer);
}

function determineCenterCardShadow() {
  if (currentPlayer.id === '1') {
    return '#06D6A0';
  } else {
    return '#EF476F';
  }
}

function removeCenterPile() {
  if (game.centerPile[0] === undefined) {
  pageCenterPile.innerHTML = '';
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
    showWinCount();
  }
}

function hideGameMessage() {
  h1.classList.add('hidden');
}
// displaying user info
function showPlayerCardCount() {
  var whichHand = game.player1.hand;

  for (i = 1; i < 3; i++) {
    if (i === 2) {
      whichHand = game.player2.hand;
    }
    if (whichHand.length === 1) {
    document.getElementById(`hand-${i}-count`).innerText = `${whichHand.length} card`;
    } else {
    document.getElementById(`hand-${i}-count`).innerText = `${whichHand.length} cards`;
    }
  }
  hideHand(game.findOpponent(currentPlayer));
}

function showWinCount() {
  var whichPlayer = game.player1;

  for (i = 1; i < 3; i++) {
    if (i === 2) {
      whichPlayer = game.player2;
    }
    if (whichPlayer.winCount === 1) {
      document.getElementById(`player-${i}-wins`).innerText = `${whichPlayer.winCount || 0} Win`;
    } else {
      document.getElementById(`player-${i}-wins`).innerText = `${whichPlayer.winCount || 0} Wins`;
    }
  }
}

function showUserNames() {
  h2 = document.querySelectorAll('h2');

  if (game.player1.name !== 'Player 1' || game.player2.name !== 'Player 2') {
    h2[0].innerText = game.player1.name;
    h2[1].innerText = game.player2.name;
  }
}
//user creation
function determineFormUser() {
  if (document.querySelector('#direction').innerText.includes('1')) {
    return game.player1;
  } else {
    return game.player2;
  }
}

function checkUserInput() {
  var userInputField = document.querySelector('input').value
  var player = determineFormUser(event);

  if (userInputField !== ""
  && checkStorageForCustomUser(userInputField) === false) {
    player.saveCustomUser(userInputField)
  }

  if (player.id === "1"
  && checkStorageForCustomUser(userInputField) === false) {
    promptPlayerTwo()
  } else if (checkStorageForCustomUser(userInputField) === false){
    hideUserInputForm();
    setMatchPage();
  }
}

function checkStorageForCustomUser(input) {
  if (localStorage.getItem(input) !== null) {
    showOldUserMessage();
    hideUserInputForm();
    return true;
  } else {
    return false;
  }
}
// recalling previous custom user
function createOrChooseUser(event) {
  var player = determineFormUser(event);
  var userInputField = document.querySelector('input').value;

  if (event.target.id === 'yes') {
    player.useOldCustomUser(userInputField);
  } else {
    player.saveCustomUser(userInputField);
  }

  if (player.id === '1') {
    promptPlayerTwo();
  } else {
    setMatchPage();
  }
  hideOldUserMessage();
}

function promptPlayerTwo() {
  document.querySelector('input').value = '';
  document.querySelector('#direction').innerText = "Enter Player 2's Name:";
  showUserInputForm();
}

function hideUserInputForm() {
  for (i = 0; i < 3; i++) {
    userFormElements[i].classList.add('hidden');
  }
}

function showUserInputForm() {
  for (i = 0; i < 3; i++) {
    userFormElements[i].classList.remove('hidden');
  }
}

function hideOldUserMessage() {
  document.querySelector('.old-user-msg').classList.add('hidden');
}

function showOldUserMessage() {
  document.querySelector('.old-user-msg').classList.remove('hidden');
}
