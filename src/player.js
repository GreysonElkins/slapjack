class Player {
  constructor (id) {
    this.id = id;
    this.name = `Player ${this.id}`;
    this.winCount = this.retrieveWinsFromStorage() || 0;
    this.hand = [];
    this.chanceToReenterGame = false;
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {
    localStorage.setItem(`${this.name}`, JSON.stringify(this));
  }

  retrieveWinsFromStorage() {
    return JSON.parse(localStorage.getItem(this.name)).winCount;
  }

  saveCustomUser(name) {
    this.name = name;
    this.winCount = 0;
  }

  useOldCustomUser(name) {
    var oldPlayer = JSON.parse(localStorage.getItem(name));

    this.name = oldPlayer.name;
    this.winCount = oldPlayer.winCount;
  }
}
