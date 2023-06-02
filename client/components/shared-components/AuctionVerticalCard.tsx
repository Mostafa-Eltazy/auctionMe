import React, { useState } from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';
import { AiOutlineUnlock } from 'react-icons/ai';
import { Auction } from '../../lib/interfaces/auction.interface';
import Badge from './Badge';
import { IoIosArrowForward } from 'react-icons/io';
import AccordioneStyleContent from './AccordioneStyleContent';
import Link from 'next/link';
import TimerDisplay from './TimerDisplay';
import { SlLayers } from 'react-icons/sl';
import { useAuctionItems } from '../../lib/hooks/item.hooks';
import ItemVerticalCard from './ItemVerticalCard';
import ItemsCaurosel from './ItemsCaurosel';
import { Category } from '../../lib/interfaces/category.interface';
import { determineCategory } from '../../util/utilities';
import { useSlidingPanel } from '../shared-components/sliding-panel-components/SlidingPanel';
import { useAuctionBids } from '../../lib/hooks/bids.hooks';
import BidsTable from './table-component/BidsTable';
import GenericPlacholder from '../loading-placeholders/GenericPlacholder';

interface Props {
  auction: Auction;
  categories?: Category[];
}

const actionButtonStyle =
  'disabled:border-gray-300 disabled:text-gray-500 bg-gray-50 text-slate-600  border border-white-400 py-1.5 px-2 my-1 rounded hover:text-white hover:bg-blue-600';
const linkButtonStyle =
  'disabled:border-gray-300 disabled:text-gray-500 bg-transperant text-slate-600   py-1.5 px-2 my-1 rounded hover:text-sky-600 hover:underline';

const AuctionVerticalCard = ({ auction, categories }: Props) => {

  const [toggle, setToggle] = useState<boolean>(false);
  const [openPanel, setOpenPanel] = useState<boolean>(false);

  const { data: itemsData, isLoading: itemsLoading, refetch: itemsRefetch } = useAuctionItems(auction.id, toggle);
  const { data: bidsData, isLoading: bidsDataLoading, refetch: bidsDataRefetch } = useAuctionBids(auction.id, openPanel);
  const { handleSlidePanel } = useSlidingPanel(setOpenPanel, bidsDataLoading, <GenericPlacholder numberOfRows={10}/>, <BidsTable data={bidsData?.bids} isLoading={bidsDataLoading}/>);

  const handleToggleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setToggle(!toggle);
    const icon = event.currentTarget.querySelector('.rotate-icon');
    if (icon) {
      icon.classList.toggle('rotate');
    }
  };

  return (
    <div className="border p-3 my-5 rounded">
      <h3 className="mb-2 text-2xl font-serif text-slate-600 text-center md:text-left px-2">{auction.title} </h3>
      <div className="flex flex-col-reverse items-center md:grid grid-cols-3">
        <div className="col-1 p-2 md:flex flex-col items-start">
          <p>
            Starting at: <b>{auction.startingBid}</b>{' '}
          </p>
          <p>No. of bids : {auction._count?.bids}</p>
        </div>
        <div className="col-start-3 p-2 w-full flex md:flex-col flex-wrap justify-around items-center md:items-end">
          <Badge text="status" classes="mb-2" />
          <div className="flex mb-2">
            <p className="text-center text-sm">{auction.type}</p>
            <AiOutlineUnlock style={{ fontSize: '18px' }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center md:items-end justify-between mt-2 mb-2">
        <div className="flex flex-col">
          <button className={`flex items-center ${actionButtonStyle}`}>
            <BsBookmarkPlus className="text-xl mr-1" />

            <p className="text-center text-sm">Add to Watchlist</p>
          </button>

          <button className={`flex items-center ${actionButtonStyle}`} onClick={handleToggleClick}>
            <IoIosArrowForward className="rotate-icon mr-1" />
            <p className="text-center text-sm">View Items</p>
          </button>
        </div>

        <button type="button" className={`flex items-center ${linkButtonStyle}`} onClick={e => handleSlidePanel(e)}>
          <SlLayers className="mr-1" />
          <p className="text-center text-sm"> Bidding details</p>
        </button>
      </div>
      <AccordioneStyleContent trigger={toggle} classes="border bg-slate-100 rounded">
        <ItemsCaurosel>
          {itemsLoading ? (
            <span>loading..</span>
          ) : (
            itemsData?.map(item => {
              return <ItemVerticalCard key={item.id} item={item} classes="current-child" category={determineCategory(item.categoryId, categories ?? null)} />;
            })
          )}
        </ItemsCaurosel>
      </AccordioneStyleContent>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between mt-4">
        <div>
          <p>
            Auctioned by
            <Link className="hover:border-b text-blue-800 border-b-blue-800 ml-1" href={`/user/${auction?.auctioneer?.username}`}>
              {auction?.auctioneer?.username}
            </Link>
          </p>
        </div>
        <div>
          <TimerDisplay endDate={auction.endDate} />
        </div>
      </div>
    </div>
  );
};

export default AuctionVerticalCard;
