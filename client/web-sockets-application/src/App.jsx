import { useState } from 'react'
import Login from './component/Login'
import Home from './Home'
function App() {
 
const [username , setUsername] = useState("");
  return (
    <>
    <div className='bg-[#000]'>
    {username ? (
      <Home username={username}/>
    ):(
      <Login onLoginUser={setUsername}/>
    )}
    
    </div>
    </>
  )
}

export default App
