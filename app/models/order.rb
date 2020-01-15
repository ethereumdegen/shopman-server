class Order < ApplicationRecord


  validates :subtotal_currency_id , :presence => true


  belongs_to :user, optional: true

  has_many :order_rows

  has_one :shipping_info, as: :shippable

  #belongs_to :user


  belongs_to :subtotal_currency, class_name: 'Currency'


  enum order_status: {
   started: 0,
   invoiced: 1,
   paid:2,
   shipped: 3,
   complete:4
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

    def getSubtotalData
      return {
        subtotal_currency: self.subtotal_currency.getExportData,
        subtotal_raw_units: self.subtotal_raw_units,
        subtotal_formatted: CurrencyHelper.getPriceFormatted({raw_units: self.subtotal_raw_units, currency: self.subtotal_currency})
      }
    end


end
