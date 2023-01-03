import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function PreviousNextBtn({ previousPage, nextPage }) {
	const nav = useNavigate()

	const onPrev = () => {
		nav(previousPage)
	}

	const onNext = () => {
		nav(nextPage)
	}

	return (
		<>
			<div className='flex max-w-3xl mx-auto p-3 justify-between'>
				<button onClick={onPrev} className='btn btn-outline'>
					Previous Page
				</button>
				<button onClick={onNext} className='btn btn-outline'>
					Next Page
				</button>
			</div>
		</>
	)
}

PreviousNextBtn.defaultProps = {
	previousPage: '/',
	nextPage: '/',
}

PreviousNextBtn.propTypes = {
	previousPage: propTypes.string,
	nextPage: propTypes.string,
}

export default PreviousNextBtn
