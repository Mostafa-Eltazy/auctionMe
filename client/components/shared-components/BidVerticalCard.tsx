import React, { useState } from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';
import { AiOutlineUnlock } from 'react-icons/ai';
import Badge from './Badge';
import { IoIosArrowForward } from 'react-icons/io';
import AccordioneStyleContent from './AccordioneStyleContent';
import Link from 'next/link';
import TimerDisplay from './TimerDisplay';
import { SlLayers } from 'react-icons/sl';
import ItemVerticalCard from './ItemVerticalCard';
import ItemsCaurosel from './ItemsCaurosel';
import { Category } from '../../lib/interfaces/category.interface';
import { determineCategory } from '../../util/utilities';
import { useSlidingPanel } from '../shared-components/sliding-panel-components/SlidingPanel';
import BidsTable from './table-component/BidsTable';
import GenericPlacholder from '../loading-placeholders/GenericPlacholder';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/atoms/user.atom';
import { Bid } from '../../lib/interfaces/bid.interface';
import { Auction } from '../../lib/interfaces/auction.interface';
import { useAuctionBids } from '../../lib/hooks/bids.hooks';
import { useModal } from './modal-components/Modal';

interface Props {
  bid: Bid & { Auction: Auction };
}

const actionButtonStyle =
  'disabled:border-gray-300 disabled:text-gray-500 bg-gray-50 text-slate-600  border border-white-400 py-1.5 px-2 my-1 rounded hover:text-white hover:bg-blue-600';
const linkButtonStyle =
  'disabled:border-gray-300 disabled:text-gray-500 bg-transperant text-slate-600   py-1.5 px-2 my-1 rounded hover:text-sky-600 hover:underline';

const BidVerticalCard = ({ bid }: Props) => {
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data: bidsData, isLoading: bidsDataLoading, refetch: bidsDataRefetch } = useAuctionBids(bid.auctionId, openPanel);
  const { handleSlidePanel } = useSlidingPanel(
    setOpenPanel,
    bidsDataLoading,
    <GenericPlacholder numberOfRows={10} />,
    <BidsTable data={bidsData?.bids} isLoading={bidsDataLoading} />,
  );
  const { handleModal } = useModal(
    setOpenModal,
    bidsDataLoading,
    <GenericPlacholder numberOfRows={10} />,
    <BidsTable data={bidsData?.bids} isLoading={bidsDataLoading} />,
  );

  return (
    <div className="border p-3 my-5 rounded">
      <div className="col-1 p-2 md:flex flex-col items-start">
        <p>
          You made a bid of <span className="text-blue-600">{bid?.value}</span> to an auction titled {bid?.Auction?.title}
        </p>
        <p>
          auctioned by{' '}
          <Link className="hover:border-b text-blue-800 border-b-blue-800 ml-1" href={`/user/${bid.Auction.auctioneer.username}`}>
            {bid.Auction.auctioneer.username}{' '}
          </Link>
          <span className="text-blue-600"></span>
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center md:items-end justify-between mt-2 mb-2">
        <div className="flex flex-col">
          <button type="button" className={`flex items-center ${linkButtonStyle}`} onClick={e => handleModal(e)}>
            <SlLayers className="mr-1" />
            <p className="text-center text-sm"> Auction details</p>
          </button>
        </div>

        <button type="button" className={`flex items-center ${linkButtonStyle}`} onClick={e => handleSlidePanel(e)}>
          <SlLayers className="mr-1" />
          <p className="text-center text-sm"> Bidding details</p>
        </button>
      </div>
    </div>
  );
};

export default BidVerticalCard;
