import session from 'express-session'
import * as dotenv from "dotenv";
dotenv.config();

import MongoStore from "connect-mongo";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    ttl: 14 * 24 * 60 * 60,// = 14 days. Default
    // stringify: false

  })
});

//convert a connected middleware to socket.io middleware
const convert = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

export { sessionConfig, convert };