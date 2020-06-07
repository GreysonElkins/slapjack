class Player {
  constructor (id) {
    this.id = id;
    this.winCount = 0;
    this.hand = [];
    this.hailMary = false;
    this.opponent;

    if (this.id == 1) {
      this.opponent == "2";
    } else {
      this.opponent == "1";
    }
  }
  playCard() {
    return this.hand.shift();
  }
  saveWinsToStorage() {

  }
}

// module.exports = Player;
