require 'jsonrpc-client'

module PayspecBotHelper



   def self.setInvoicePaidCallbackURL( )

    begin
     client = JSONRPC::Client.new('http://localhost:7071')
     @response = client.setInvoicePaidCallbackURL( {url: Rails.application.routes.url_helpers.invoice_callback_url}  )
     p 'response is '
     p @response
   rescue => ex
     p 'error: could not connect '
     p ex
   end

     return @response
   end

   def self.getInvoiceData( args )
     p ' get invoice data '
    begin
     client = JSONRPC::Client.new('http://localhost:7071')
     @response = client.getInvoiceOfUUID( args )
     p 'response is '
     p @response
   rescue => ex
     p 'error: could not connect '
     p ex
   end

     return @response
   end



   def self.generateOffchainInvoice( args )


     p 'generate offchain invoice'
     p args

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
