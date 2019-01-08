Feature: The game rolls the dice and adds the points
	If multiple players are in the game, only one player may roll at a time.
	This player will be described as the current player.


	Scenario: When a player rolls the dice the correct numbers are displayed
		Given a new player joins the game
		When the player rolls the dice
		Then I should see that the correct values are set for each die

	Scenario: Controls for only the current player should be active
		When 3 players have joined the game
		Then the game controls should only be active for the current player

	Scenario: Current player should be shown as active in the player list
		When 3 players have joined the game
		Then the current player should be shown as active in the player list

	Scenario: When mulitple players are playing the turn can be passed
		Given 3 players have joined the game
		When the current player chooses to hold
		Then the controls for that player should be deactivated
		And the game controls for the new current player should be active
		



	Scenario: When a player rolls the dice the total is added to his score

	Scenario: The total for each player should be shown with their name in the player list