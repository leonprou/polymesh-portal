import { createColumnHelper } from '@tanstack/react-table';

import {
  ADDRESS_BOOK_COLUMNS,
  IAddressBookItem
} from './constants';
import {
  AddressCellWrapper,
} from './styles';
import { CopyToClipboard, Icon } from '~/components';
import { formatDid } from '~/helpers/formatters';


export const columns = ADDRESS_BOOK_COLUMNS.map(
  ({ header, accessor }) => {
    const key = accessor as keyof IAddressBookItem;
    const columnHelper = createColumnHelper<IAddressBookItem>();
    return columnHelper.accessor(key, {
      header: () => header,
      cell: (info) => {
        const data = info.getValue();

        if (key === 'did') {
          return (
            <AddressCellWrapper>
              {formatDid(data as string, 6, 6)}
              <CopyToClipboard value={data as string} />
            </AddressCellWrapper>
          );
        }

        return data;
      },
    });
  },
);