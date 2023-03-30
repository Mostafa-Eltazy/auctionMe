import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { userAtom } from '../../lib/atoms/user.atom';
import Logo from './Logo';

interface Props {
  routes: { [key: string]: string }[];
  active: string;
}
const activeRouteStyle = 'text-slate-800 border-b-sky-600 border-b-2 '
const idleRouteStyle = 'text-slate-600'
const UserHeader = ({ routes, active }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  console.log(active)
  return (
    <>
      <div className="col-span-2 flex justify-center items-center">
        <Link href="/">
          <Logo logoSize="35px" />
        </Link>
      </div>
      <div className="col-span-4  flex justify-between items-center">
        {routes.map(route => (
          <li className={`list-none text-sm font-serif py-4 px-2 ${active === route.slug ? activeRouteStyle : idleRouteStyle}`} key={route.slug}>
            <Link  className="hover:text-slate-400 " href={`/${route.slug}`}>
              <span>{route.name}</span>
            </Link>
          </li>
        ))}
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <Image
          src={`${user?.profilePicture || '/static/placeholder.jpeg'}`}
          className="rounded-full header-profile-picture"
          alt={`${user?.username ? `${user?.username} profile picture` : 'profile picture'}`}
          width={100}
          height={100}
        />
      </div>
    </>
  );
};

export default UserHeader;
