class Order < ApplicationRecord

  has_many :order_rows

  belongs_to :user

  enum order_status: {
   started: 0,
   invoiced: 1,
   shipped: 2,
   complete:3
 }




 def getInvoiceURL
   return Rails.configuration.PAYSPEC_SERVER_URL + '/invoice/' + self.invoice_uuid
end

end
