Feature: The game rolls the dice and adds the points

	Scenario: When a player rolls the dice the correct numbers are displayed
		Given a new player joins the game
		When the player rolls the dice
		Then I should see that the correct values are set for each die

	Scenario: When a player rolls the dice the total is added to his score

	Scenario: When mulitple players are playing the turn can be passed

	Scenario: The total for each player should be shown with their name in the player list

	Scenario: Controls for only the current player should be active

	Scenario: Current player should be shown as active in the player list