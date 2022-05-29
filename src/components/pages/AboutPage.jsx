import { Navigate, useNavigate } from 'react-router-dom'

// NOTE: This component has demonstrated the use of Navigate and useNavigate on purpose. The back home link could be done with a simple <Link/> instead of button, action and useNavigate.

function AboutPage() {
  const nav = useNavigate()

  const onClick = () => {
    nav('/')
  }

  return (
    <div className='flex justify-center content-center'>
      <div className='card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>About flySafe</h2>
          <p>flySafe is a flight planning Web application built on React</p>
          <p>Version 1.0.0</p>
          <div className='card-actions justify-end'>
            <button onClick={onClick} className='btn btn-primary'>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
