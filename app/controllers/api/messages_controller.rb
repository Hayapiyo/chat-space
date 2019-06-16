class Api::MessagesController < ApplicationController
  def index
    @last_messages = @group.messages.where('id > ?', params[Message.last.id])
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end
end