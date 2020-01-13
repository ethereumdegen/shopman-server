require 'jsonrpc-client'
include Rails.application.routes.url_helpers

module PayspecBotHelper



     def self.setInvoicePaidCallbackURL( )
       client = JSONRPC::Client.new('http://localhost:7071')
       @response = client.setInvoicePaidCallbackURL( invoice_callback_url  )

       return @response
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
