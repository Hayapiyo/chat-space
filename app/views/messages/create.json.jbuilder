json.id         @message.id
json.content    @message.content
json.date       @message.created_at.strftime("%Y-%m-%d %H:%M")
json.user_name  @message.user.name
json.image      @message.image.url


# modelから取得したデータをjson形式に変換する！
# 右側がmodelから取得したデータ
# 左側がjson形式
# 「json」はajax通信で送られてきたdataに置き換わる