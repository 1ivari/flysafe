import MetarList from '../components/MetarList'
import PreviousNextBtn from '../components/PreviousNextBtn'
import ProgressSteps from '../components/ProgressSteps'

function WeatherPage() {
	return (
		<>
			<ProgressSteps activePage={3} />
			<div className='flex flex-col mx-4'>
				{/* returns ul */}
				<MetarList />
			</div>
		</>
	)
}

export default WeatherPage
