class Player {
  constructor (id) {
    this.id = id;
    this.winCount = 0;
    this.hand = [];
    this.hailMary = false;
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {
    localStorage.setItem(`${this.id}`, JSON.stringify(this.winCount));
  }
}

// module.exports = Player;
