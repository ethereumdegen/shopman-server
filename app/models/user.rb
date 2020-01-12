class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable




  validates :name , :presence => true, :uniqueness => true
  validates :email , :presence => true, :uniqueness => true


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable


   enum access_level: {
    basic: 0,
    intermediate: 1,
    advanced: 2,
    mod:3,
    super:4
  }


   has_one_attached :thumbnail

   


   def getThumbnailURL
     return Rails.application.routes.url_helpers.rails_blob_path(self.thumbnail) if self.thumbnail.attachment
   end



   def userHasAdmin?
     getAccessLevel

     return getAccessLevel == User::access_levels[:super]
   end

   def setAccessLevel(lvl)
     self.update_attributes({access_level: lvl})
     self.save!
   end

    def getAccessLevel

      #p 'account lvl is '+ User.access_levels[self.access_level].to_s

      return User.access_levels[self.access_level]

    end

    def hasAccessLevel?(level)
      return (getAccessLevel >= level)
    end


    def getExportData
      return {id:self.id,
        name: self.name,
        url: Rails.application.routes.url_helpers.url_for(self),
        thumbnailURL: self.getThumbnailURL
       }
    end



    def self.getNullUser
      return User.new
    end



end
