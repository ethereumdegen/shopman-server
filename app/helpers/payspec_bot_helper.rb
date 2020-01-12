require 'jsonrpc-client'

module PayspecBotHelper





  def remoteping


    begin
      client = JSONRPC::Client.new('http://localhost:7071')
      res = client.ping( )
      p 'response is '
      p res
    rescue => ex
      p 'error: could not connect '
      p ex
    end


   end


end
