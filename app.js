const messages = require("./routes/messages");
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser');
const { json } = require("express");
const { receiveMessage } = require("./routes/messages");
const {sendMessage } = require('./services/sender')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cache = require('./services/cache')
const storage = require('./services/storage')
// fromUsers is of format [usersnames]
// messages is of format {fromuser:[messges],fromuser:[messages]}
app.use('/',express.static(__dirname+'/client/public'))
app.use(bodyparser.json())
app.set('view engine','ejs')



// data = {fromUser:'Raja',toUser:'Bhanu',message:'this is message raja'}

// msgModule.sendMessage(data)
app.get('/',(req,res)=>{
    // console.log(req)
    // res.sendFile('./client/index.html')
    console.log('the path is ',__dirname)
    res.sendFile(__dirname,'/client/public/index.html')
})
app.get('/myChat',async(req,res)=>{
    // get the user from the request data header
    data = {messages:''}
    data.messages = await storage.getData('bhanuuk')
    res.render('chat.ejs',{ofUser:'bhanukk',data:data})
})


app.post('/sendMessage',(req,res)=>{
    data = req.body
    
    sendMessage(data)
    storage.saveData(data)
    console.log(data)
    // need to add mongoose for storing the message sent
})

io.on('connection', function(socket) {
    console.log('A user connected');
 
    //Send a message when 
    // setTimeout(function() {
    //    //Sending an object when emmiting an event
    //    socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
    // }, 4000);
     receiveMessage('bhanuuk',socket)
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });
 

// console.log('itit is ',result)
app.get('/receiveMessage',(req,res)=>{
    // result = JSON.stringify({ack:'done bro'})
    // console.log('hello this is a test')

    res.send('this is done?')

})
http.listen(3000, function() {
    console.log('listening on localhost:3000');
 });
// app.listen(3000,()=>console.log("Listening now ok?"))
