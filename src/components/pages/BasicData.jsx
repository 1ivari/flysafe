import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'
import AircraftSelector from '../AircraftSelector'

function BasicData() {
	return (
		<>
			<ProgressSteps activePage={1} />

			<div className='flex flex-col justify-center py-12 px-6 lg:px-8'>
				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='bg-white py-8 px-6 shadow rounded-lg sm:px-10'>
						<form className='mb-0 space-y-6' action='#' method='POST'>
							<div>
								<label
									for='date'
									className='block text-sm font-medium text-gray-700'>
									Date
								</label>
								<div className='mt-1'>
									<input
										id='date'
										name='date'
										type='date'
										autocomplete=''
										required
										className=''
									/>
								</div>
							</div>

							<div>
								<label
									for='date'
									className='block text-sm font-medium text-gray-700'>
									Persons on Board
								</label>
								<div className='mt-1'>
									<input
										id='pob'
										name='pob'
										type='number'
										autocomplete=''
										required
										className=''
									/>
								</div>
							</div>

							<div>
								<label
									for='aircraft'
									className='block text-sm font-medium text-gray-700'>
									Aircraft
								</label>
								<AircraftSelector />
							</div>

							<div>
								<label
									for='crew'
									className='block text-sm font-medium text-gray-700'>
									Crew
								</label>
								<div className='mt-1'>
									<input
										id='crew'
										name='crew'
										type='text'
										autocomplete=''
										required
										className=''
									/>
								</div>
							</div>

							<div>
								<label
									for='rules'
									className='block text-sm font-medium text-gray-700'>
									Rules
								</label>
								<div className='mt-1'>
									<select name='rules' id='rules' className=''>
										<option value='vfr'>VFR</option>
										<option value='ifr'>IFR</option>
									</select>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<PreviousNextBtn previousPage='/' nextPage='/weather' />
		</>
	)
}

export default BasicData
