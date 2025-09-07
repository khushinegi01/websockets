const http = require('http')
const server = http.createServer()
const {WebSocketServer} = require('ws')
const url = require('url')
const {v4 : uuidv4}  = require('uuid')
const connections= {}
const users = {}
const wsServer = new WebSocketServer({server});

const broadcast = ()=>{
    Object.keys(connections).forEach(uuid =>{
        const connection = connections[uuid]
        const message = JSON.stringify(users)
        connection.send(message)
    })
}

const handleMessage = (bytes , uuid)=>{
    const message = JSON.parse(bytes.toString())
    // connection.users.state = message
    // console.log(message)
    const user = users[uuid]
    user.state = message
    broadcast()
    console.log(user)
    console.log(user.username , "position : " , user.state)
}

const handleClose = (uuid)=>{
    const user = users[uuid]
    console.log(`${user.username} has been disconnected`)
    delete user;
    delete connections[uuid]; 
    broadcast();
}

wsServer.on("connection" , (connection , request)=>{
   // ws://localhost:8080?username=Alex
    const {username} = url.parse(request.url , true).query;
    const uuid = uuidv4()
    console.log("username : ", username)
    console.log("uuid : " , uuid)

    connections[uuid] = connection
    // console.log(connections)

    connection.on("message", message => handleMessage(message, uuid))
    connection.on("close" , ()=>handleClose(uuid))

    users[uuid] = {
        username,
        state : {}
    }

})
server.listen(8080 , ()=>{
    console.log("Server is listening.")
})