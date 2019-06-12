$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var img = message.image ? `<img src=${message.image} >` : "";
    var cont = message.content ? message.content : "";
    var html = `<li class="message">
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
      var html = buildHTML(data);     // ここのvar htmlはなぜ必要なのか
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
});