class Api::MessagesController < ApplicationController
  before_action :set_group

  def index
    @messages = @group.messages.where('id > ?', params[:id])    # message.jsのlast_message_idは、paramsにidとして入るので、params[:id]と書いて取得できる！
  end

  private

  def set_group
    @group = Group.find(params[:group_id])   # :group_idは、urlから取っている！！
  end
end

# jsからはブラウザ上のラストメッセージのidのみ渡っている