import { FaPlaneDeparture } from 'react-icons/fa'
import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'

function Navbar() {
  const { drawerOpen, setDrawerOpen } = useContext(AppContext)
  const [themeMenuOpened, setThemeMenuOpened] = useState(false)
  const themeMenu = useRef(null)
  useEffect(() => {
    if (!themeMenuOpened) {
      document.activeElement.blur()
    } else if (
      themeMenuOpened &&
      !themeMenu.current.contains(document.activeElement)
    ) {
      setThemeMenuOpened(false)
    }
  }, [themeMenuOpened])
  return (
    <>
      {/* Navbar, visible on mobile */}
      <div
        id='navbar'
        className='navbar bg-neutral flex justify-between lg:hidden px-6'
      >
        <label className='btn btn-circle swap swap-rotate'>
          <input
            type='checkbox'
            checked={drawerOpen}
            onChange={(e) => {
              setDrawerOpen(!drawerOpen)
            }}
          />
          {/* <!-- hamburger icon --> */}
          <svg
            className='swap-off fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
          </svg>

          {/* <!-- close icon --> */}
          <svg
            className='swap-on fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
          </svg>
        </label>
        <Link to='/' className='btn normal-case text-xl'>
          <div className='font-bold'>MagentaPlanner</div>
        </Link>
        <div className='dropdown dropdown-end' ref={themeMenu}>
          <label
            tabIndex={0}
            className='btn btn-ghost'
            onClick={(e) => {
              setThemeMenuOpened(!themeMenuOpened)
            }}
          >
            <FaPlaneDeparture className='mr-2 inline' />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu mt-2 bg-primary rounded-box shadow'
          >
            <li
              className='px-4 pt-4 pb-2'
              onClick={(e) => {
                setThemeMenuOpened(!themeMenuOpened)
              }}
            >
              <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
                Home
              </Link>
            </li>
            <li
              className='px-4 pt-2 pb-4'
              onClick={(e) => {
                setThemeMenuOpened(!themeMenuOpened)
              }}
            >
              <Link to='/about' className='btn btn-ghost btn-sm rounded-btn'>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar, visible on lg and up */}
      <div
        id='navbar'
        className='hidden lg:flex navbar bg-neutral justify-between px-6'
      >
        <label className='btn btn-circle swap swap-rotate'>
          <input
            type='checkbox'
            checked={drawerOpen}
            onChange={() => {
              setDrawerOpen(!drawerOpen)
            }}
          />
          {/* <!-- hamburger icon --> */}
          <svg
            className='swap-off fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
          </svg>

          {/* <!-- close icon --> */}
          <svg
            className='swap-on fill-current'
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 512 512'
          >
            <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
          </svg>
        </label>
        <div className='font-bold text-xl'>MagentaPlanner</div>
        <FaPlaneDeparture className='mr-2 inline' />
      </div>
    </>
  )
}

export default Navbar
