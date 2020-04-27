let socket = io();

socket.on("connect" , function()  {
  console.log("Connected to server");
});

socket.on("disconnect" , function() {
  console.log("disconnected from server");
});

socket.on('newMessage',function(message,){
    console.log(message);
    let li = document.createElement('li');
    li.innerText = message.from +  " : " + message.text;
    document.querySelector('body').appendChild(li);
});

socket.on('newLocationMessage',function(pos){
    let a = document.createElement('a');
    let li = document.createElement('li');
    a.innerText = "My current location"
    a.setAttribute('target' , '_blank');
    a.setAttribute('href' , pos.url);
    li.innerText = pos.from + " : ";
    li.appendChild(a);
    document.querySelector('body').appendChild(li);
});

document.querySelector('#btn_1').addEventListener('click',function(e){
  e.preventDefault();

  socket.emit('createdMessage',{
    from : "user",
    text : document.querySelector("input[name='text1']").value,
    createdAt : new Date().getTime()
  });
});

document.querySelector("#btn_loc").addEventListener('click',function(){
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
