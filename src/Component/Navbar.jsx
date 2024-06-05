import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import InPageNavigation from './inPageNavigation'

function Navbar() {
  return (
    <>
      <div className='w-full m-auto flex flex-col items-center bg-gray-800 text-white '>
        <InPageNavigation teams={[{ title: 'Home', path: '/' }, { title: 'News', path: '/news' }, { title: 'Table', path: '/pointsTable' }]}>
        </InPageNavigation>
      </div>
      <Outlet />
    </>

  )
}

export default Navbar
