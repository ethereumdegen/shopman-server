require 'jsonrpc-client'

module PayspecBotHelper





  def self.remoteping


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


   def self.generateOffchainInvoice( args )

     @uuid = nil


     begin
       client = JSONRPC::Client.new('http://localhost:7071')
       @response = client.generateOffchainInvoice( args  )
       p 'response is '
       p @response
     rescue => ex
       p 'error: could not connect '
       p ex
     end

     @uuid = @response["uuid"].to_s
     p 'lallaa '+@uuid

     return @uuid

   end


end
