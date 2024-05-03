import { useState, useMemo, useContext, useEffect, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  PaginationState,
} from '@tanstack/react-table';
// import { AccountContext } from '~/context/AccountContext';
import { IAddressBookItem } from './constants';
import { columns } from './config';
import { notifyError } from '~/helpers/notifications';
import { AddressBookContext } from '~/context/AddressBookContext';


export const useAddressBookTable = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(-1);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState<IAddressBookItem[]>([]);
  // const { identity, identityLoading } = useContext(AccountContext);

  const [rowSelection, setRowSelection] = useState({})
  const [tableLoading, setTableLoading] = useState(false);
  // const identityRef = useRef<string | undefined>('');

  const { didEntities } = useContext(AddressBookContext);
  const initialTableData = didEntities.map((entity) => ({ ...entity, selected: false } as IAddressBookItem));
  console.log({ initialTableData })
  console.log()
  // Reset page index when identity changes
  // useEffect(() => {
  //   if (identity?.did !== identityRef.current) {
  //     setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  //   }
  // }, [identity]);

  useEffect(() => {
    // if (!identity) {
    //   setTableData([]);
    //   identityRef.current = undefined;
    //   return;
    // }

    setTableLoading(true);

    (async () => {
      try {
        setTableData(initialTableData);
        setTotalItems(1);
        setTotalPages(
          1,
        );
      } catch (error) {
        notifyError((error as Error).message);
      } finally {
        // identityRef.current = identity.did;
        setTableLoading(false);
      }
    })();
  }, [didEntities, pageIndex, pageSize]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  return {
    table: useReactTable<IAddressBookItem>({
      data: tableData,
      columns: columns as ColumnDef<IAddressBookItem>[],
      state: { pagination, rowSelection },
      manualPagination: true,
      pageCount: totalPages,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setRowSelection,
      enableSorting: false,
      enableRowSelection: true,
      enableMultiRowSelection: false
    }),
    paginationState: pagination,
    tableLoading:
      tableLoading,
    totalItems,
  };
};
