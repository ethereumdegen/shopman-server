require 'sidekiq-scheduler'

require 'worker_helpers/order_helper'

class OrderStatusWorker
  include Sidekiq::Worker
  include OrderHelper
  #1 minute interval defined in config/sidekiq.yml


  def perform()
    # do lots of project cleanup stuff here
    p 'bot: start update order statuses'


    Order.all.each do |order|

      OrderHelper.updateOrderPaidStatusFromBot(order)
      p 'bot : update order status'
      p order

    end

  end
end
