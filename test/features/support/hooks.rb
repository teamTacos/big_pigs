After do
	@big_pigs.browser.close if @big_pigs
	if @browsers
		@browsers.each {|browser| browser.browser.close}
	end
end