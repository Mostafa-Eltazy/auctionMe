import React, { useRef, useEffect } from 'react';
import ParalledCard from '../shared-components/ParalledCard';
import { BsBoxSeam } from 'react-icons/bs';
import { RiAuctionLine } from 'react-icons/ri';
import { TbCurrencyDollar } from 'react-icons/tb';

const ProcessFlow = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            entry.target.classList.add('slide-in-blurred-bottom');
          } else {
            entry.target.classList.add('hide');
          }
        });
      },
      { threshold: 0.85 },
    );

    document.querySelectorAll('.process-icon').forEach(icon => {
      observer.current?.observe(icon);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-center font-serif text-5xl text-slate-600 mt-8">How it works ?</h1>
      <h2 className="text-center text-xl text-slate-500">Follow these easy steps to make money </h2>
      <ParalledCard
        styles={{ minHeight: '40vh' }}
        classes="md:px-10 my-4"
        leftComp={
          <div>
            <p className="bg-transparent text-blue-500 font-semibold py-2 px-4 lg:px-8  process-icon">
              <BsBoxSeam style={{ fontSize: '150px' }} />
            </p>
          </div>
        }
        rightComp={
          <div>
            <h3 className="text-3xl">Specify an item of your choice</h3>
            <p>
              simply select an item you no longer have any use for,
              <br /> or have not used in an long while and just have it laying there in the background and get ready to make some profit with it{' '}
            </p>
          </div>
        }
      />

      <ParalledCard
        styles={{ minHeight: '40vh' }}
        classes="md:px-10 my-4 "
        rightComp={
          <div>
            <p className="bg-transparent text-blue-500 font-semibold py-2 px-4 lg:px-8  process-icon">
              <RiAuctionLine style={{ fontSize: '150px' }} />
            </p>
          </div>
        }
        leftComp={
          <div>
            <h3 className="text-3xl">Create an Auction</h3>
            <p>
              Intiate an auction on the item you selected, specify a time window for the auction
              <br /> and wait for your clients bids to pour in
            </p>
          </div>
        }
      />

      <ParalledCard
        styles={{ minHeight: '40vh' }}
        classes="md:px-10 my-4 "
        leftComp={
          <div>
            <p className="bg-transparent text-blue-500 font-semibold py-2 px-4 lg:px-8  process-icon">
              <TbCurrencyDollar style={{ fontSize: '150px' }} />
            </p>
          </div>
        }
        rightComp={
          <div>
            <h3 className="text-3xl">Get Paid</h3>
            <p>
              Once the auction is finalized, select an offer, complete the transaction
              <br /> and get paid
            </p>
          </div>
        }
      />
    </div>
  );
};

export default ProcessFlow;
