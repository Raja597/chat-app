const amqp = require('amqplib/callback_api')
sendMessage = (data)=>{
    fromUser = data.fromUser
    toUser   = data.toUser
    message  = data.message


amqp.connect('amqp://pnqkxgup:aahb2dch7WLbNPa_ZiaSSf0cM93-gJfz@lionfish.rmq.cloudamqp.com/pnqkxgup', 
function(error0, connection) {
    //creating connection
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
      // creating a channel
    if (error1) {
      throw error1;
    }
    const queue = toUser;
    const msg = message;
    jsondata = {}
    temp = []
    temp.push(message)
    jsondata[fromUser] = temp
    allMessages = JSON.stringify(jsondata)
    // getting that queue if it exists otherwise creating new queue
    channel.assertQueue(queue, {
      durable: false
    });
    //sending message to queue
    const result = channel.sendToQueue(queue, Buffer.from(allMessages));
    console.log(" [x] Sent %s", allMessages);
    console.log('Raja result is:',result)
  });

});
}
module.exports = {sendMessage}