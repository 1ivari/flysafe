import propTypes from 'prop-types'
import { useNavigate, Link } from 'react-router-dom'

function ProgressStepsMobile({ activePage, nextPage, previousPage }) {
	const navigate = useNavigate()
	return (
		<>
			<div className='lg:hidden fixed bottom-0 z-40 flex w-full justify-between btn-group mt-2'>
				<div
					className='btn btn-md bg-base-200 grow '
					onClick={() => navigate(previousPage)}>
					«
				</div>
				<div
					className={
						activePage === 1 ? 'btn btn-md btn-active grow' : 'btn btn-md grow'
					}>
					<Link to='/basicdata'>1</Link>
				</div>

				<div
					className={
						activePage === 2 ? 'btn btn-md btn-active grow' : 'btn btn-md grow'
					}>
					<Link to='/route'>2</Link>
				</div>

				<div
					className={
						activePage === 3 ? 'btn btn-md btn-active grow' : 'btn btn-md grow'
					}>
					<Link to='/weather'>3</Link>
				</div>

				<div
					className={
						activePage === 4 ? 'btn btn-md btn-active grow' : 'btn btn-md grow'
					}>
					<Link to='/ofp'>4</Link>
				</div>

				<div
					className={
						activePage === 5 ? 'btn btn-md btn-active grow' : 'btn btn-md grow'
					}>
					<Link to='/wnb'>5</Link>
				</div>

				<div
					className={
						activePage === 6 ? 'btn btn-md btn-active grow' : 'btn btn-md grow'
					}>
					<Link to='/basicdata'>6</Link>
				</div>

				<div
					className={
						activePage === 7 ? 'btn btn-md btn-active grow' : 'btn btn-md grow'
					}>
					<Link to='/basicdata'>7</Link>
				</div>
				<div
					className='btn btn-md bg-base-200 grow'
					onClick={() => navigate(nextPage)}>
					»
				</div>
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
