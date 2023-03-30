import Link from 'next/link';
import { GiGreekTemple } from 'react-icons/Gi';
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useAtom } from 'jotai';
import { userAtom, userLoadingAtom } from '../../lib/atoms/user.atom';
import GenericHeader from './GenericHeader';
import UserHeader from './UserHeader';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useAtom(userAtom);

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
      {user ? <UserHeader /> : <GenericHeader />}
    </header>
  );
};

export default Header;
