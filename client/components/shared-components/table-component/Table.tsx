import React from 'react';
import DataTable from 'react-data-table-component';

const Table = (props: any) => {
  return <DataTable striped pagination selectableRowsHighlight paginationRowsPerPageOptions={[10, 25, 50, 75, 100]} {...props} />;
};

export default Table;
