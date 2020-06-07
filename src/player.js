class Player {
  constructor (name, id) {
    this.id = id;
    this.name = `name`
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
