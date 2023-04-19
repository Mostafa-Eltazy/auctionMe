import Link from 'next/link';
import React from 'react';

const ExplorePageBanner = () => {
  return (
    <div className="flex flex-col justify-center">
      {' '}
      <h1 className="text-center font-serif text-3xl text-slate-600 mt-8">This is were all the Au/A ction is</h1>
      <h2 className="text-center tesxt-md text-slate-500 mt-4 px-2">
        Not sure how it works ?
        <span className="text-blue-800 ml-1">
          <Link className="hover:border-b border-b-blue-800" href="/learn-more">
            Learn more
          </Link>
        </span>{' '}
      </h2>
    </div>
  );
};

export default ExplorePageBanner;
