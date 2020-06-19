const amqp = require('amqplib/callback_api')
// amqp.connect('amqp://pnqkxgup:aahb2dch7WLbNPa_ZiaSSf0cM93-gJfz@lionfish.rmq.cloudamqp.com/pnqkxgup',
// (err,connection)=>{
//     const result = err?err:connection
//     console.log('result is ',result)
// })


receiveMessage =  async(ofUser,socket)=>{
    amqp.connect('amqp://pnqkxgup:aahb2dch7WLbNPa_ZiaSSf0cM93-gJfz@lionfish.rmq.cloudamqp.com/pnqkxgup',function(err,connection){
     
connection.createConfirmChannel( async function(error1, channel) {
    if (error1) {
      throw error1;
    }
    const queue = ofUser;
    let result = ''
    channel.assertQueue(queue, {
      durable: false
    },(err,ok)=>{
       // console.log(' the error is ',err)
        console.log(' the ok is',ok)

    });
    console.log(' the value of asserqueue is :',result)
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(queue,function (msg) {
        socket.emit('gotMessage',{Message:msg.content.toString()})
        console.log(" [x] Received %s", msg.content.toString())

    },{
        noAck:false
    },(err,ok)=>{console.log(ok)
    })
    
})


})
}

module.exports = {receiveMessage}