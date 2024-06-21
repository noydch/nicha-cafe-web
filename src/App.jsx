import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RouterPath from './router/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterPath />
    </>
  )
}

export default App
