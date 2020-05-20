var randomWords = require('random-words');
const colors = ["#B5EAD7","#FFB7B2","#FFDAC1","#E2F0CB","#CDAB81","#C17E9B","#D8D7B9","#87B191","#7397AA","#6a89cc","#b8e994","#38ada9","#fa983a","#3c6382","#4a69bd","#e55039","#fa983a","#fad390","#e58e26","#b71540","#eb2f06"];
const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const score=0,
        word=randomWords(),
        isRoundWinner=false,
        isGameWinner=false,
        wordsUsed=[],
        color=colors[Math.floor(Math.random()*colors.length)];

  const existingUser = users.find((user) => user.room === room && user.name === name);
//todo: error checking for room
  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room, word, score, isRoundWinner, isGameWinner, wordsUsed,color};

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}
const changeUserWord = (id,word)=>{
    const index = users.findIndex((user) => user.id === id);
    users[index].word=word
    users[index].wordSent=true
    //give word to all users
    const allUsers= getUsersInRoom(users[index].room)
    allUsers.forEach((user)=>user.wordsUsed.push(word))

    console.log("assigned in users");
}

const resetRound =(room) => {
   const allUsers= getUsersInRoom(room)
   allUsers.forEach((user)=>{
     user.isRoundWinner=false
     user.word=randomWords()
     user.wordsUsed=[]
     user.wordSent=false
   })
}
const resetGame =(room) => {
   const allUsers= getUsersInRoom(room)
   allUsers.forEach((user)=>{
     user.isRoundWinner=false
     user.isGameWinner=false
     user.word=randomWords()
     user.wordsUsed=[]
     user.wordSent=false
     user.score=0
   })
   return allUsers
}


const resetHasSent =(room) => {
  console.log("resetting hassent");
   const allUsers= getUsersInRoom(room)
   allUsers.forEach((user)=>{
     user.wordSent=false
   })
}

const overRidePlus =(name,room)=>{
  let endGame=false
  let winScore=room.split("-")[0]
      users.find((user) =>{
        if(user.name===name&&user.room===room){
          user.isRoundWinner=true;
          user.score +=1;
          console.log(winScore);
          if(winScore<=user.score){
             endGame=true
             user.isGameWinner=true
           }
        }
      })
      return endGame
}

const overRideMinus =(name,room)=>{
  let endGame=false
  let winScore=room.split("-")[0]
      users.find((user) =>{
        if(user.name===name&&user.room===room){
          user.isRoundWinner=false;
          user.score -=1;
          if(winScore<=user.score){
             endGame=true
             user.isGameWinner=true
           }
           else
             user.isGameWinner=false

        }
      })
    return endGame
}

const checkForWinners =(room)=>{
  let endRound=false
  let endGame=false
  let winScore=room.split("-")[0]
  const allUsers= getUsersInRoom(room)
  allUsers.forEach((userI)=> {
    allUsers.find((userJ)=> {
      console.log("if check");
      if((userI.word===userJ.word)&& !(userI.name===userJ.name) && (userI.word !== '')){
          if(!userI.isRoundWinner){
            console.log("in loop winner");
          endRound=true
          userI.isRoundWinner=true;
          userI.score +=1;
          if(winScore<=userI.score){
             endGame=true
             userI.isGameWinner=true
           }
         }
          if(!userJ.isRoundWinner){
            userJ.isRoundWinner=true;
            userJ.score +=1;
            if(winScore<=userJ.score){
               endGame=true
               userJ.isGameWinner=true
             }
          }
      }
      // newplayers.push(userJ)
    })
  })
  return [endRound,endGame]
}


const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUsersWordSent = (room) => users.filter((user) => user.room === room && user.wordSent===true);

module.exports = {resetGame, overRidePlus,overRideMinus, resetHasSent, getUsersWordSent, checkForWinners,resetRound, changeUserWord, addUser, removeUser, getUser, getUsersInRoom };
