### SlapJack
###

Slapjack is a card game where the goal is to take all of the cards from your opponent. Now it's virtual so you can play without the fear of breaking a loved one's hand in an aggressive attempt to impress them with your cat-like card playing skills.

SlapJack was built in Atom based on a static comp provided by the Turing School of Software Design.

### Project Status
###

The project has made it through each required iteration, and of those there's one small known bug. Extra features have been added as well, including the ability for a user to add a wild card to the playing field by pressing 'B', and the ability for users to create, save, and recall their own player names. This last feature has a lot of room for expansion.

### Website Screengrabs:
###

Main page:

User Form:

Start Page:

### Using the App
###

#### Gameplay
###### Starting the game:
1. Press START if you'd like to immediately play the game
  * Pressing MAKE NEW PLAYERS will allow you save any wins you procure under your own name. Otherwise, wins will be saved as "Player 1" and "Player 2" respectively
1. Two hands are shown, player 1 on the left, player 2 on the right. Each player begins with half of the deck.
1. Player 1 goes first. Press 'Q' to play a card to the center pile.
1. Player 2 goes second. Press 'P' to play a card to the center pile.
1. Repeat steps 3 and 4 as needed.
###### Winning tricks:
The game is won when one player runs out of cards. As the game goes on, players 'slap' the center pile to steal it into their own hand. There are three legal times when a player can slap.
* SlapJack: A Jack is on top
* Double: Any pair is on top
* Sandwich: The card on top matches the third card in the pile    

If a player slaps and one of these is not true, the card on the top of that player's hand is shuffled into the opponents hand.

If a player runs out of cards, they have a chance to slap into the game. The game is won when the player with all the cards slaps the center pile before their empty handed opponent (or if that opponent makes a bad slap).

##### Using the wild card
If at any point the letter 'B' is pressed, a wild card will be randomly shuffled into one of the players hands. When the wild card appears and is present in the center pile, Queens become the trump card, and instead Jacks become illegal slaps.
#### Creating Users
When the app first loads the user is given the option to MAKE NEW PLAYERS. If selected, a form will show up for player 1 to enter their name, and a form for player 2 follows upon submission of the first. If either name has been used and won a game on that computer before the user will be given the chance to recall that player and their previous wins will be shown on the app under their deck.

### Reflection
###

SlapJack was built by [Greyson Elkins](https://www.github.com/GreysonElkins) as his final project for first semester at the Turing School of Software Design. The app required a lot of attention to gameplay logic, and a had a strong focus on maintaining the data model in the face of a rapidly changing DOM.

My biggest struggle was getting players to win at the end of the game, and this problem snuck up on me after I had tested both with NPM and playing the game in the console. I found that the function I was using to identify the current player's opponent, `findOpponent()`, was having issues at the end of the game because there was a safety which prevented it from firing while one player was out of cards. I don't know if adjusting this safety to occur before the function was called is necessarily SRP, but I found myself asking that question about a lot of functions. Or rather, in many places I call a function that may or may not be needed for that moment, but I didn't like having the event handlers cluttered up with if statements and let functions make their own decisions about whether to run after being invoked.

#### Future Goals
In regards to the project, I've already started toying with and implementing new features. Allowing the wild card to modify the rules of the game was particularly exciting, and helped me realized just how agile functions can be. The Make New User feature could definitely be fleshed out, to include a visual list of existing users for selection, and to better handle when a user doesn't enter values into the form.

As a programmer, I still need practice organizing code as I go. Often during a refactor I'd find myself rearranging things just so it was in an order that made sense when reading through. I would like to seek out best practices regarding this idea.

Also, working with a project of this size and complexity alone challenged my concept of DRY and SRP. At some points in an attempt to be dry I found myself adding more lines of code than were originally there. In other circumstances, I found myself building functions that could toggle, resulting in opposite results or behaving differently based on the player. While I'm very confident in some of these choices, others felt maybe a little too granular, and I'd like to continue defining these two concepts.

I'm definitely excited to learn more about node and testing suites. When I tried to implement these I found that even installation of packages was more than I was prepared for, and once they were running I discovered my limited knowledge of writing the tests themselves severely stunted their usability in designing the game.

#### In Closing
I'm very glad that this project followed two group projects. At the end of the first semester I feel solid in my ability to problem solve without getting overly stressed and my ability to conceptualize how a code will run or where it's behaving differently than I expected has grown by a lot. I don't think I'd be where I am if I hadn't worked through projects like this with other people; I learned a lot about where I needed to grow through working in those teams.

### Resources
###

[Node](https://nodejs.org/)
[MDN](https://developer.mozilla.org/)

### Acknowledgments
A big thanks to my mentor Garrett Iannuzzi for providing a code review on a massive submission. Also to Leta Keane, Scott Ertmer, and Casey Dallavalle for a great start at Turing. And of course, Orlando Murcio, Derek Romero, and Keith Crofton for being awesome teammates on group projects in preperation for this. 
