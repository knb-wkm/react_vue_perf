import React, { useState } from 'react'

const useCounter = () => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const decrement = () => {
    setCount(count - 1)
  }

  return count
}

const ReactHookSample = () => {
  const count = useCounter()

  return (
    <div>
      <div>{count}</div>
      <button>increment</button>
    </div>
  )
}

export default ReactHookSample
