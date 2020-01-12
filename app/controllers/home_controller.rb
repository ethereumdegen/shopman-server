require 'jsonrpc-client'


class HomeController < ApplicationController



def index

  client = JSONRPC::Client.new('http://localhost:7071')
  res = client.ping( )
  p 'response is '
  p res
end





end
