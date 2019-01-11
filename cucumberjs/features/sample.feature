Feature: Sample

  Scenario: Trying to get it all wired up
    Given I open a game of Big Pigs
    When I join the game
    Then I should see that my name has been added to the list of players
