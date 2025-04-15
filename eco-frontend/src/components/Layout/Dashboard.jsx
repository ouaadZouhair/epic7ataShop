import { NavDashboard } from '../imports';
import { Outlet } from 'react-router-dom';


const Dashboard = () => {

  return (
    <div className='flex flex-row justify-center items-center px-4 h-screen bg-blue-50'>
        <NavDashboard />
      <main className='w-full flex flex-col justify-center items-center  h-[650px] m-5 p-5'>
        <Outlet/>
      </main>
    </div>
  )
}

export default Dashboard