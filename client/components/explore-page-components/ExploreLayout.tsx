import React from 'react';
import { useAuctions } from '../../lib/hooks/auction.hooks';
import { useCategories } from '../../lib/hooks/categories.hooks';
import AuctionsList from './AuctionsList';
import ExplorePageBanner from './ExplorePageBanner';

const ExploreLayout = () => {
  const { data: auctionsData, isLoading: auctionsLoading, refetch: auctionsRefetch } = useAuctions({ page: 1, limit: 5 });
  const {data: categoriesData, isLoading: categoriesLoading, refetch:categoriesLoadingRefetch} = useCategories()

  return (
    <div className="grid grid-cols-8 mt-5">
      <div className="col-span-4 col-start-2 col-end-8 ">
        <ExplorePageBanner />
        {auctionsData?.auctions && auctionsData?.auctions?.length > 0 ? (
          <AuctionsList auctions={auctionsData?.auctions} auctionsTotalCount={auctionsData?.count} auctionsLimit={auctionsData?.limit} categories={categoriesData} />
        ) : (
          <p className="text-center">No data to dispaly</p>
        )}
      </div>
    </div>
  );
};

export default ExploreLayout;
