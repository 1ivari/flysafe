import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function BasicData() {
	return (
		<>
			<ProgressSteps activePage={1} />
			<div>BasicData</div>
			<PreviousNextBtn previousPage='/' nextPage='/wnb' />
		</>
	)
}

export default BasicData
