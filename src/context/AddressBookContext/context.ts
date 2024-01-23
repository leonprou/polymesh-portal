import { createContext } from 'react';
import { IAddressBookContext, initialState } from './constants';

const AddressBookContext = createContext<IAddressBookContext>(initialState);

export default AddressBookContext;
