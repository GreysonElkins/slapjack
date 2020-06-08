class Player {
  constructor (player, id) {
    this.id = id;
    this.name = player.name || player
    this.winCount = player.winCount || 0;
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
