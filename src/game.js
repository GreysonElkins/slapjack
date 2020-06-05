// players save to local.storage, game can check local storage and recieve them
class Game {
  constructor() {
    this.player1 = new Player("1", this);
    this.player2 = new Player("2", this);
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
      src: `./assets/blue-jack`},
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
      src: `./assets/gold-jack`},
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
      src: `./assets/green-jack`},
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
      src: `./assets/red-jack`},
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
  }

  shuffle(cards) {
    for (var i = 0; i < cards.length; i++) {
    var randomDigit = Math.floor(Math.random() * cards.length);
    cards.splice(randomDigit, 0, cards.shift());
    }
  }

  dealCards() {
    var currentDeck = this.deck.length;
    for (var i = 0; i < currentDeck; i++){
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

  movePlayersCard(player) {
    if (player == this.whoseTurn) {
      this.centerPile.unshift(player.playCard());
      this.whoseTurn = this.togglePlayer(player);
    }
  }
  //THIS CAN RUN WITHOUT CARDS IN A PLAYERS HAND
  togglePlayer(player) {
    if (player == this.player1 && this.player2.hailMary == false) {
      return this.player2;
    } else if (player == this.player1) {
      return this.player1;
    }
    if (player == this.player2 && this.player1.hailMary == false) {
      return this.player1;
    } else if (player == this.player2) {
      return this.player2;
    }
  }

  resetDeck() {
    this.deck = this.player1.hand.concat(this.player2.hand.concat(this.centerPile));
    //do we need to concat the centerPile?
    this.shuffle(this.deck);
    this.player1.hand = [];
    this.player2.hand = [];
    this.centerPile = [];

    this.player1.hailMary = false;
    this.player2.hailMary = false;
  }

  slap(player) {
    if (this.centerPile.length < 0) {
      return
    }
    if (this.centerPile[0].type == this.centerPile[1].type ||
      this.centerPile[0].type == this.centerPile[2].type ||
      this.centerPile[0].type == "jack") {
        player.hand = (player.hand.concat(this.centerPile));
        this.centerPile = [];
        this.shuffle(player.hand);
        player.hailMary = false;
        console.log('Got it!')
      } else {
        this.badPlay(player);
      }
  }

  badPlay(player) {
    if (player.hand.length > 0) {
      this.togglePlayer(player).hand.push(player.hand[0]);
      player.hand.splice(0, 1);
      console.log('Uh-oh!')
    } else if (player.hailMary == true) {
      this.togglePlayer(player).winCount++;
      console.log("you lose!")
    } else if (player.hand == 0) {
      player.hailMary = true;
      console.log("one more chance!")
    }
  }
}


module.exports = Game;
