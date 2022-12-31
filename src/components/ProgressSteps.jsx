import propTypes from 'prop-types'
// import WeightAndBalancePage from './pages/WeightAndBalancePage'

function ProgressSteps({ activePage }) {
	return (
		<div className='container flex text-xs'>
			{/* <div className='flex mx-auto max-w-3xl p-3 justify-center'> */}
			<div>
				<ul className='steps'>
					<li
						className={
							activePage > 0 ? 'step step-primary' : 'hidden md:grid md:step'
						}>
						Basic data
					</li>
					<li
						className={
							activePage > 1 ? 'step step-primary' : 'hidden md:grid md:step'
						}>
						Route
					</li>
					<li
						className={
							activePage > 2 ? 'step step-primary' : 'hidden md:grid md:step'
						}>
						Weather
					</li>
					<li
						className={
							activePage > 3 ? 'step step-primary' : 'hidden md:grid md:step'
						}>
						Operational Flight Plan
					</li>
					<li
						className={
							activePage > 4 ? 'step step-primary' : 'hidden md:grid md:step'
						}>
						Weight and Balance
					</li>

					<li
						className={
							activePage > 5 ? 'step step-primary' : 'hidden md:grid md:step'
						}>
						Review
					</li>
					<li
						className={
							activePage > 6 ? 'step step-primary' : 'hidden md:grid md:step'
						}>
						Submit
					</li>
				</ul>
				{/* </div> */}
			</div>
		</div>

		// HYVÄ YRITYS SIEVENTÄÄ
		// <div>
		// 	<ul>
		// 		{pages.map((page, idx) => {
		// 			console.log(page)
		// 			return (
		// 				// <div className=''>{page}</div>
		// 				<li
		// 					className={activePage > idx ? 'step step-primary' : 'step'}
		// 					key={idx}>
		// 					{page}
		// 				</li>
		// 			)
		// 		})}
		// 	</ul>
		// </div>
	)
}

ProgressSteps.defaultProps = {
	activePage: 0,
}

ProgressSteps.propTypes = {
	activePage: propTypes.number,
}

export default ProgressSteps
