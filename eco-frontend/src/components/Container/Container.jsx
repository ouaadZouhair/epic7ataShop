import React from 'react'

const Container = (props) => {
  return (
    <div className='mx-auto w-full md:w-[95%] lg:w-[90%] m-4'>
        {props.children}
    </div>
  )
}

export default Container