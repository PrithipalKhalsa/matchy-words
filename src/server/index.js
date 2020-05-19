const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const {resetGame, overRidePlus,overRideMinus, resetHasSent ,getUsersWordSent,checkForWinners,resetRound, changeUserWord, addUser, removeUser, getUser, getUsersInRoom } = require('./users');
// const {removePlayerFromBoard, refreshBoard, addPlayerToBoard,getEndRound } = require('./game');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(router);
app.use(express.static('dist'));

io.on('connect', (socket) => {
  try{
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
      if(error) return callback(error);
      socket.join(user.room);
      io.to(user.room).emit('newBoard', { room: user.room, users: getUsersInRoom(user.room) });
      callback();
    });

    socket.on('sendMessage', (message, callback) => {
      var user = getUser(socket.id);
      changeUserWord(user.id,message)
      const allUsers= getUsersWordSent(user.room)
      io.to(user.room).emit('sent',  allUsers );
      callback();
    });

    socket.on('overRidePlus', name => {
      var user = getUser(socket.id);
      let endGame=overRidePlus(name,user.room)
      console.log("postwinners: "+JSON.stringify(getUsersInRoom(user.room))+" "+endGame);

      io.to(user.room).emit('newBoard', { room: user.room, users: getUsersInRoom(user.room),input:false,roundWinner: true, endGame: endGame, resetSent:true });
    });
    socket.on('overRideMinus', name => {
      var user = getUser(socket.id);
      let endGame=overRideMinus(name,user.room)
      console.log("postwinners: "+JSON.stringify(getUsersInRoom(user.room))+" "+endGame);

      io.to(user.room).emit('newBoard', { room: user.room, users: getUsersInRoom(user.room),input:false,roundWinner: true, endGame: endGame, resetSent:true });
    });

    socket.on('resetRound', () => {
      var user = getUser(socket.id);
      resetRound(user.room)
      io.to(user.room).emit('newBoard', { room: user.room, users: getUsersInRoom(user.room),roundWinner: false});
    });

    socket.on('resetGame', () => {
      var user = getUser(socket.id);
      let allUsers=resetGame(user.room)
      io.to(user.room).emit('newBoard', { room: user.room, users: allUsers ,roundWinner: false, endGame: false });
    });

    socket.on('startTimer',(maxTime) => {
      try{
        const timeSetter = getUser(socket.id);
        let counter=maxTime-1
        io.to(timeSetter.room).emit('toggleInput',{input:true });
        io.to(timeSetter.room).emit('timer', { time: maxTime})
        var interval = setInterval(() => {
          counter--;
          if(counter < 0 ){
              let winners=checkForWinners(timeSetter.room)
              resetHasSent(timeSetter.room)
              console.log("postwinners: "+JSON.stringify(getUsersInRoom(timeSetter.room)));
              io.to(timeSetter.room).emit('newBoard', { room: timeSetter.room, users: getUsersInRoom(timeSetter.room),input:false,roundWinner: winners[0],endGame: winners[1], resetSent:true });
              clearInterval(interval);
          };
          io.to(timeSetter.room).emit('timer', { time: counter});
        }, 1000);
      }
      catch(error){
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    // const tempBoard=removePlayerFromBoard(socket.id)
    // io.to(user.room).emit('board', { board: tempBoard });


    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('newBoard', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
  }
  catch (error){
    console.log(error);
  }
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));
