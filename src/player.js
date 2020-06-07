class Player {
  constructor (id) {
    this.id = id;
    this.name = `Player ${this.id}`
    this.winCount = this.retrieveFromStorage() || 0;
    this.hand = [];
    this.hailMary = false;
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {
    localStorage.setItem(`${this.name}`, JSON.stringify(this.winCount));
  }

  retrieveFromStorage() {
    return JSON.parse(localStorage.getItem(this.name));
  }
}

// module.exports = Player;
