
function generateMessage(from,text){
  return {
    from : from,
    text : text,
    createdAt : new Date().getTime()
  }
};

function generateLocation(from,lan,log){
  return{
    from : from,
    url  : "https://www.google.com/maps?q="+lan+","+log,
    createdAt : new Date().getTime()
  }
};

module.exports = {generateMessage,generateLocation};
