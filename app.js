require('dotenv').config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const cors = require("cors")

// app.use(cors())
// const io = new Server(server, { cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
// }});
const logger = require('morgan');
const path = require('path');
const helmet = require('helmet');

const PORT = process.env.PORT || 4000

// security middleware
app.use(helmet());

//  use logger middleware
app.use(logger('dev'));

//  middleware to serve public files
app.use(express.static(path.join(__dirname, 'public')));

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
io.on('connection', (socket) => {
   console.log('A user connected');
   console.log(socket.id);

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });


     // Read message recieved from client.
  socket.on('chatMessage', (data) => {
   console.log('message_from_client: ', data);
   socket.emit("chatMessage", data)
 });

   // Send a message to the connected client 5 seconds after the connection is created.
   setTimeout(() => {
      socket.emit('message_from_server', `Message: ${Math.random()}`);
    }, 5_000);
});

const errorHandler = () => (error, req, res, next) => {
   console.log('path: ', req.path);
   console.log('error: ', error);
   if (error.type === 'Redirect') {
     res.redirect('error.html');
   } else if (error.type === 'Not found') {
     res.status(404).send(error);
   } else {
     res.status(500).send(error);
   }
   next();
 };

httpServer.listen(PORT, () => {
   console.log('listening on *:3000');
});