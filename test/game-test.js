const assert = require('chai').assert;
const Game = require('../src/game');
const Player = require('../src/game');

describe('Game', () => {
  it ('should be a function', () => {
    assert.isFunction(Game);

  });

  it('should include two player instances', () => {
    const game = new Game();

    assert.equal(game.player1.id = "1");
    assert.equal(game.player2.id = "2");
    assert.typeof(game.player1 === 'object');
  });

  it('it should include an array of all possible cards', () => {
    const game = new Game();

    assert.equal(game.deck.length == 52);
  });

  it('the deck can be shuffled', () {
    const game = new Game();
    var originalOrder = game.deck;
    game.shuffle();
    var newOrder = game.deck;

    assert.notEqual(originalOrder, newOrder);
  });

  it('can recieve cards from a player into the central pile', () => {
    const game = new Game();
    game.player1.hand = ["king"];
    game.player1.playCard();

    assert.deepEqual(game.centerPile, ["king"]);
    assert.deepEqual(game.player1.hand, [])
  });

  it('can deal the deck to both players', () => {
    const game = new Game();

    game.deal();

    assert.equal(player1.hand.length, 26);
    assert.equal(player2.hand.length, 26);
  });

  it('can keep track of which players turn it currently is', () => {
    const game = new Game();

    assert.equal(game.turnTracker, game.player1.id);
    game.player1.playCard();
    assert.equal(game.turnTracker, game.player2.id);
  })

  it('can determine if a player slapping the card is "legal" with varying outcomes', () => {
    const game = new Game();
    var king = {type:"king"};
    var king2 = {type:"king"};
    var queen = {type:"queen"};
    var jack = {type:"jack"};
    var ten = {type:"ten"};

    game.centerPile = [king2, jack, king];
    game.player1.slap();
    assert.equal(game.isLegal(), true);

    game.centerPile = [king, jack, ten];
    game.player1.slap();
    assert.equal(game.isLegal(), false);

    game.centerPile = [king, king2, jack];
    game.player1.slap();
    assert.equal(game.isLegal(), true);

    game.centerPile = [jack, queen, ten];
    game.player1.slap();
    assert.equal(game.isLegal(), true);

    game.centerPile = [ten, queen, king;]
    game.player1.slap();
    assert.equal(game.isLegal(), false);
  });
  it('can declare a winner', () => {
    const game = new Game();

    game.declareWinner(player1);
    game.declareWinner(player2);

    assert.equal(game.player1.winCount, 1);
    assert.equal(game.player2.winCount, 1);
  });
  it('can reset the deck and players when a game is won', () =>) {
    const game = new Game();
    var king = {type:"king"};
    var king2 = {type:"king"};
    var queen = {type:"queen"};
    var jack = {type:"jack"};
    var ten = {type:"ten"};

    game.player1.hand = [king, king2, queen, jack, ten];
    game.declareWinner(player1);
    assert.equal (game.deck.length, 5);
    assert.deepEqual (player1.hand, []);
  }

});
