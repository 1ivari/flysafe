import { useNavigate, Link } from 'react-router-dom'
import Drawer from '../../components/Drawer'

function DrawerContent() {
  return (
    <>
      <li className='mt-2'>
        <Link to='/about'> 🤔 About </Link>
      </li>
    </>
  )
}

function HomePage() {
  const navigate = useNavigate()
  return (
    <>
      <Drawer drawerContent={<DrawerContent />}>
        <div className='relative pt-32 mx-auto max-w-7xl px-6 '>
          <h1 className='text-white font-extrabold text-4xl lg:text-6xl tracking-tight text-center'>
            Navigating the skies with ease.
          </h1>
          <p className='mt-6 text-lg text-slate-400 text-center max-w-3xl mx-auto'>
            Fly with confidence using Magenta. Generate efficient routes with
            up-to-date weather conditions using our powerful and easy-to-use
            interface. Magenta streamlines the flight planning process for
            private pilots and helps you to aviate the skies.
          </p>
          <div className='mt-6 flex justify-center space-x-6 text-sm'>
            <button
              className='btn btn-primary'
              onClick={() => navigate('/basicdata')}
            >
              Get started
            </button>
          </div>

          <div className='mt-32 text-center max-w-3xl mx-auto text-white'>
            <h1 className='font-bold text-white'>Terms and Conditions</h1>
            <p className='mt-4 text-lg text-slate-400 '>
              By using this website/application, you agree to our terms and
              conditions.
              <strong> Use website/application at your own risk.</strong>{' '}
              Website/application provides
              <strong> no warranty</strong> of any kind. By using the provided
              data and suggestions, you agree that website/application creator,
              maintainers, and anyone involved with the website/application hold{' '}
              <strong> no liability</strong> for anything that happens when you
              use the data and suggestions.
            </p>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default HomePage
