When("a new player joins the game") do
  @big_pigs = BigPigs.new
  @big_pigs.main_page.new_player_name.set('Player 1')
  @big_pigs.main_page.join_room.click
end

Then("I should see that new player is in the list of players") do
  expect(@big_pigs.main_page.player_list.text).to include 'Player 1'
end

When("{int} players have joined the game") do |player_count|
	@browsers = []
	player_count.times do |num|
		big_pigs = BigPigs.new
		big_pigs.main_page.new_player_name.set("Player #{num}")
  		big_pigs.main_page.join_room.click
  		@browsers << big_pigs
	end	
end

Then("I should see each of the player names in the list of players") do
  	@browsers.each_with_index do |browser|
  		0.upto(@browsers.count - 1) do |index|
  			expect(browser.main_page.player_list.text).to include "Player #{index}"
		end
  	end
end