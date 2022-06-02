import propTypes from 'prop-types'

function ProgressSteps({ activePage }) {
	return (
		<div>
			<ul className='steps'>
				<li className={activePage > 0 ? 'step step-primary' : 'step'}>
					Basic data
				</li>
				<li className={activePage > 1 ? 'step step-primary' : 'step'}>
					Weather
				</li>
				<li className={activePage > 2 ? 'step step-primary' : 'step'}>
					Operational Flight Plan
				</li>
				<li className={activePage > 3 ? 'step step-primary' : 'step'}>
					Weight and Balance
				</li>

				<li className={activePage > 4 ? 'step step-primary' : 'step'}>
					Review
				</li>
				<li className={activePage > 5 ? 'step step-primary' : 'step'}>
					Submit
				</li>
			</ul>
		</div>
	)
}

ProgressSteps.defaultProps = {
	activePage: 0,
}

ProgressSteps.propTypes = {
	activePage: propTypes.number,
}

export default ProgressSteps
