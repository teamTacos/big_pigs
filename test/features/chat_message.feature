Feature: Users should be able to chat with each other

	Scenario: Chat message should be sent to all users in the game
		Given 3 players have joined the game
		When one of the players sends a chat message
		Then the message should be sent to each of the players

	Scenario: Chat message should be have user name as prefix
		Given a new player joins the game
		When the player sends a chat message
		Then I should see that the player name shows with the message