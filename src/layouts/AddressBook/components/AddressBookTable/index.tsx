import { useState } from 'react';
import { Table } from '~/components';
import { useAddressBookTable } from './hooks';

export const AddressBookTable = () => {
  const { table, tableLoading, totalItems } = useAddressBookTable();
  console.log({ table })
  return (
    <Table
      data={{ table }}
      title="Entities"
      loading={tableLoading}
      totalItems={totalItems}
    />
  );
};
