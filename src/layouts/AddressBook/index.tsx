import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AddressBookTable } from './components/AddressBookTable';
import { AddressBookHeader } from './components/AddressBookHeader';
import { ESortOptions, EAddressBookEntityTypes } from './types';

const AddressBook = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [sortBy, setSortBy] = useState<ESortOptions>(ESortOptions.NEWEST);

  useEffect(() => {
    if (type) return;

    setSearchParams({ type: EAddressBookEntityTypes.DID });
  }, [type, setSearchParams]);

  return (
    <>
      <AddressBookHeader sortBy={sortBy} setSortBy={setSortBy} />
      <AddressBookTable />
    </>
  );
};

export default AddressBook;
