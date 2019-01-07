require 'taza'
require 'os'
require 'pry'
require 'faker'

ENV['TAZA_ENV'] ||= 'isolation'
ENV['BROWSER'] ||= 'chrome'

PROJECT_ROOT = File.expand_path(File.join(File.dirname(__FILE__), '../..'))
Dir["#{PROJECT_ROOT}/lib/sites/*.rb"].each { |file| require file }
Dir["#{PROJECT_ROOT}/lib/sites/pages/*.rb"].each { |file| require file }

if OS.mac?
  ENV['PATH'] = File.join(PROJECT_ROOT, 'drivers', 'chrome', 'mac') + ':' + ENV['PATH']
  ENV['PATH'] = File.join(PROJECT_ROOT, 'drivers', 'firefox', 'mac') + ':' + ENV['PATH']
elsif OS.linux?
  ENV['PATH'] = File.join(PROJECT_ROOT, 'drivers', 'chrome', 'linux64') + ':' + ENV['PATH']
  ENV['PATH'] = File.join(PROJECT_ROOT, 'drivers', 'firefox', 'linux64') + ':' + ENV['PATH']
end