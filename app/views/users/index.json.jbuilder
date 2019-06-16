json.array! @users do |user|
  json.id user.id       # 右から左へ代入
  json.name user.name
end