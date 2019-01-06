Feature: Players should be able to join a game

	Scenario: Player name should be added to list of players after joining
		When a new player joins the game
		Then I should see that new player is in the list of players

	Scenario: Mulitple players should be able to join the game
		When 3 players have joined the game
		Then I should see each of the player names in the list of players