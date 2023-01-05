import { FaPlaneDeparture } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
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
				className='navbar bg-neutral flex justify-between lg:hidden px-6'>
				<div className='dropdown' ref={themeMenu}>
					<label
						tabIndex={0}
						className='btn btn-ghost'
						onClick={(e) => {
							setThemeMenuOpened(!themeMenuOpened)
						}}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16M4 18h7'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='dropdown-content menu mt-2 bg-primary rounded-box shadow'>
						<li
							className='px-4 pt-4 pb-2'
							onClick={(e) => {
								setThemeMenuOpened(!themeMenuOpened)
							}}>
							<Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
								Home
							</Link>
						</li>
						<li
							className='px-4 pt-2 pb-4'
							onClick={(e) => {
								setThemeMenuOpened(!themeMenuOpened)
							}}>
							<Link to='/about' className='btn btn-ghost btn-sm rounded-btn'>
								About
							</Link>
						</li>
					</ul>
				</div>
				<Link to='/' className='btn normal-case text-xl'>
					<div className='font-bold'>MagentaPlanner</div>
				</Link>
				<div>
					<FaPlaneDeparture className='mr-2 inline' />
				</div>
			</div>

			{/* Navbar, visible on lg and up */}
			<div className='hidden lg:flex navbar bg-neutral justify-between px-6'>
				<Link to='/' className='btn normal-case text-xl'>
					<FaPlaneDeparture className='mr-2 inline' />
					<div className='font-bold'>MagentaPlanner</div>
				</Link>

				<ul tabIndex={0} className=''>
					<li>
						<Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
							Home
						</Link>
					</li>
					<li>
						<Link to='/about' className='btn btn-ghost btn-sm rounded-btn'>
							About
						</Link>
					</li>
				</ul>
			</div>
		</>
	)
}

export default Navbar
