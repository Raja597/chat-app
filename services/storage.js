const mongoose = require('mongoose')
const messages = require('../routes/messages')
mongoose.connect('mongodb+srv://Raja:useme@cluster0-0pvtn.mongodb.net/first?retryWrites=true&w=majority',{useNewUrlParser:true})
const messageModel = mongoose.model('messagesdata',{ofUser:String,fromUsers:String,messages:String})

findData = async (key)=>{
    return await messageModel.find({ofUser:key})
}
getData = async(ofUser)=>{
    const toUser = ofUser
    foundUser = (await findData(toUser)).length===0?false:true
    console.log('getting data is executed')
    if(foundUser){
        console.log('found user')
        //messages is dict of keys:fromusers value:array of messages
        result = await messageModel.findOne({ofUser:toUser})
        parsedMessages = JSON.parse(result.messages)
        console.log(parsedMessages)
        return parsedMessages
        
    }
    else{
        return 'pls provide a valid user'
    }

}
saveData = async (data)=>{
    // Data format 
    foundUser = (await findData(data.toUser)).length===0?false:true
    const fromUser = data.fromUser
    const toUser = data.toUser
    const message = data.message
    if(foundUser){
        console.log('found user')
        //messages is dict of keys:fromusers value:array of messages
        result = await messageModel.findOne({ofUser:toUser})
        parsedMessages = JSON.parse(result.messages)
        if(parsedMessages[fromUser]){
            parsedMessages[fromUser].push(message)
        } else{
        parsedMessages[fromUser] = []
        parsedMessages[fromUser].push(message)
        }
        updatedMessages = JSON.stringify(parsedMessages)
        await messageModel.updateOne({ofUser:toUser},{messages:updatedMessages})
        
    }
    else{
        console.log('not found user')
        jsondata = {}
        temp = []
        temp.push(data.message)
        jsondata[fromUser] = temp
        allMessages = JSON.stringify(jsondata)
        const myMessage = new messageModel({ofUser:data.toUser,messages:allMessages})
        await myMessage.save()
    }
    


}
module.exports.saveData = saveData
module.exports.getData = getData
