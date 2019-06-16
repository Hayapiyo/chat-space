$(document).on('turbolinks:load', function(){

  // ーーーー メッセージ追加 ＋ スクロール ーーーー
  function buildHTML(message) {
    var img = message.image ? `<img src=${message.image} >` : "";   // messageのimageが存在すれば、imgタグを代入。なければ何も入れない。
    var cont = message.content ? message.content : "";              // messageのcontentが存在すれば、それを代入。なければ何も入れない。
    var html = `<li class="message" data-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">${ message.user_name }</p>
                    <p class="message__upper-info__date">${ message.date }</p>
                  </div>
                  <div class="message__text">
                    ${ cont }
                    ${ img }
                  </div>
                </li>`
              return html;
  }

  // ーーーー スクロール ーーーー
  function scroll(){
    var position = $('.messages')[0].scrollHeight
    $('.messages').animate({
      scrollTop: position
    }, 1000);
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    // ーーーー値がjbuilderを通して返ってきてからの処理ーーーー
    .done(function(data){
      var html = buildHTML(data);     // 新しいメッセージのhtmlを取得し、40行目でmessagesクラスの中に追加している
      $('.messages').append(html);
      $('.form__submit').prop('disabled', '');
      $('#new_message')[0].reset();
      scroll();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信されませんでした。')
      $('.form__submit').prop('disabled', '');
    })
  })


  //ーーーー 自動更新 ーーーー
  function reloadMessages() {
    // カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = message.id

    $.ajax({
      url: group_api_messages_path,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    // ーーーー値がjbuilderを通して返ってきてからの処理ーーーー
    .done(function(messages) {
      console.log('success');
      var html = buildHTML(message)  // insertHTML += buildHTML(message)でも良い？
    })
    .fail(function() {
      console.log('error');
    });
  };
});