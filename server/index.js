const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const cors=require('cors');


const {addUser,removeUser,getUser,getUsersinRoom} =require("./users");

const PORT=process.env.PORT || 5000;

//const router=require('./router');
const app=express();
const server=http.createServer(app);
const io=socketio(server,{
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

//app.use(router);
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials:true,
//     "Access-Control-Allow-Origin": '*'
// }));

app.use(cors());

// app.all('/', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next()
//   });
app.use("/auth",require("./Auth/auth"));

io.on('connection',(socket) =>{

    socket.on('join',(arg,callback) => {
        console.log("user has joined")
        const {name,room}=arg;
            const {error,user}=addUser({id:socket.id,name:name,room:room});
            if(error){
                return callback(error);
            }

            socket.emit('message',{user:'admin',text:`${user.name} welcome to the room ${user.room}`});

            socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});

            socket.join(user.room);

            io.to(user.room).emit('roomData',{room:user.room,users:getUsersinRoom(user.room)});
       callback();

        // const error=true;

        // if(error){
        //     callback({error:'error'})
        // }
    });

    socket.on('sendMessage',(message,callback)=>{
        const user=getUser(socket.id);

        io.to(user.room).emit('message',{user:user.name,text:message});

        io.to(user.room).emit('roomData',{room:user.room,users:getUsersinRoom(user.room)});

        callback();
    });

    socket.on('disconnect',()=>{
        const user=removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`});
        }
    });

    socket.emit("me", socket.id);

	socket.on("disconnectCall", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

})



server.listen(PORT,()=>console.log("Server has started"));