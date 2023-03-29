import Link from 'next/link';
import { GiGreekTemple } from 'react-icons/Gi';
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY - 3.5;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`grid grid-cols-2 md:grid-cols-3 bg-slate-50 pt-6 pb-2 ${isSticky ? 'top-0 z-10 sticky shadow-lg w-full' : ''} `}>
      <div className="col-span-1 flex justify-center items-center">
      <Link href="/">
        <Logo /> 
      </Link>
      </div>
      <div className="col-span-1 hidden md:block"></div>
      <div className="col-span-1 flex justify-center items-center">
        <Link   href="auth/signup" className="mx-1 md:mx-4 py-2 px-1 md:px-4 text-sm sm:text-base bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white  border border-blue-500 hover:border-transparent rounded">
          Sign up
        </Link>
        <Link  href="auth/login" className="mx-1 md:mx-4 py-2 px-1 md:px-4 text-sm sm:text-base bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent rounded">
          Log in
        </Link>
      </div>
    </header>
  );
};

export default Header;
