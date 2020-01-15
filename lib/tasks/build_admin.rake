

require 'securerandom'

namespace :db do

  desc "Generate a new admin"  #rake db:build_admin[email@gmail.com]

  task :build_admin, [:email ] => [ :environment ]  do |task, args|


    @emailaddress = args.email

    @newpass = SecureRandom.hex

    @existinguser = User.find_by(name: 'admin')

    if @existinguser
        @existinguser.destroy
    end

    @user = User.new(:name => 'admin',
    :email => @emailaddress,
    :password => @newpass,
    :password_confirmation => @newpass    )

    @user.setAccessLevel(User::access_levels[:super])

    @user.skip_confirmation!
    @user.save

    p @user.userHasAdmin?

       p "Generated new user '"+@user.email+"' with password '"+@newpass+"'"


  end



end
