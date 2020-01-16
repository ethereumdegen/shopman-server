require 'test_helper'

class FaqControllerTest < ActionDispatch::IntegrationTest
  test "should get getcrypto" do
    get faq_getcrypto_url
    assert_response :success
  end

end
