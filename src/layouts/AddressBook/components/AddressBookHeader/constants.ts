import { EAddressBookEntityTypes } from '../../types';

export const TABS = [
  {
    label: EAddressBookEntityTypes.DID,
    searchParam: { type: EAddressBookEntityTypes.DID },
  },
  {
    label: EAddressBookEntityTypes.KEY,
    searchParam: { type: EAddressBookEntityTypes.KEY },
  },
];
