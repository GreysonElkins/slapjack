class Player {
  constructor (id) {
    this.id = id;
    this.winCount = 0;
    this.hand = [];
    this.hailMary = false;
    this.name = `Player ${this.id}`
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {
    localStorage.setItem(`${this.name}`, JSON.stringify(this.winCount));
  }
}

// module.exports = Player;
