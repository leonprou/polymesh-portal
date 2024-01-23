export const HISTORICAL_COLUMNS = [
  {
    header: 'ID',
    accessor: 'extrinsicId',
  },
  {
    header: 'Date / Time',
    accessor: 'dateTime',
  },
  { header: 'Module', accessor: 'module' },
  { header: 'Call', accessor: 'call' },
  { header: 'Status', accessor: 'success' },
];

export const TOKEN_COLUMNS = [
  {
    header: 'ID',
    accessor: 'id',
  },
  {
    header: 'Date / Time',
    accessor: 'dateTime',
  },
  {
    header: 'From',
    accessor: 'from',
  },
  { header: 'To', accessor: 'to' },
  { header: 'Asset', accessor: 'asset' },
  { header: 'Amount', accessor: 'amount' },
];

export const ADDRESS_BOOK_COLUMNS = [
  {
    header: 'Name',
    accessor: 'name',
  },
  {
    header: 'Address',
    accessor: 'address',
  },
  {
    header: 'DID',
    accessor: 'did',
  }
];


export interface IIdData {
  eventId: string;
  blockId: string;
  extrinsicIdx: number | null;
}

export interface ITokenItem {
  id: IIdData;
  dateTime: string;
  from: string;
  to: string;
  amount: string;
  asset: string;
}

export interface IAddressBookItem {
  name: string;
  address: string;
  did: string;
}

export interface IHistoricalItem {
  extrinsicId: string;
  dateTime: string;
  module: string;
  call: string;
  success: boolean;
}

export enum EActivityTableTabs {
  HISTORICAL_ACTIVITY = 'historical',
  TOKEN_ACTIVITY = 'token',
}

export enum AddressBookTableTabs {
  ADDRESS_BOOK = 'address-book',
}
