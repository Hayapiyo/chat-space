# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index, unique: true|

### Asociation
- has_many :members
- has_many :groups, through: :members
- has_many :messages



## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Asociation
- has_many :members
- has_many :users, through: :members
- has_many :messages


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|------|
|image|text|--------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user



## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user