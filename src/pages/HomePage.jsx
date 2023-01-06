import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

function Home() {
  return (
    <>
      <div className='relative pt-32 mx-auto max-w-7xl px-6 '>
        <h1 className='text-slate-900 font-extrabold text-4xl lg:text-6xl tracking-tight text-center dark:text-white'>
          Rapidly plan your flights on a single platform.
        </h1>
        <p className='mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          corporis voluptas debitis maiores eius animi dolorem incidunt
          similique veritatis minus.
        </p>
        <div className='mt-6 flex justify-center space-x-6 text-sm'>
          <Link
            to='/basicdata'
            className='bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400'
          >
            Get started
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
