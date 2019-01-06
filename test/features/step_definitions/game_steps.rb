When("a new player joings the game") do
  @big_pigs = BigPigs.new
  @big_pigs.main_page.new_player_name.set('Player 1')
  @big_pigs.main_page.join_room.click
end

Then("I should see that new player is in the list of players") do
  expect(@big_pigs.main_page.player_list.text).to include 'Player 1'
end