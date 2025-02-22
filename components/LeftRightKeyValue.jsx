import React from 'react'

const LeftRightKeyValue = ({left, right}) => {
  return (
    <div className='w-full flex flex-row items-center justify-between'>
        <p className='text-textmuted'>{left}</p>

        <p className='font-semibold'>{right}</p>
    </div>
  )
}

export default LeftRightKeyValue