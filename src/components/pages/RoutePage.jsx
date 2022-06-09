import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'
import AirfieldSearch from '../AirfieldSearch'

function RoutePage() {
	return (
		<>
			<ProgressSteps activePage={2} />
			<PreviousNextBtn previousPage='/basicdata' nextPage='/Weather' />

			<div className='flex flex-col justify-center py-12 px-6 lg:px-8'>
				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10'>
						<div className='mb-0 space-y-6'>
							<AirfieldSearch />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default RoutePage
