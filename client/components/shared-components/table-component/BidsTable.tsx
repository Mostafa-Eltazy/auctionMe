import { useAtom } from 'jotai';
import React, { useState, useEffect } from 'react';
import { userAtom } from '../../../lib/atoms/user.atom';
import { Bid } from '../../../lib/interfaces/bid.interface';
import Badge from '../Badge';
import Table from './Table';

interface Props {
  data: Bid[] | undefined;
  isLoading: boolean;
}
const linkButtonStyle =
  'disabled:border-gray-300 disabled:text-gray-500 bg-transperant text-slate-600 py-1.5 px-2 my-1 rounded hover:text-sky-600 hover:underline';

const BiddingTable = ({ data, isLoading }: Props) => {
  const PAGE_SIZE = 10;
  const [user, setUser] = useAtom(userAtom);

  const tableStyles = {
    headCells: {
      style: {
        display: 'flex',
        fontSize: '1rem',
        padding: '0 5px',
        color: '#607D8B',
        textAlign: 'center',
      },
    },
    cells: {
      style: {
        padding: '5px',
        textAlign: 'center',
      },
    },
    rows: {
      style: {
        maring: '5px',
        back: 'red',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  };

  const columns = [
    {
      name: 'Value',
      selector: (row: { value: number }) => row.value,
      sortable: true,
      center: true,
    },
    {
      name: 'Bider',
      selector: (row: { bider: { username: string } }) => (
        <>
        <a href={`${row.bider.username === user?.username ? '/me' : `/user/${row.bider.username}`}`} className={linkButtonStyle}>
          {row.bider.username}
        </a>
        {row.bider.username === user?.username && <Badge text="you" />}
        </>
      ),
      center: true,
    },
    {
      name: 'Created At',
      selector: (row: { createdAt: string }) => row.createdAt,
      sortable: true,
      center: true,
    },
  ];

  return (
    <div className="h-full overflow-y-auto pb-10">
      {isLoading ? (
        <span>Loading ...</span>
      ) : data ? (
        <Table data={data} columns={columns} paginationPerPage={PAGE_SIZE} customStyles={tableStyles} defaultSortField="Value" defaultSortAsc />
      ) : null}
    </div>
  );
};

export default BiddingTable;
