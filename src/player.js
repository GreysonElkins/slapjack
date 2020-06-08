class Player {
  constructor (name, id) {
    this.id = id;
    this.name = name.name || name
    this.winCount = name.winCount || 0;
    this.hand = [];
    this.chanceToReenterGame = false;
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {
    localStorage.setItem(`${this.name}`, JSON.stringify(this));
  }

  retrieveFromStorage() {
    var update = JSON.parse(localStorage.getItem(this.name));
    this.winCount = update.winCount;
  }
}

// module.exports = Player;
