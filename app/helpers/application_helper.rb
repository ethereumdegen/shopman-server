module ApplicationHelper


  def logged_in?
    current_user
  end

  def has_access_level(component_name)
    case component_name

    when 'add_employer'
       return current_user && !current_user.has_account_level( User.account_levels[:verified_company] )
    when 'create_new_deal'
       return current_user && current_user.has_account_level( User.account_levels[:verified_company] )

    else
      return false
    end

  end


end
