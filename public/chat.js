// Make Connection

// current client
var socket = io.connect('http://localhost:5500');


// Query DOM
var message = document.getElementById("message"),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


// Emit Events
btn.addEventListener('click', function (e) {
e.preventDefault()
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        senderId:socket.id
    })
    message.value = ""
    socket.emit('typing', {
        message: "",
        handle: handle.value
    })
})




message.addEventListener('keyup', function () {
    socket.emit('typing', { handle: handle.value, message: message.value, })
})


// Listen for Events
socket.on('chat', function (data) {
    output.innerHTML += `<p class="${data.senderId === socket.id?"":"Recieved"}"><strong>${data.handle} </strong>${data.message}</p>`
})

socket.on('typing', function (data) {
    if (data.message == "") {
        feedback.innerHTML = ``
        return
    }
    feedback.innerHTML = `<p><em>${data.handle} is typing a message...</em></p>`
})