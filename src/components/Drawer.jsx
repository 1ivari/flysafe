import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext'

function Drawer(props) {
  const { drawerOpen, setDrawerOpen } = useContext(AppContext)
  return (
    <>
      {/* drawer-height is set in index-css. Reason is to prevent overflow due to drawer fitting under navbar */}
      <div className='drawer drawer-height'>
        <input
          id='my-drawer'
          type='checkbox'
          className='drawer-toggle'
          checked={drawerOpen}
          onChange={() => setDrawerOpen(!drawerOpen)}
        />
        <div className='drawer-content'>{props.children}</div>
        <div className='drawer-side'>
          <label htmlFor='my-drawer' className='drawer-overlay'></label>
          <ul className='menu p-4 w-80 bg-base-100 text-base-content text-center'>
            <li className='mb-2'>
              <Link to='/'> 🏠 Home </Link>
            </li>
            <hr />
            {props.drawerContent}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Drawer
