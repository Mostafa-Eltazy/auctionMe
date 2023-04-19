import React from 'react'
import { Auction } from '../../lib/interfaces/auction.interface'
import { Category } from '../../lib/interfaces/category.interface';
import AuctionVerticalCard from '../shared-components/AuctionVerticalCard';

interface Props {
    auctions?  : Auction[];
    auctionsTotalCount? : number;
    auctionsLimit?: number
    categories?: Category[]

}


const AuctionsList = ({auctions, auctionsTotalCount , auctionsLimit, categories}:Props) => {
  return (
    <div className='border shadow-xl p-4 rounded'>
        { auctions?.map((a : Auction)=>{
          return <AuctionVerticalCard key={a.id} auction={a} categories={categories} />
        })}
    </div>
  )
}

export default AuctionsList