import React, { useContext } from 'react'
import { Context } from './providers/ContextProvider'

type Props = {}

const App = (props: Props) => {
  const { test } = useContext(Context)
  console.log(test);


  return (
    <div className='text-3xl'>App</div>
  )
}

export default App