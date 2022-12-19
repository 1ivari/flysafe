import { useNavigate } from 'react-router-dom'

function Home() {
	const nav = useNavigate()

	const onClick = () => {
		nav('/basicdata')
	}

	return (
		<>
			<div className='relative pt-32 mx-auto max-w-7xl '>
				<h1 className='text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white'>
					Rapidly plan your flights on a single platform.
				</h1>
				<p className='mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
					corporis voluptas debitis maiores eius animi dolorem incidunt
					similique veritatis minus.
				</p>
				<div className='mt-6 sm:mt-10 flex justify-center space-x-6 text-sm'>
					<a
						className='bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400'
						onClick={onClick}>
						Get started
					</a>
				</div>
			</div>
			{/* <div className='card w-96 bg-base-100 shadow-xl'>
        <figure>
          <img
            src='https://images.unsplash.com/photo-1596017878992-6ad23f285a0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
            alt='Shoes'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>Make a Flight Plan</h2>
          <p>Click below to start plannning</p>
          <div className='card-actions justify-end'>
            <button onClick={onClick} className='btn btn-primary'>
              Plan
            </button>
          </div>
        </div>
      </div> */}

			{/* <div className='flex bg-blue-200 justify-between	'>
        <div className='bg-red-600 m-20 p-5'>moi1</div>
        <div className='bg-red-600 m-20 p-5'>moi2</div>
        <div className='bg-red-600 m-20 p-5'>moi3</div>
      </div> */}
		</>
	)
}

export default Home
