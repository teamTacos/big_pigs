When("one of the players sends a chat message") do
  @player = @players.sample
  @message = Faker::Yoda.quote
  @player[:browser].main_page.new_message.set(@message)
  @player[:browser].main_page.send_message.click
end

Then("the message should be sent to each of the players") do
  @players.each do |player|
  	expect(player[:browser].main_page.message_list.text).to include("#{@player[:name]}: #{@message}")
  end	
end

When("the player sends a chat message") do
  @message = Faker::Yoda.quote
  @big_pigs.main_page.new_message.set(@message)
  @big_pigs.main_page.send_message.click
end

Then("I should see that the player name shows with the message") do
  expect(@big_pigs.main_page.message_list.text).to include "#{@name}: #{@message}"
end