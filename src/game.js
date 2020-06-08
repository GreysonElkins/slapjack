class Game {
  constructor(name1, name2) {
    this.player1 = new Player(name1, "1");
    this.player2 = new Player(name2, "2");
    this.deck = [
      {type: "ace",
      suit: "blue",
      src: "./assets/blue-01.png"},
      {type: "two",
      suit: "blue",
      src: "./assets/blue-02.png"},
      {type: "three",
      suit: "blue",
      src: "./assets/blue-03.png"},
      {type: "four",
      suit: "blue",
      src: "./assets/blue-04.png"},
      {type: "five",
      suit: "blue",
      src: "./assets/blue-05.png"},
      {type: "six",
      suit: "blue",
      src: "./assets/blue-06.png"},
      {type: "seven",
      suit: "blue",
      src: "./assets/blue-07.png"},
      {type: "eight",
      suit: "blue",
      src: "./assets/blue-08.png"},
      {type: "nine",
      suit: "blue",
      src: "./assets/blue-09.png"},
      {type: "ten",
      suit: "blue",
      src: "./assets/blue-10.png"},
      {type: "jack",
      suit: "blue",
      src: `./assets/blue-jack.png`},
      {type: "queen",
      suit: "blue",
      src: "./assets/blue-queen.png"},
      {type: "king",
      suit: "blue",
      src: "./assets/blue-king.png"},
      {type: "ace",
      suit: "gold",
      src: "./assets/gold-01.png"},
      {type: "two",
      suit: "gold",
      src: "./assets/gold-02.png"},
      {type: "three",
      suit: "gold",
      src: "./assets/gold-03.png"},
      {type: "four",
      suit: "gold",
      src: "./assets/gold-04.png"},
      {type: "five",
      suit: "gold",
      src: "./assets/gold-05.png"},
      {type: "six",
      suit: "gold",
      src: "./assets/gold-06.png"},
      {type: "seven",
      suit: "gold",
      src: "./assets/gold-07.png"},
      {type: "eight",
      suit: "gold",
      src: "./assets/gold-08.png"},
      {type: "nine",
      suit: "gold",
      src: "./assets/gold-09.png"},
      {type: "ten",
      suit: "gold",
      src: "./assets/gold-10.png"},
      {type: "jack",
      suit: "gold",
      src: `./assets/gold-jack.png`},
      {type: "queen",
      suit: "gold",
      src: "./assets/gold-queen.png"},
      {type: "king",
      suit: "gold",
      src: "./assets/gold-king.png"},
      {type: "ace",
      suit: "green",
      src: "./assets/green-01.png"},
      {type: "two",
      suit: "green",
      src: "./assets/green-02.png"},
      {type: "three",
      suit: "green",
      src: "./assets/green-03.png"},
      {type: "four",
      suit: "green",
      src: "./assets/green-04.png"},
      {type: "five",
      suit: "green",
      src: "./assets/green-05.png"},
      {type: "six",
      suit: "green",
      src: "./assets/green-06.png"},
      {type: "seven",
      suit: "green",
      src: "./assets/green-07.png"},
      {type: "eight",
      suit: "green",
      src: "./assets/green-08.png"},
      {type: "nine",
      suit: "green",
      src: "./assets/green-09.png"},
      {type: "ten",
      suit: "green",
      src: "./assets/green-10.png"},
      {type: "jack",
      suit: "green",
      src: `./assets/green-jack.png`},
      {type: "queen",
      suit: "green",
      src: "./assets/green-queen.png"},
      {type: "king",
      suit: "green",
      src: "./assets/green-king.png"},
      {type: "ace",
      suit: "red",
      src: "./assets/red-01.png"},
      {type: "two",
      suit: "red",
      src: "./assets/red-02.png"},
      {type: "three",
      suit: "red",
      src: "./assets/red-03.png"},
      {type: "four",
      suit: "red",
      src: "./assets/red-04.png"},
      {type: "five",
      suit: "red",
      src: "./assets/red-05.png"},
      {type: "six",
      suit: "red",
      src: "./assets/red-06.png"},
      {type: "seven",
      suit: "red",
      src: "./assets/red-07.png"},
      {type: "eight",
      suit: "red",
      src: "./assets/red-08.png"},
      {type: "nine",
      suit: "red",
      src: "./assets/red-09.png"},
      {type: "ten",
      suit: "red",
      src: "./assets/red-10.png"},
      {type: "jack",
      suit: "red",
      src: `./assets/red-jack.png`},
      {type: "queen",
      suit: "red",
      src: "./assets/red-queen.png"},
      {type: "king",
      suit: "red",
      src: "./assets/red-king.png"},
    ];
    this.wildCard = {type: "wild",
    suit: "wild",
    src: "./assets/wild.png"};
    this.centerPile = [];
    this.whoseTurn = this.player1;
    this.message;
  }
//dealer functions
  shuffle(cards) {
    var howMany = cards.length
    for (var i = 0; i < howMany; i++) {
    var randomDigit = Math.floor(Math.random() * cards.length);
    cards.splice(randomDigit, 0, cards.shift());
    }
  }

  dealCards() {
    var howMany = this.deck.length;
    for (var i = 0; i < howMany; i++){
      if (i % 2 == 0) {
        this.player2.hand.push(this.deck.shift());
      } else {
        this.player1.hand.push(this.deck.shift());
      }
    }
  }

  setGame() {
    this.shuffle(this.deck)
    this.dealCards()
  }

  resetDeck() {
    this.deck = this.player1.hand.concat(this.player2.hand).concat(this.centerPile);
    this.shuffle(this.deck);

    this.player1.hand = [];
    this.player2.hand = [];
    this.centerPile = [];

    this.player1.hailMary = false;
    this.player2.hailMary = false;

    this.setGame();
  }

  addWild() {
    var randomPlayerNumber = Math.floor(Math.random() * 2);

    if (randomPlayerNumber = 1 && this.wildCard !== undefined) {
      this.player1.hand.push(this.wildCard);
      this.shuffle(this.player2.hand);
    } else if (this.wildCard !== undefined) {
      this.player2.hand.push(this.wildCard);
      this.shuffle(this.player2.hand);
    }
    this.wildCard = undefined;
  }
//player moves
  movePlayersCard(player) {
    if (this.player1.hailMary && this.player2.hailMary) {
      this.resetDeck();
      this.dealCards();
    }
    if (player == this.whoseTurn && player.hand.length > 1) {
      this.centerPile.unshift(player.playCard());
    } else if (player == this.whoseTurn &&
      player.hand.length === 1) {
        this.centerPile.unshift(player.playCard());
        player.hailMary = true;
    }
    if (this.findOpponent(player).hailMary == false) {
      this.whoseTurn = this.findOpponent(player);
    }
  }

  slap(player){
    var takeMsg = `${player.name} takes the pile!`
    var topCard = this.centerPile[0].type;
    var trumpCard = "jack";

    if (this.centerPile.includes(this.wildCard)) {
      trumpCard = "queen"
      takeMsg = `${player.name} takes the wild Queen!`
    }

    if (this.centerPile.length > 0 && topCard == trumpCard) {
      this.message = `SLAPJACK! ${takeMsg}`;
      this.takePile(player);
    } else if (this.centerPile.length > 1 &&
      topCard == this.centerPile[1].type) {
        this.message = `DOUBLE! ${takeMsg}`;
        this.takePile(player);
    } else if (this.centerPile.length > 2
      && topCard == this.centerPile[2].type) {
        this.message = `SANDWICH! ${takeMsg}`;
        this.takePile(player);
    } else {
      this.message = `BAD SLAP! ${player.name} forfeits a card to ${this.findOpponent(player).name}!`;
      this.badPlay(player);
    }
  }

  takePile(player) {
    player.hand = (player.hand.concat(this.centerPile));
    this.centerPile = [];
    this.shuffle(player.hand);
    player.hailMary = false;
    this.checkWin(player);
  }

  badPlay(player) {
    if (player.hailMary == true) {
      this.declareWinner(player, "opponent")
    } else if (player.hand.length > 1) {
      this.findOpponent(player).hand.push(player.hand[0]);
      this.findOpponent(player).hailMary = false;
      player.hand.splice(0, 1);
    } else if (player.hand.length == 1) {
      this.findOpponent(player).hand.concat(player.hand);
      player.hand = [];
      player.hailMary = true;
    }
  }
  //game functions
  findOpponent(player) {
    if (player == this.player1) {
      return this.player2;
    } else {
      return this.player1;
    }
  }

  checkWin(player){
    var opponent = this.findOpponent(player)
    if (opponent.hailMary == true){
      this.declareWinner(player, "self");
    }
  }

  declareWinner(player, won) {
    var winner;
    if (won == "opponent") {
      winner = this.findOpponent(player)
    } else {
      winner = player;
    }
    winner.winCount ++;
    winner.saveWinsToStorage();
    this.resetDeck();
    this.message = `${winner.name} wins!`;
  }
}
