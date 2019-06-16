json.array! @messages do |message|
  json.content message.content
  json.imege message.image
  json.created_at messagee.created_at
  json.user_name message.user.name
  json.id message.id
end