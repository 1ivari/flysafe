import {FaPaperPlane} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

function Navbar({title}) {
  return (
    <div className="navbar bg-neutral text-neutral-content">
        <div className="container mx-auto">
            <div className="flex-none px-2 mx-2">
                <Link to='/' className="btn normal-case text-xl">
                <FaPaperPlane />
                {title}
                </Link>
            </div>
            <div className="flex-1 px-2 mx-2">
                <div className="flex justify-end">
                    <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
                        Home
                    </Link>
                    <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
                        About
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

Navbar.defaultProps = {
    title: 'FlySafe',

}

Navbar.propTypes = {
    title: PropTypes.string,
}

export default Navbar