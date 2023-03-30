import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { userAtom } from '../../lib/atoms/user.atom';
import Logo from './Logo';

const UserHeader = () => {
  const [user, setUser] = useAtom(userAtom);

  console.log(user);
  return (
    <>
      <div className="col-span-1 flex justify-center items-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="col-span-1  flex justify-center items-center"></div>
      <div className="col-span-1 flex justify-center items-center">
        {/* <img
                  className="rounded-full"
                  src={`${user?.profilePicture || '/static/placeholder.jpeg'}`}
                  style={{ objectFit: 'contain' }}
                  width={200}
                  height={200}
                /> */}
      
          <Image
            src={`${user?.profilePicture || '/static/placeholder.jpeg'}`}
            className="object-contain rounded-full"
            alt=""
            width={100}
            height={100}
            
          />
      </div>
    </>
  );
};

export default UserHeader;
