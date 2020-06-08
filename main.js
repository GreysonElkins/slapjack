var startSection = document.querySelector('.start-game');
var pageCenterPile = document.querySelector('.center-pile');
var playerForm = document.querySelector('.player-form');
var h1 = document.querySelector('h1');

var currentPlayer;
var player1 = JSON.parse(localStorage.getItem("Player 1")) || "Player 1";
var player2 = JSON.parse(localStorage.getItem("Player 2")) || "Player 2";
var buttonPress = 0;
// var game = new Game(player1, player2);

startSection.addEventListener('click', startHandler);
playerForm.addEventListener('click', formHandler);
window.addEventListener('keydown', handleKeydown);


//event handlers

function startHandler(event) {
  if (event.target.id == 'start') {
    startUpGame();
    startSection.classList.add('hidden');
  } else if (event.target.id == 'make-new-players') {
    showForm();
    startSection.classList.add('hidden');
  }

}

function formHandler(event) {
  if (event.target.id == "save-user") {
    saveUser();
  } else if (event.target.id == "yes" || event.target.id == "no") {
    userDataSelection(event);
  }
}

function handleKeydown(event) {
  var keypress = event.which;

  if (keypress == 81 || keypress == 70) {
    currentPlayer = game.player1;
  } else if (keypress == 80 || keypress == 74) {
    currentPlayer = game.player2;
  } else if (keypress == 66) {
    game.addWild();
  }
  gameHandler(keypress);
}

function gameHandler(keypress) {
  if (keypress == 81 || keypress == 80) {
    hideGameMessage();
    game.movePlayersCard(currentPlayer);
    showCenterCard();
    playerCardCount();
  } else if (keypress == 70 || keypress == 74) {
    game.slap(currentPlayer);
    removeCenterPile();
    textToScreen();
    playerCardCount();
  }
}
//site set-up
function startUpGame() {
  game = new Game(player1, player2);
  game.setGame();
  findWinCount();
  playerCardCount()
  document.querySelector(`#player-1`).classList.remove('hidden');
  document.querySelector(`#player-2`).classList.remove('hidden');
}

function showCenterCard() {
  var color;

  if (game.whoseTurn.id == "1") {
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

  showOrHideHand(currentPlayer);
}

function removeCenterPile() {
  if (game.centerPile[0] == undefined) {
  pageCenterPile.innerHTML = "";
  }

  showOrHideHand(currentPlayer);
}

function showOrHideHand(whichPlayer){
  var hand = document.querySelector(`#player-${whichPlayer.id}`)

  if (whichPlayer.hand[0] == undefined) {
    hand.classList.add('hidden');
  } else {
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
// user info
function playerCardCount() {
    document.getElementById('hand-1-count').innerText = `${game.player1.hand.length} cards`;

    document.getElementById('hand-2-count').innerText = `${game.player2.hand.length} cards`;

    showOrHideHand(game.findOpponent(currentPlayer));
}

function findWinCount() {
  player1 = game.player1
  player2 = game.player2
  var subject = player1;

  for (i = 1; i < 3; i++) {
    if (i == 2) {
      subject = player2;
    }
    if (subject.winCount == 1) {
      document.getElementById(`player-${i}-wins`).innerText = `${subject.winCount || 0} Win`;
    } else {
      document.getElementById(`player-${i}-wins`).innerText = `${subject.winCount || 0} Wins`;
    }
  }
}
//user creation
function saveUser() {
  debugger
  var inputValue = document.querySelector('input').value

  document.querySelector('input').value = "";
  buttonPress++;

  if (inputValue === "" && buttonPress == 1) {
    player1 = JSON.parse(localStorage.getItem("Player 1")) || "Player 1";
    hideForm();
    showUserNames();
    startUpGame();
  } else if (buttonPress == 1) {
    player1 = inputValue;
  }
  if (checkForUser(player1) == false && buttonPress == 1) {
    promptPlayerTwo();
  }

  if (inputValue == "" && buttonPress == 2) {
    player2 = JSON.parse(localStorage.getItem("Player 1")) || "Player 2";
    hideForm();
    showUserNames();
    startUpGame();
  } else if (buttonPress == 2) {
    player2 = inputValue;
  }
  if (checkForUser(player2) == false && buttonPress == 2) {
      hideForm();
      showUserNames();
      startUpGame();
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

function userDataSelection(event) {
var player;

  if (document.querySelector('#direction').innerText.includes('1')) {
    player = player1;
  } else {
    player = player2;
  }

  if (event.target.id = "yes" && buttonPress == 1) {
    player1 = JSON.parse(localStorage.getItem(player));
    promptPlayerTwo();
  } else if(event.target.id = "yes" && buttonPress == 2) {
    player2 = JSON.parse(localStorage.getItem(player));
    showUserNames();
    startUpGame();
  } else if (event.target.id = "no" && buttonPress == 1) {
    promptPlayerTwo();
  } else if (event.target.id = "no" && buttonPress == 2) {
    player2 = document.querySelector('input').value;
    startUpGame();
  }

  document.querySelector('.old-user-msg').classList.add('hidden');
}

function promptPlayerTwo() {
  document.querySelector('input').value = "";

  document.querySelector('#direction').innerText = "Enter Player 2's Name:"

  showForm();
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

  h2[0].innerText = player1.name || player1;
  h2[1].innerText = player2.name || player2;
}

//
