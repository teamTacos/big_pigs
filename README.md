# big_pigs

Multi-player dice game using node.js

####Install

```npm install```

```npm start```

####Description

Building 2-dice version of Pig

#####Pig

A simple game, played with one die, which requires a score sheet.

Specially marked dice, called "death dice", are available for this game.  They are marked in the same way as standard dice except that the 1-spot is replaced with a skull.

######Play:

Each player in turn throws the die and continues to throw the die until either a 1 is thrown or they decide to stop.  If a 1 is thrown they score nothing for that turn.  If they elect to stop before a 1 is thrown they score the total of the numbers thrown in that turn.  The scores are noted for each turn and the player who obtains a total score over 100, wins the game, provided they are not then out-scored by a subsequent player who has thrown one fewer rolls and still has a turn left.

######Variations:

You can play Pig with two dice.  A 1 thrown with either die means a player scores nothing and ends their turn.  A double-1 ends a player's turn but scores 25 points regardless of what they may have accumulated with the previous throws of that turn.  Any other double, doubles the score for that throw.  For example - double 6, totalling 12, scores 24 points.
