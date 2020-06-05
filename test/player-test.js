const assert = require('chai').assert;
const Player = require('../src/player');
const Game = require('../src/game');

describe('Player', () => {
it.skip('should be a function', () => {
    assert.isFunction(Player);
  });

it.skip ('should have an id', () => {
   const player = new Player("1");

   assert.equal(player.id, "1");
  });

it.skip('should start with no wins', () => {
    const player = new Player("1");

    assert.equal(player.winCount, 0);
  });

it.skip('should start with an empty hand', () => {
     const player = new Player("1");

     assert.deepEqual(player.hand, []);
  });

  it.skip('should be able to play a card to the games central pile', () => {
    const game = new Game();
    game.player1.hand = ["king"];
    game.player1.playCard();

    assert.deepEqual(game.centerPile, ["king"]);
    assert.deepEqual(game.player1.hand, []);

  });

  it.skip('save to local storage should be a function', () => {
    const player = new Player;

    assert.isFunction(player.saveWinsToStorage(), true);
  });
});
