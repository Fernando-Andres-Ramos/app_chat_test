const express = require('express')
const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const messages = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" }
];

io.on('connection',socket => {
  console.log('Un cliente se ha conectado');
  socket.emit('messages', messages);

  socket.on('new-message',data => {
      messages.push(data);
      io.sockets.emit('messages', messages);
  });
});


httpServer.listen(8080,()=>console.log("server on"))
