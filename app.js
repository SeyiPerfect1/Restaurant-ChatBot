require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const moment = require("moment");
const { items, welcomeMsg, orderMsg } = require("./items");
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
const cors = require("cors");

// app.use(cors())
// const io = new Server(server, { cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
// }});
const logger = require("morgan");
const path = require("path");
const helmet = require("helmet");

const PORT = process.env.PORT || 4000;

// security middleware
app.use(helmet());

//  use logger middleware
app.use(logger("dev"));

//  middleware to serve public files
app.use(express.static(path.join(__dirname, "public")));

// //  use body parsr middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// //  set view engine
// app.set('view engine', 'ejs');
// app.set('views', './src/views');

// app.get("/", (req, res) => {
//    res.sendFile(__dirname + "/public/index.html");
//  });

//Whenever someone connects this gets executed
io.on("connection", (socket) => {
  console.log("A user connected");

  // Read message recieved from client.
  socket.on("chatMessage", (data) => {
    console.log("message_from_client: ", data);
    const time = moment().format(" h:mm a");
    const message = {};
    message.data = data;
    message.time = time;
    socket.emit("chatMessage", message);

    var window;

    switch (message.data) {
      case "0":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "1":
        let availableItems = "Enter number to select item:";
        for (let i of Object.entries(items)) {
          availableItems += `\n${i}`;
        }
        console.log(availableItems);
        setTimeout(() => {
          message.data = availableItems;
          socket.emit("chatMessage", message);
        }, 1500);
        break;

      case "10":
        let selectedOrderMsg = `1 ${items[10]} added to order\n` + orderMsg

        setTimeout(() => {
          message.data = selectedOrderMsg;
          socket.emit("chatMessage", message);
        }, 1500);
        break;

      case "11":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "12":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "13":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "14":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "15":
        break;

      case "16":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "17":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "18":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "19":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "20":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "97":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "98":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      case "99":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      //main menu
      case "00":
        // let availableItems = "Enter number to select item:";
        // for (let i of Object.entries(items)) {
        //   availableItems += `\n${i}`;
        // }
        // console.log(availableItems);
        // setTimeout(() => {
        //   message.data = availableItems;
        //   socket.emit("chatMessage", message);
        // }, 1500);
        break;

      default:
        setTimeout(() => {
          message.data = `Seems you entered a wrong input:\n` + welcomeMsg;
          socket.emit("chatMessage", message);
        }, 1500);
    }
  });

  // Send a message to the connected client 1 seconds after the connection is created.
  setTimeout(() => {
    const welcomeMsg = `Good day, pls kindly check the following menu to make order`;
    const time = moment().format(" h:mm a");
    const message = {};
    message.data = welcomeMsg;
    message.time = time;
    socket.emit("message_from_server", message);
  }, 1000);

  // Send a menu message to the connected client 2 seconds after the connection is created.
  setTimeout(() => {
    const time = moment().format(" h:mm a");
    const message = {};
    message.data = welcomeMsg;
    message.time = time;
    socket.emit("message_from_server", message);
  }, 2000);

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log("listening on *:3000");
});
