Feature: Users should be able to chat with each other

  Scenario: Chat message should be have user name as prefix
    Given a player is in a game of BigPigs
    When the player sends a chat message
    Then I should see that the player name shows with the message
