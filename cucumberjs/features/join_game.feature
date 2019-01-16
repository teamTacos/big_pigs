Feature: One or players should be able to play the game

  Scenario: Mulitple players should be able to join the game
    When Multiple players have joined the game
    Then I should see each of the player names in the list of players
