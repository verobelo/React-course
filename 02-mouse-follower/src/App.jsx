import './App.css'
import { useEffect, useState } from 'react'

function App () {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    console.log('Effect: ', { enabled })
  })

  const handleButtonClick = () => {
    setEnabled(!enabled)
  }

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'hotpink',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: 'translate(0px, 0px)'
      }}
      />
      <button onClick={handleButtonClick}>{enabled ? 'Disable ' : 'Enable '}Mouse Follower</button>
    </main>
  )
}

export default App
