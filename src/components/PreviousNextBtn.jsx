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
			<div class='btn-group grid grid-cols-2'>
				<button onClick={onPrev} class='btn btn-outline'>
					Previous page
				</button>
				<button onClick={onNext} class='btn btn-outline'>
					Next
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
