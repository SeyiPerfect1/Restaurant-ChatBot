import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import moment from "moment";
import { items, welcomeMsg, orderMsg } from "./public/items.js";
import { sessionModel } from "./models/sessionModel.js";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
// import cors from "cors";

// app.use(cors())
//  cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
// }});

import logger from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";

import { convert, sessionConfig } from "./middlewares/sessionmid.js";

app.use(express.json());

//set session
app.use(sessionConfig);
io.use(convert(sessionConfig, { autoSave: true }));

const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// security middleware
app.use(helmet());

//  use logger middleware
app.use(logger("dev"));

//  middleware to serve public files
app.use(express.static(path.join(__dirname, "public")));

//Whenever someone connects this gets executed
io.on("connection", (socket) => {
  console.log("A user connected");

  console.log(socket.request.session.orderHistory);

  // Read message recieved from client.
  socket.on("chatMessage", (data) => {
    console.log("message_from_client: ", data);
    const time = moment().format(" h:mm a");

    //check if data being emitted from client is array
    //this is neccessary because some selection needs to query the client storage
    let msg = data;
    if (Array.isArray(data)) msg = data[0];

    const message = {};
    message.time = time;

    switch (msg) {
      case "0":
        setTimeout(() => {
          if (data[1]) {
            message.data = `Order cancelled successfully
                          To start a new order,
                          Select 1 to check list of items available`;
          } else {
            message.data = `You have no current order
                            To start a new order,
                            Select 1 to check list of items available`;
          }
          socket.emit("message_from_server", message);
        }, 1000);
        break;

      case "1":
        let availableItems = "Enter number to select item:";
        for (let i of Object.entries(items)) {
          availableItems += `\n${i}`;
        }
        console.log(availableItems);
        setTimeout(() => {
          message.data = availableItems;
          socket.emit("message_from_server", message);
        }, 1000);
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
        let selectedOrderMsg =
          `1 plate ${items[data]} added to current order\n` + orderMsg;

        setTimeout(() => {
          message.data = selectedOrderMsg;
          socket.emit("message_from_server", message);
        }, 1000);
        break;

      case "97":
        setTimeout(() => {
          if (data[1]) {
            message.data = data[1];
          } else {
            message.data = `You have no current order to cancel
                            To start a new order,
                            Select 1 to check list of items available`;
          }

          socket.emit("message_from_server", message);
        }, 1000);
        break;

      case "98":
        const orderHistory = socket.request.session.orderHistory
        if (orderHistory.length != 0) {
          message.data = orderHistory.join("")
        } else {
          message.data = `You have no order history!!!
                          Select 1 to check list of items available`
        }
        setTimeout(() => {
          socket.emit("message_from_server", message);
        }, 1000);
        break;

      case "99":
        if (data[1]) {
          console.log(socket.request.session) 
          socket.request.session.orderHistory += data[1]
          socket.request.session.save()
          console.log(socket.request.session)
          message.data = `Order successfully checked out`;
        } else {
          message.data = `You have no current order to cancel
                          To start a new order,
                          Select 1 to check list of items available`;
        }
        setTimeout(() => {
          socket.emit("message_from_server", message);
        }, 1000);
        break;

      default:
        setTimeout(() => {
          message.data = `Seems you entered a wrong input:\n` + welcomeMsg;
          socket.emit("message_from_server", message);
        }, 1000);
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

  // socket.on("message_from_server", (socket) => {

  // })

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
