import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function InPageNavigation({ teams, children }) {
  // console.log(teams);
  const [index, setindex] = useState(0)

  let tabLinRef = useRef()   // this ref is used to make the whole line width equal to the width of the btn 
  let btnRef = useRef()  // this ref is used to make the width of the line equal to the first btn on first render 

  function tooglebtn(btn, i) {
    let { offsetWidth, offsetLeft } = btn;  // offsetWidth is used to find the width of the btn 
    // console.log(offsetLeft);
    tabLinRef.current.style.width = offsetWidth + "px"
    tabLinRef.current.style.left = offsetLeft + "px"
    setindex(i);
  }

  useEffect(() => {
    tooglebtn(btnRef.current, 0)   // This is used to put the line at team one at first render 
  }, [])

  return (
    <>
      <div className='w-full '>
        <div className=' h-[100px] flex justify-evenly items-end  w-full bg-blue-600'>

          {teams.length > 2 ?
            teams.map(({ title, path }, i) => (
              <Link to={path}>
                <button ref={i == 0 ? btnRef : null} key={i} className={'   px-5 py-4   font-bold hover:border-gray-200/30 hover:bg-gray-200/30' + (index == i ? ' text-white border-gray-200/30 bg-gray-200/30' : ' text-black')} onClick={(e) => tooglebtn(e.target, i)} >{title}</button>
              </Link>
            ))
            :
            teams.map((data, i) => (
              <button ref={i == 0 ? btnRef : null} key={i} className={' py-4 px-7    font-bold hover:border-gray-200/30 hover:bg-gray-200/30' + (index == i ? ' text-white border-gray-200/30 bg-gray-200/30' : ' text-black')} onClick={(e) => tooglebtn(e.target, i)} >{data}</button>
            ))
          }

          <hr ref={tabLinRef} className='border-white border-2 absolute duration-200' />
        </div>

        {teams.length > 2 ? "" : children[index]}
      </div>
    </>
  )
}

export default InPageNavigation
