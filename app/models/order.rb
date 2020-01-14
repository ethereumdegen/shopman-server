class Order < ApplicationRecord

  has_many :order_rows

  has_many :shipping_infos, as: :shippable

  #belongs_to :user

  enum order_status: {
   started: 0,
   invoiced: 1,
   shipped: 2,
   complete:3
 }



    def setOrderStatus(sts)
      self.update_attributes({order_status: sts})
      self.save!
    end

     def getOrderStatus

       return Order.order_statuses[self.order_status]

     end

     def hasOrderStatus?(sts)
       return (getOrderStatus >= sts)
     end

 def getInvoiceURL
   return Rails.configuration.PAYSPEC_SERVER_URL + '/invoice.html?uuid=' + self.invoice_uuid
end

end
