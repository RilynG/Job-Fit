import { useState } from 'react'
import './App.css'
import Jobchecker from './pages/Jobchecker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Jobchecker />
      </div>
    </>
  )
}

export default App
