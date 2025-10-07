import React from 'react'
import './Spinner.css'

const Spinner = () => {
  return (
    <div className='h-full w-full flex items-center justify-center bg-amber-400'>
      <div className='spinner '></div>
      <div>
        <h2>Loading</h2>
      </div>
    </div>
  )
}

export default Spinner