const socket = io('http://localhost:8000');

//Get DOM elements in respective js variable
const form = document.getElementById('send-container');
const  messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container")

//Audio that will play on recieveing messages
var audio =new Audio('ping_idea.mp3')

//Function which will append event info to the container
const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'right'){
        audio.play();
    }
}

//If the form get submitted send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'left');
    socket.emit('send',message);
    messageInput.value =''
})

// Ask new user for his/her name and let the server know
const name = prompt("Enter Your name to join");
socket.emit('new-user-joined',name)

//If a new user joins, recieve his/her name from the server
socket.on('user-joined', name=>{
append(`${name}: joined the chat`, 'left')

})

//If server sends a message recieve it
socket.on('recieve', data=>{
    append(`${data.name}: ${data.message} `, 'right')
    
    })

//If user leaves the chat , append the info to the container    
socket.on('right', name=>{
    append(`${name} Left the chat`, 'left')
})

    
