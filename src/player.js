class Player {
  constructor (name, id) {
    this.id = id;
    this.name = name.name || name
    this.winCount = name.winCount || 0;
    this.hand = [];
    this.hailMary = false;
    //This name could maybe describe a little more about what it represents 
  }

  playCard() {
    return this.hand.shift();
  }

  saveWinsToStorage() {
    localStorage.setItem(`${this.name}`, JSON.stringify(this));
  }

  retrieveFromStorage() {
    return JSON.parse(localStorage.getItem(this.name));
  }
}

// module.exports = Player;
//You can kill this ^^^^^

//Looks fine in here!