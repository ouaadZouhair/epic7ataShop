import { useNavigate } from 'react-router-dom'
import { GoShopNav } from '../../components/imports'

const NotAllowed = () => {

  const navigate = useNavigate()
  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <>
    <GoShopNav />
    <div className='h-auto flex flex-col items-center justify-start'>
      <h1 className='text-gray-900 text-center text-2xl font-bold'>You are not allowed to access this page</h1>
      <p className='text-center text-gray-400 text-lg'>Please contact the administrator for more information.</p>
      <div className='flex items-center justify-center mt-5'>
        <h1 className='text-red-500 text-9xl font-bold'>403</h1>
      </div>
      <div className='flex items-center justify-center mt-5'>
        <button onClick={handleGoHome} className='bg-blue-500 text-white px-4 py-2 rounded-full font-semibold'>Go to Home</button>
      </div>
    </div>
    
    </>
  )
}

export default NotAllowed