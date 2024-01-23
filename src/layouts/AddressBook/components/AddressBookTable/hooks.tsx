import { useState, useMemo, useContext, useEffect, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  PaginationState,
} from '@tanstack/react-table';
import { AccountContext } from '~/context/AccountContext';
import { EActivityTableTabs, IHistoricalItem, ITokenItem, IAddressBookItem, AddressBookTableTabs } from './constants';
import { columns } from './config';
import { parseExtrinsicHistory, parseTokenActivity } from './helpers';
import { transferEventsQuery } from '~/helpers/graphqlQueries';
import { notifyError } from '~/helpers/notifications';
import { ITransferQueryResponse } from '~/constants/queries/types';
import { PolymeshContext } from '~/context/PolymeshContext';
import { AddressBookContext } from '~/context/AddressBookContext';


export const useAddressBookTable = () => {
  // const {
  //   api: { gqlClient },
  // } = useContext(PolymeshContext);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(-1);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState<IAddressBookItem[]>([]);
  const { identity, identityLoading } = useContext(AccountContext);

  const [tableLoading, setTableLoading] = useState(false);
  const identityRef = useRef<string | undefined>('');

  const { didEntities } = useContext(AddressBookContext);
  console.log('didEntities', didEntities);
  // Reset page index when identity changes
  useEffect(() => {
    if (identity?.did !== identityRef.current) {
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }
  }, [identity]);

  useEffect(() => {
    if (!identity  /* || !gqlClient */) {
      setTableData([]);
      identityRef.current = undefined;
      return;
    }

    setTableLoading(true);

    (async () => {
      try {
        // const { data } = await gqlClient.query<IDistributionsQueryResponse>({
        //   query: historicalDistributionsQuery({
        //     did: identity.did,
        //     offset: pageIndex * pageSize,
        //     pageSize,
        //   }),
        // });
        // const parsedData = parseHistoricalDistributions(
        //   data.distributionPayments.nodes,
        // );

        // const parsedData = [
        //   {name: 'leon', address: '5DPyj8QYwYv6cxZEvVk9XXuvNMBoSkH4o2xMSg97FjAtxFy6', did: '0x3c47d8ebf615e0c1bf915fc11c40e1995bfdf66b3e3b027d9b3c83cb38dc9f44'},
        //   {name: 'FOB', address: '5GGt93unRxqBNNbpc8LkV2ZZv9oFWBfQFhfyyRa5A4NAbwym', did: '0x0eeedd3242dcbfaa6d5c76f84527fde116355b3f3b46185c423f2de26eb6871a'}
        // ]

        setTableData(didEntities);
        setTotalItems(1);
        setTotalPages(
          1,
        );
      } catch (error) {
        notifyError((error as Error).message);
      } finally {
        identityRef.current = identity.did;
        setTableLoading(false);
      }
    })();
  }, [identity, pageIndex, pageSize]);

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
      state: { pagination },
      manualPagination: true,
      pageCount: totalPages,
      onPaginationChange: setPagination,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      enableSorting: false,
    }),
    paginationState: pagination,
    tableLoading:
      identityLoading || tableLoading || identity?.did !== identityRef.current,
    totalItems,
  };
};
