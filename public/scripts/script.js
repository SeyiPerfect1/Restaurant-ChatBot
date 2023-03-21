import { items } from "./items.js";

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

// Message from server
socket.on("message_from_server", (message) => {
  outputServerMessage(message);

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

  switch (msg) {
    case "0":
      let curOrders = Object.keys(localStorage);

      if (curOrders.length != 0) {
        // Emit message to server
        socket.emit("chatMessage", [msg, true]);
      } else {
        // Emit message to server
        socket.emit("chatMessage", [msg, false]);
      }
      outputClientMessage(msg);

      localStorage.clear();

      break;

    case "10":
    case "11":
    case "12":
    case "13":
    case "14":
    case "15":
    case "16":
    case "17":
    case "18":
    case "19":
    case "20":
      // Emit message to server
      socket.emit("chatMessage", msg);
      outputClientMessage(msg);

      // get previous value from local storage
      let previousItemValue = window.localStorage.getItem(`${items[msg]}`);

      // add to localstorage
      window.localStorage.setItem(
        `${items[msg]}`,
        JSON.stringify(JSON.parse(previousItemValue || 0) + 1)
      );
      break;

    case "97":
      let currentOrder = ``,
        keys = Object.keys(localStorage),
        i = 0,
        key;

      for (; (key = keys[i]); i++) {
        let quan = "plates";
        if (localStorage.getItem(key) === "1") quan = "plate";
        currentOrder += `${key} = ${localStorage.getItem(key)} ${quan}\n`;
      }

      // Emit message to server
      socket.emit("chatMessage", [msg, currentOrder]);
      outputClientMessage(msg);

      break;

    case "99":
      let checkoutOrder = ``,
        checkoOutKeys = Object.keys(localStorage),
        j = 0,
        checkOutKey;

      for (; (checkOutKey = checkoOutKeys[j]); j++) {
        let quan = "plates";
        if (localStorage.getItem(checkOutKey) === "1") quan = "plate";
        checkoutOrder += `${checkOutKey} = ${localStorage.getItem(
          checkOutKey
        )} ${quan}\n`;
      }

      // Emit message to server
      socket.emit("chatMessage", [msg, checkoutOrder]);
      outputClientMessage(msg);

      if (checkoOutKeys.length != 0) {
        localStorage.clear();
      }

      break;

    default:
      // Emit message to server
      socket.emit("chatMessage", msg);
      outputClientMessage(msg);
  }

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputServerMessage(message) {
  const { data, time } = message;
  console.log(message);
  const div = document.createElement("div");
  div.classList.add("message1");
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

function outputClientMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message2");
  const p = document.createElement("p");
  p.classList.add("meta");
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chat?");
  if (leaveRoom) {
    window.location = "./index.html";
  } else {
  }
});
