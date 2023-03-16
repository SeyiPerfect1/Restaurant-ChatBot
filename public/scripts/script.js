import { items } from ("../../items");

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });

const socket = io();

// Join chatroom
// socket.emit('joinRoom', { username, room });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });

// Message from server
socket.on("chatMessage", (message) => {
  switch (message) {
    case "10":
      // get previous value from local storage
      let previousItemValue = window.localStorage.getItem(`${items[10]}`);

      // add to localstorage
      window.localStorage.setItem(
        `${items[10]}`,
        JSON.stringify(JSON.parse(previousItemValue || 0 + 1))
      );

      outputMessage(message);
      break;

    default:
      outputMessage(message);
  }
  console.log(window.localStorage.getItem(`${items[10]}`))
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on("message_from_server", (message) => {
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const { data, time } = message;
  console.log(message);
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerHTML += `<span>${time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = data;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// Add users to DOM
// function outputUsers(users) {
//   userList.innerHTML = '';
//   users.forEach((user) => {
//     const li = document.createElement('li');
//     li.innerText = user.username;
//     userList.appendChild(li);
//   });
// }

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chat?");
  if (leaveRoom) {
    window.location = "./index.html";
  } else {
  }
});
