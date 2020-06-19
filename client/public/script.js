// client side js
var xhr = new XMLHttpRequest();

document.querySelector('#Send').addEventListener('click',(e)=>{
    console.log(" oi don't click me")
    fromUser = document.querySelector('#from').value
    toUser = document.querySelector('#to').value 
    message = document.querySelector('#message').value
    xhr.open("POST", '/sendMessage', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        fromUser:fromUser,
        toUser  :toUser,
        message :message,
        
}))
})
textArea = document.querySelector('#received')
document.querySelector('#receive').addEventListener('click',(e)=>{
    // xhr.open('GET','/receiveMessage')
    // xhr.responseType = 'json'
    // xhr.send()
    // xhr.onload = ()=>{
    //     console.log(xhr)
    //     console.log('from response',xhr.response)
    // }
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange',(e)=>{
        if(e.target.readyState===4&&e.target.status===200){
            console.log('now')
            console.log(e.target.responseText)
            textArea.textContent = e.target.responseText
    
        }
    })
    request.open('GET',"http://localhost:3000/receiveMessage")
    request.send()

})
const socket = io();

socket.on('gotMessage', function(data){
    console.log('now is ', data.Message)
    textArea.textContent += data.Message});
