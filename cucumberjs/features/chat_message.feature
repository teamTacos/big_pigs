Feature: Users should be able to chat with each other

  Scenario: Chat message should be have user name as prefix
    Given a player is in a game of BigPigs
    When the player sends a chat message
    Then I should see that the player name shows with the message

  Scenario: Chat messages from other players should display in chat log
    Given a player is in a game of BigPigs
    When another player joins the game and sends a chat message
    Then I should see the new player message in the chat log
