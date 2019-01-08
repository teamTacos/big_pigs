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
	@players = []
	player_count.times do |num|
		big_pigs = BigPigs.new
		name = Faker::Name.first_name
		big_pigs.main_page.new_player_name.set(name)
  		big_pigs.main_page.join_room.click
  		@players << {browser: big_pigs, name: name}
	end	
end

Then("I should see each of the player names in the list of players") do
	@players.each_with_index do |player|
		0.upto(@players.count - 1) do |index|
			names = @players.collect {|player| player[:name]}
			expect(player[:browser].main_page.player_names).to eql names
		end
	end
end

When("the player rolls the dice") do
  @big_pigs.main_page.roll_again.click
end

Then("I should see that the correct values are set for each die") do
	die1_value = @big_pigs.browser.execute_script("return die1.value")
	die2_value = @big_pigs.browser.execute_script("return die2.value")
	expect(@big_pigs.main_page.die1.class_name).to eql "die die-#{die1_value}"
	expect(@big_pigs.main_page.die2.class_name).to eql "die die-#{die2_value}"
end

Then("the game controls should only be active for the current player") do
	player_list = @players.first[:browser].browser.execute_script("return playerList")
	current_player = player_list.find {|player| player['turn'] == true}
	@players.each do |player|
 		if player[:name] == current_player['name']
 			expect(player[:browser].main_page.hold).to be_enabled
 			expect(player[:browser].main_page.roll_again).to be_enabled
 		else
 			expect(player[:browser].main_page.hold).to be_disabled
 			expect(player[:browser].main_page.roll_again).to be_disabled
 		end
	end
end

Then("the current player should be shown as active in the player list") do
  player_list = @players.first[:browser].browser.execute_script("return playerList")
	current_player = player_list.find {|player| player['turn'] == true}
	names = @players.collect {|player| player[:name]}
	@players.each do |player|
		names.each do |name|
			if name == current_player['name']
 				expect(player[:browser].main_page.player_by_name(name).class_name).to include 'active'
 			else
 				expect(player[:browser].main_page.player_by_name(name).class_name).to_not include 'active'
 			end
		end
	end
end

When("the current player chooses to hold") do
	player_list = @players.first[:browser].browser.execute_script("return playerList")
	current_player = player_list.find {|player| player['turn'] == true}
	@player = @players.find {|player| player[:name] == current_player['name']}
	@player[:browser].main_page.hold.click
end

Then("the controls for that player should be deactivated") do
	expect(@player[:browser].main_page.hold).to be_disabled
	expect(@player[:browser].main_page.roll_again).to be_disabled
end

Then("the game controls for the new current player should be active") do
	player_list = @players.first[:browser].browser.execute_script("return playerList")
	current_player = player_list.find {|player| player['turn'] == true}
	new_current_player = @players.find {|player| player[:name] == current_player['name']}
	expect(new_current_player).to_not eql @player
	expect(new_current_player[:browser].main_page.hold).to be_enabled
	expect(new_current_player[:browser].main_page.roll_again).to be_enabled
end