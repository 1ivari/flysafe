import { Navigate, useNavigate } from 'react-router-dom'

function Home() {
  const nav = useNavigate()

  const onClick = () => {
    nav('/wnb')
  }

  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
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
    </div>
  )
}

export default Home
