When("a new player joins the game") do
  @big_pigs = BigPigs.new
  @name = Faker::Name.first_name
  @big_pigs.main_page.new_player_name.set(@name)
  @big_pigs.main_page.join_room.click
end

Then("I should see that new player is in the list of players") do
  expect(@big_pigs.main_page.player_list.text).to include @name
end

When("{int} players have joined the game") do |player_count|
	@browsers = []
	@names = []
	player_count.times do |num|
		big_pigs = BigPigs.new
		name = Faker::Name.first_name
		@names << name
		big_pigs.main_page.new_player_name.set(name)
  		big_pigs.main_page.join_room.click
  		@browsers << big_pigs
	end	
end

Then("I should see each of the player names in the list of players") do
  	@browsers.each_with_index do |browser|
  		0.upto(@browsers.count - 1) do |index|
  			expect(browser.main_page.player_names).to eql @names
		end
  	end
end