After do
	@big_pigs.browser.close if @big_pigs
	if @players
		@players.each {|player| player[:browser].browser.close}
	end
end