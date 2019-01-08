require 'rubygems'
require 'taza/page'

module BigPigs
  class MainPage < ::Taza::Page


  	element(:new_player_name) { browser.text_field(id: 'playerName')}
  	element(:join_room) { browser.link(id: 'joinGame')}

  	element(:player_list) { browser.ul(id: 'player-list')}

  	element(:new_message) { browser.text_field(id: 'm')}
    element(:send_message) { browser.button(id: 'send-message')}
    element(:message_list) { browser.ul(id: 'messages')}

    element(:die1) { browser.img(id: 'die1')}
    element(:die2) { browser.img(id: 'die2')}
    element(:hold) { browser.button(id: 'hold')}
    element(:roll_again) { browser.button(id: 'roll-again')}

  	def player_names
  		player_list.h4s.collect(&:text)
  	end

  end

end