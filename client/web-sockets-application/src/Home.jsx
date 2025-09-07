import React, { useEffect, useRef } from 'react'
import useWebSocket from 'react-use-websocket'
import throttle from 'lodash.throttle' //. to control the function call 
import { Cursor } from './component/Cursor'
const colors = ["red", "yellow", "rosybrown", "green", "orange"]
const getUserColor = (username) => {
    console.log(username, " is the username .")
    let sum = 0
    for (let i = 0; i < colors.length; i++) {
        sum += username.charCodeAt(i)
    }
    let index = sum % colors.length;
    return colors[index]
}
const renderCursor = (users, currentUser) => {
    return Object.keys(users).map(uuid => {
        const user = users[uuid]
        const label = user.username === currentUser ? "you" : user.username
        return (<Cursor key={uuid} point={[user.state.x, user.state.y]} color={getUserColor(user.username)} label={label} />)

    })
}
function Home({ username }) {
    const ws_Url = "ws://localhost:8080"     // should not hardcord the url just for learning i m doing so 
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(ws_Url, {
        queryParams: { username }            //  adds parameter in url = "ws://localhost:8080?username="khushi"
    })

    console.log(lastJsonMessage)
    const throttleTime = 50
    const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, throttleTime))      // useRef is used to hold the reference of the throttle so that multiple times rendering can be avoided 

    useEffect(() => {
        sendJsonMessage({
            x: 0,
            y: 0
        })
        window.addEventListener("mousemove", e => {
            sendJsonMessageThrottled.current({
                x: e.clientX,
                y: e.clientY
            })
        })
    }, [])
    if (lastJsonMessage) {
        return (
            <>
                <div className="relative flex flex-col items-center justify-center text-orange-100 bg-[#161616] text-3xl min-h-screen">
                    <h1 className="block text-6xl font-bold text-center text-white mt-10 mb-2 bg-[#161616]">
                        Welcome <span className="text-yellow-600">{username}</span>
                    </h1>
                     <p className="mb-6 text-center text-xl text-white/70">Coordinate with Pointers and Members.</p>
                    {renderCursor(lastJsonMessage, username)}
                </div>
            </>
        )
    }
    return (
        <>
            <div className='flex items-center justify-center text-orange-100 bg-slate-800 text-3xl min-h-screen'>
                <h1 className="block text-6xl font-bold text-center text-white mt-10 mb-2 bg-[#161616]">
                        Welcome <span className="text-yellow-600">{username}</span>
                </h1>
            </div>
        </>
    )
}

export default Home
