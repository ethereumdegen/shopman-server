

require 'securerandom'

include OrderHelper

namespace :db do

  desc "Refresh Order Statuses"  #rake db:build_admin[email@gmail.com]

  task :refresh_order_status, [:email ] => [ :environment ]  do |task, args|


      Order.all.each do |order|

        OrderHelper.updateOrderPaidStatusFromBot(order)
        p 'bot : update order status'
        p order

      end

  end



end
