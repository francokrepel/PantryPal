import { Link } from 'react-router-dom'
import { useState, useEffect} from 'react';

export default function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // register an event listener on the window object for the "scroll" event
    window.addEventListener('scroll', handleScroll);
    return () => {
      // cleanup function removes event listener when it is no longer needed
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 flex justify-between items-center h-24 max-w mx-auto px-4 text-[#1A4D2E] transition-colors duration-700 ${isScrolled ? ' text-[#EBE9E1] bg-[#1A4D2E]' : ''}`}>
      <Link className='w-full text-4xl' to='/'>Pantry<b>Pal</b></Link>
      <ul className='flex'>
        <Link className='p-4 font-bold' to='/login'>Login</Link>   
        <Link className='p-4 font-bold' to='/recipes'>Recipes</Link>
        <Link className='p-4 font-bold' to='/dashboard'>Dashboard</Link>
      </ul>
    </nav>
  );
}




{/*  */}
      {/* <div onClick={handleNav}> */}
        {/* {!nav ?<AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>} */}
      {/* </div> */}
{/*  */}
      {/* <div className={!nav ? 'ease-in-out duration-1000 fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#4F6F52]' : 'fixed left-[-100%]'}> */}
      {/* <h1 className='w-full text-3xl font-bold text-[#0f2b19] m-4 ' >PantryPal</h1> */}
        {/* <ul className='p-4 text-[#0f2b19]'> */}
          {/* <li className='p-4 border-b border-gray-600' to='/'>Home</li> */}
          {/* <li className='p-4 border-b border-gray-600' to='/register'>Register</li> */}
          {/* <li className='p-4 border-b border-gray-600' to='/login'>Login</li> */}
          {/* <li className='p-4 border-b border-gray-600' to='/dashboard'>Dashboard</li> */}
        {/* </ul>  */}
      {/* </div> */}