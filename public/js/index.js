let socket = io();

function scrollToBottom() {
  let messages = document.querySelector('#messages').lastElementChild;
  messages.scrollIntoView();
}

socket.on("connect" , function()  {
   let searchQuery = window.location.search.substring(1);
  let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}');

  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No Error');
    }
  })
});

socket.on("disconnect" , function() {
  console.log("disconnected from server");
});

socket.on('updateUsersList', function (users) {
  let ol = document.createElement('ol');

  users.forEach(function (user) {
    let li = document.createElement('li');
    li.innerHTML = user;
    ol.appendChild(li);
  });

  let usersList = document.querySelector('#users');
  usersList.innerHTML = "";
  usersList.appendChild(ol);
})

socket.on('newMessage',function(message,){
    let li = document.createElement('li');
    li.innerText = message.from +  " : " + message.text;
    const div = document.createElement('div');
    div.innerHTML = li;
    document.querySelector('body').appendChild(li);
    document.querySelector('#messages').appendChild(div);
    scrollToBottom();
});

socket.on('newLocationMessage',function(pos){
    let a = document.createElement('a');
    let li = document.createElement('li');
    a.innerText = "My current location"
    a.setAttribute('target' , '_blank');
    a.setAttribute('href' , pos.url);
    li.innerText = pos.from + " : ";
    li.appendChild(a);
    const div = document.createElement('div');
    div.innerHTML = li

   document.querySelector('#messages').appendChild(div);
   scrollToBottom();
    
});

document.querySelector('#submit-btn').addEventListener('click',function(e){
  e.preventDefault();

  socket.emit('createdMessage',{
    from : "user",
    text : document.querySelector("input[name='message']").value,
    createdAt : new Date().getTime()
  });
});

document.querySelector("#send-location").addEventListener('click',function(){
    if(!navigator.geolocation)
    {
      return console.log('Browser does not support geolocation.')
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLoaction' , {
          lan : position.coords.latitude,
          log : position.coords.longitude
        });
    });
});
