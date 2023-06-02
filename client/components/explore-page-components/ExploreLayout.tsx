import React from 'react';
import { useAuctions } from '../../lib/hooks/auction.hooks';
import { useCategories } from '../../lib/hooks/categories.hooks';
import PagePagination from '../shared-components/pagination-component/PagePagination';
import AuctionVerticalCardPlaceholde from '../loading-placeholders/AuctionVerticalCardPlaceholde';
import AuctionsList from './AuctionsList';
import ExplorePageBanner from './ExplorePageBanner';
import { renderPlaceholders } from '../../util/utilities';
import PagePaginationPlaceholde from '../loading-placeholders/PagePaginationPlaceholder';

const ExploreLayout = () => {
  const [page, setPage] = React.useState(1);
  const { data: auctionsData, isLoading: auctionsLoading, refetch: auctionsRefetch } = useAuctions({ page, limit: 10 });
  const { data: categoriesData, isLoading: categoriesLoading, refetch: categoriesLoadingRefetch } = useCategories();

  const moveForward = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page + 1);
  };

  const moveBackward = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page - 1);
  };

  const selectPage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page);
  };
  return (
    <div className="grid grid-cols-8 mt-5">
      <div className="col-span-4 col-start-2 col-end-8 ">
        <ExplorePageBanner />
        {auctionsLoading || categoriesLoading ? (
          renderPlaceholders(10, <AuctionVerticalCardPlaceholde />)
        ) : auctionsData?.auctions && auctionsData?.auctions?.length > 0 ? (
          <AuctionsList
            auctions={auctionsData?.auctions}
            auctionsTotalCount={auctionsData?.count}
            auctionsLimit={auctionsData?.limit}
            categories={categoriesData}
          />
        ) : (
          <p className="text-center">No data to dispaly</p>
        )}
        {auctionsLoading || categoriesLoading ? (
          <PagePaginationPlaceholde />
        ) : auctionsData?.auctions && auctionsData?.auctions?.length > 0 ? (
          <PagePagination
            currentPage={page}
            totalPages={auctionsData.count / auctionsData.limit}
            moveForward={moveForward}
            moveBackward={moveBackward}
            selectPage={selectPage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ExploreLayout;
