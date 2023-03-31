import React from 'react';
import ParalledCard from '../shared-components/ParalledCard';

const UsSection = () => {
  return (
    <div className="py-8">
      <ParalledCard
        leftComp={
          <>
            <h1 className="text-center font-serif text-3xl text-slate-600 mt-8 mb-6">Our Story</h1>
            <p className="py- md:mx-8 font-serif text-md text-center">
              We invite you to join our online auction site and simplify your life by decluttering your home. Our motto,{' '}
              <i>auction the clutter away from your life</i> reflects our dedication to helping you get rid of the things you no longer need or want. We offer a
              variety of unique and high-quality items sourced from individuals and businesses, and our user-friendly platform makes bidding easy. By selling
              off unwanted items, you can create more space for the things that truly matter. Join our community today and bid on the items you need to
              declutter your life.
            </p>
          </>
        }
      />

      <ParalledCard
        rightComp={
          <>
            <h1 className="text-center font-serif text-3xl text-slate-600 mt-8 mb-6">Our Mission</h1>
            <p className="py- md:mx-8 font-serif text-md text-center">
              Our mission is to provide a platform that helps simplify your life by offering a wide range of items to declutter your home. We believe that by
              selling off unwanted items, you can create more space for the things that truly matter. Our user-friendly platform makes it easy to bid on unique
              and high-quality items sourced from individuals and businesses. Join our community today to start decluttering your life and bidding on the items
              you need.
            </p>
          </>
        }
      />
    </div>
  );
};

export default UsSection;
