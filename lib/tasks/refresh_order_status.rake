

require 'securerandom'


namespace :db do

  desc "Refresh Order Statuses"  #rake db:build_admin[email@gmail.com]

  task :refresh_order_status, [:email ] => [ :environment ]  do |task, args|


     

  end



end
