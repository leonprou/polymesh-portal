import { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import { IAddressBookEntity } from './constants';
import { useLocalStorage } from '~/hooks/utility';
import AddressBookContext from './context';

interface IProviderProps {
  children: React.ReactNode;
}

const AddressBookProvider = ({ children }: IProviderProps) => {

  const [didEntities, setDidEntities] = useLocalStorage<IAddressBookEntity[]>(
    'didEntities',
    [],
  );
  
  const addDidEntity = useCallback(
    (entity: IAddressBookEntity) => {
      setDidEntities((prev) => [...prev, entity]);
    },
    [setDidEntities],
  );

  const contextValue = useMemo(
    () => ({
      didEntities,
      addDidEntity,
    }),
    [
      didEntities,
      addDidEntity,
    ],
  );

  return (
    <AddressBookContext.Provider value={contextValue}>
      {children}
    </AddressBookContext.Provider>
  );
};

export default AddressBookProvider;
