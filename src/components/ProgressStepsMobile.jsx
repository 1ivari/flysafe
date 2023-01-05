import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function ProgressStepsMobile({ activePage, nextPage, previousPage }) {
	const navigate = useNavigate()
	return (
		<>
			<div
				id='ProgressStepsMobile'
				className='lg:hidden bg-neutral fixed bottom-0 z-20 flex w-full justify-between mt-2'>
				<button className='btn grow ' onClick={() => navigate(previousPage)}>
					«
				</button>
				<button
					className={activePage === 1 ? 'btn btn-primary grow' : 'btn  grow'}
					onClick={() => navigate('/basicdata')}>
					1
				</button>

				<button
					className={activePage === 2 ? 'btn  btn-primary grow' : 'btn  grow'}
					onClick={() => navigate('/route')}>
					2
				</button>

				<button
					className={activePage === 3 ? 'btn  btn-primary grow' : 'btn  grow'}
					onClick={() => navigate('/weather')}>
					3
				</button>

				<button
					className={activePage === 4 ? 'btn  btn-primary grow' : 'btn  grow'}
					onClick={() => navigate('/ofp')}>
					4
				</button>

				<button
					className={activePage === 5 ? 'btn  btn-primary grow' : 'btn  grow'}
					onClick={() => navigate('/wnb')}>
					5
				</button>

				<button
					className={activePage === 6 ? 'btn  btn-primary grow' : 'btn  grow'}
					onClick={() => navigate('/basicdata')}>
					6
				</button>

				<button
					className={activePage === 7 ? 'btn  btn-primary grow' : 'btn  grow'}
					onClick={() => navigate('/basicdata')}>
					7
				</button>
				<button className='btn grow' onClick={() => navigate(nextPage)}>
					»
				</button>
			</div>
		</>
	)
}

ProgressStepsMobile.defaultProps = {
	activePage: 0,
}

ProgressStepsMobile.propTypes = {
	activePage: propTypes.number,
	nextPage: propTypes.string,
	previousPage: propTypes.string,
}

export default ProgressStepsMobile
