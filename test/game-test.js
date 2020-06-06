const assert = require('chai').assert;
const Game = require('../src/game.js');
const Player = require('../src/game.js');

describe('Game', () => {
it('should be a function', () => {
    assert.isFunction(Game);

  });

it('should include two player instances', () => {
    const game = new Game();

    assert.equal(game.player1.id,  "1");
    assert.equal(game.player2.id, "2");
    assert.typeOf(game.player1, 'object');
  });

it('it should include an array of all possible cards', () => {
    const game = new Game();

    assert.equal(game.deck.length, 52);
  });

it.skip('the deck can be shuffled', () => {
    const game = new Game();
    var originalOrder = game.deck;
    game.shuffle(game.deck);
    var newOrder = game.deck;

    assert.notDeepEqual(originalOrder, newOrder);
  });

it('can recieve cards from a player into the central pile', () => {
    const game = new Game();
    game.player1.hand = ["king"];
    game.movePlayersCard(game.player1);

    assert.deepEqual(game.centerPile, ["king"]);
    assert.deepEqual(game.player1.hand, [])
  });

it('can deal the deck to both players', () => {
    const game = new Game();

    game.dealCards(game.deck);

    assert.equal(game.player1.hand.length, 26);
    assert.equal(game.player2.hand.length, 26);
  });

it('can keep track of which players turn it currently is', () => {
    const game = new Game();

    assert.deepEqual(game.whoseTurn, game.player1);
    game.movePlayersCard(game.player1);
    assert.deepEqual(game.whoseTurn, game.player2);
  });

it.skip('can determine if a player slapping the card is "legal" with varying outcomes', () => {
    const game = new Game();
    var king = {type:"king"};
    var king2 = {type:"king"};
    var queen = {type:"queen"};
    var jack = {type:"jack"};
    var ten = {type:"ten"};

    game.centerPile = [king2, jack, king];
    game.slap(game.player1);
    assert.deepEqual(game.centralPile, undefined);

    game.centerPile = [king, jack, ten];
    game.slap(game.player1);
    assert.deepEqual(game.centralPile, [king, jack, ten]);

    game.centerPile = [king, king2, jack];
    game.slap(game.player1);
    assert.deepEqual(game.centralPile, undefined);

    game.centerPile = [jack, queen, ten];
    game.slap(game.player1);
    assert.deepEqual(game.centralPile, undefined);

    game.centerPile = [ten, queen, king];
    game.slap(game.player1);
    assert.deepEqual(game.centralPile, [king, jack, ten]);
  });
it('can declare a winner', () => {
    const game = new Game();

    game.declareWinner(game.player1);
    game.declareWinner(game.player2);

    assert.equal(game.player1.winCount, 1);
    assert.equal(game.player2.winCount, 1);
  });
it.skip('can reset the deck and players when a game is won', () => {
    const game = new Game();
    var king = {type:"king"};
    var king2 = {type:"king"};
    var queen = {type:"queen"};
    var jack = {type:"jack"};
    var ten = {type:"ten"};

    game.player1.hand = [king, king2, queen, jack, ten];
    game.declareWinner(player1);
    assert.equal (game.deck.length, 5);
    assert.deepEqual (game.player1.hand, []);
  });
});
