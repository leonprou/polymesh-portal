import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ESortOptions } from './types';
import { AddressBookTable } from './components/AddressBookTable';

const AddressBook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    if (type) return;

    setSearchParams({ type: 'pending' });
  }, [type, setSearchParams]);

  return (
    <>
      <AddressBookTable />
    </>
  );
};

export default AddressBook;
