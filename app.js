import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import moment from "moment";
import { items, welcomeMsg, orderMsg } from "./public/scripts/items.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

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

  const session = socket.request.session;
  session.save();

  if (!session.orders) {
    session.orders = [];
    session.save();
  }

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
            message.data = orderMsg[1];
          } else {
            message.data = orderMsg[2];
          }
          socket.emit("message_from_server", message);
        }, 500);
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
          `1 plate ${items[data]} added to current order\n` + orderMsg[0];

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
            message.data = orderMsg[2];
          }

          socket.emit("message_from_server", message);
        }, 1000);
        break;

      case "98":
        const orderHistory = session.orders;
        if (orderHistory.length != 0) {
          message.data = orderHistory.join("");
        } else {
          message.data = orderMsg[3];
        }
        setTimeout(() => {
          socket.emit("message_from_server", message);
        }, 1000);
        break;

      case "99":
        if (data[1]) {
          session.orders.push(data[1]);
          console.log(session.orders);
          message.data = orderMsg[4];
        } else {
          message.data = orderMsg[5];
        }
        setTimeout(() => {
          socket.emit("message_from_server", message);
        }, 1000);
        break;

      default:
        setTimeout(() => {
          message.data = orderMsg[6];
          socket.emit("message_from_server", message);
        }, 1000);
    }
  });

  // Send a message to the connected client 1 seconds after the connection is created.
  setTimeout(() => {
    const welcomeMsg = orderMsg[7];
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
