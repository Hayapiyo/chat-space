$(function() {

  var search_list = $("#user-search-result");
  var members_list = $("#chat-group-users");

  function appendUserToSearchList(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user_search_add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加
                  </a>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }

  function appendUserToMembersList(name, id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ id }'>
                  <p class='chat-group-user__name'>${ name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    members_list.append(html);
  }

  $(function() {
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendUserToSearchList(user);
          })
        }
        else {
          appendErrMsgToHTML("一致するユーザーはいません")
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
    });

    $(function() {
      $(document).on('click', '.user_search_add', function() {      // 追加された要素をセレクタにしたい場合、documentを指定、オプションにクラス名を記述
        var name = $(this).attr("data-user-name");
        var id = $(this).attr("data-user-id");
        appendUserToMembersList(name, id);
        $(this).parent().remove();         // クリックされた要素の親要素は、サーチリストから消える
      });
    });

    $(function() {
      $(document).on('click', '.user-search-remove', function() {
        $(this).parent().remove();        // ここでクリックした「削除ボタン」の親要素ごと削除する
      });
    });
  });
});