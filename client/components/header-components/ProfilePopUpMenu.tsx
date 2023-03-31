import { useAtom } from 'jotai';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import { userAtom } from '../../lib/atoms/user.atom';
import { clearAuthToken, getAuthToken } from '../../util/token-storage';
import { SlSettings } from 'react-icons/sl';
import { CiLogout, CiUser } from 'react-icons/ci';

const menuElemStyle = 'text-left text-sm font-serif py-2 px-3 border-b hover:text-black hover:bg-sky-100 block';
const ProfilePopUpMenu = () => {
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    clearAuthToken();
    if (!getAuthToken()) {
      router.reload();
    }
  };

  return (
    <div className="flex flex-col pt-1 bg-slate-100" style={{ width: '110px' }}>
      <p className='whitespace-pre-line break-words px-3 text-sm border-b py-2'>welcome, <span className='block'>{user?.username}</span></p>
      <Link href="/me">
        <div className={`${menuElemStyle} flex items-center`}><CiUser/> <span className='ml-1'>Profile</span></div>
      </Link>
      <Link href="/settings">
        <div className={`${menuElemStyle} flex items-center`}>
          <SlSettings /> <span className="ml-1">Settings</span>
        </div>
      </Link>
      <button onClick={handleLogout}>
        <div className={`${menuElemStyle} flex items-center `}>
          <CiLogout />
          <span className='ml-1' >Log out</span>
        </div>
      </button>
    </div>
  );
};

export default ProfilePopUpMenu;
