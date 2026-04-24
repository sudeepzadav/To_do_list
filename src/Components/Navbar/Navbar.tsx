import { RiPlayListAddLine } from 'react-icons/ri'
import Darkmode from './Darkmode'

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between border-0 bg-[#0F828C] dark:bg-[#210F37] dark:text-white px-5">
        <div className='flex text-2xl dark:text-white py-3 font-semibold underline items-center gap-5'>
          <RiPlayListAddLine />
          <h1>To Do List</h1>
        </div>
        <div className='flex items-center '><Darkmode /></div>
      </div>
    </>
  )
}

export default Navbar