import propTypes from 'prop-types'
import { useNavigate, Link } from 'react-router-dom'

function ProgressSteps({ activePage }) {
	const navigate = useNavigate()
	return (
		<>
			<div className='hidden lg:flex justify-center text-xs my-2'>
				<div>
					<ul className='steps'>
						<li
							className={
								activePage > 0
									? 'step step-primary cursor-pointer'
									: 'grid step cursor-pointer'
							}
							onClick={() => navigate('/basicdata')}>
							Basic data
						</li>

						<li
							className={
								activePage > 1
									? 'step step-primary cursor-pointer'
									: 'grid step cursor-pointer'
							}
							onClick={() => navigate('/route')}>
							Route
						</li>

						<li
							className={
								activePage > 2
									? 'step step-primary cursor-pointer'
									: 'grid step cursor-pointer'
							}
							onClick={() => navigate('/weather')}>
							Weather
						</li>

						<li
							className={
								activePage > 3
									? 'step step-primary cursor-pointer'
									: 'grid step cursor-pointer'
							}
							onClick={() => navigate('/ofp')}>
							Operational Flight Plan
						</li>

						<li
							className={
								activePage > 4
									? 'step step-primary cursor-pointer'
									: 'grid step cursor-pointer'
							}
							onClick={() => navigate('/wnb')}>
							Weight and Balance
						</li>

						<li
							className={
								activePage > 5
									? 'step step-primary cursor-pointer'
									: 'grid step cursor-pointer'
							}
							onClick={() => navigate('/review')}>
							Review
						</li>

						<li
							className={
								activePage > 6
									? 'step step-primary cursor-pointer'
									: 'grid step cursor-pointer'
							}
							onClick={() => navigate('/submit')}>
							Submit
						</li>
					</ul>
				</div>
			</div>

			{/* <div className='lg:hidden flex justify-center btn-group my-2'>
				<button className='btn bg-base-200'>«</button>
				<button
					className={activePage === 1 ? 'btn btn-md btn-active' : 'btn btn-md'}>
					<Link to='/basicdata'>1</Link>
				</button>

				<button
					className={activePage === 2 ? 'btn btn-md btn-active' : 'btn btn-md'}>
					<Link to='/route'>2</Link>
				</button>

				<button
					className={activePage === 3 ? 'btn btn-md btn-active' : 'btn btn-md'}>
					<Link to='/weather'>3</Link>
				</button>

				<button
					className={activePage === 4 ? 'btn btn-md btn-active' : 'btn btn-md'}>
					<Link to='/ofp'>4</Link>
				</button>

				<button
					className={activePage === 5 ? 'btn btn-md btn-active' : 'btn btn-md'}>
					<Link to='/wnb'>5</Link>
				</button>

				<button
					className={activePage === 6 ? 'btn btn-md btn-active' : 'btn btn-md'}>
					<Link to='/basicdata'>6</Link>
				</button>

				<button
					className={activePage === 7 ? 'btn btn-md btn-active' : 'btn btn-md'}>
					<Link to='/basicdata'>7</Link>
				</button>
				<button className='btn bg-base-200'>»</button>
			</div> */}
		</>
	)
}

ProgressSteps.defaultProps = {
	activePage: 0,
}

ProgressSteps.propTypes = {
	activePage: propTypes.number,
}

export default ProgressSteps
