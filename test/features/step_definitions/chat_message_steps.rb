When("one of the players sends a chat message") do
  big_pigs = @browsers.select.first
  @message = Faker::Yoda.quote
  big_pigs.main_page.new_message.set(@message)
  big_pigs.main_page.send_message.click
end

Then("the message should be sent to each of the players") do
  @browsers.each do |browser|
  	expect(browser.main_page.message_list.text).to include(@message)
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