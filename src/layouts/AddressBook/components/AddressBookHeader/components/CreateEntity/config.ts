import { yupResolver } from '@hookform/resolvers/yup';
// import { VenueType } from '@polymeshassociation/polymesh-sdk/types';
import { EAddressBookEntityTypes } from '../../../../types';
import { ValidationMode } from 'react-hook-form';
import * as yup from 'yup';

export interface IFieldValues {
  name: string
  address: string;
  did: string;
}

export const FORM_CONFIG = {
  mode: 'onTouched' as keyof ValidationMode,
  defaultValues: {
    name: 'kk',
    address: '5DPyj8QYwYv6cxZEvVk9XXuvNMBoSkH4o2xMSg97FjAtxFy6',
    did: '0x3c47d8ebf615e0c1bf915fc11c40e1995bfdf66b3e3b027d9b3c83cb38dc9f44'
  },
  resolver: yupResolver(
    yup.object().shape({
      name: yup.string().required('Tag name is required'),
      did: yup.string().required('DID is required'),
      address: yup.string().required('Address is required'),
    }),
  ),
};
