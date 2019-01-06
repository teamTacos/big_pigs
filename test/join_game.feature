Feature: Players should be able to join a game

	Scenario: Player name should be added to list of players after joining
		When a new player joings the game
		Then I should see that new player is in the list of players