$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var img = message.image ? "${message.image}" : ""
    var html = `<div class="message__upper-info">
                  <p class="message__upper-info__talker">${ message.user_name }</p>
                  <p class="message__upper-info__date">${ message.created_at }</p>
                </<div>
                <div class="message__text">
                  ${ message.content ? message.content : "" }
                  <img src=${ img }>
                </div>`
              return html;
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
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('#message_content').val('');

    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信されませんでした。')
    })
  })
});