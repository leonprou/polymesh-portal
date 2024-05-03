import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

import {
  ADDRESS_BOOK_COLUMNS,
  IAddressBookItem
} from './constants';
import {
  AddressCellWrapper,
  NameCellWrapper
} from './styles';
import { CopyToClipboard, Icon } from '~/components';
import { formatDid } from '~/helpers/formatters';


function Checkbox({ checked, onChange }) { 
  // const [isChecked, setIsChecked] = useState(false);
  // const { checked, onChange } = props;

  return (
    <div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export const columns = ADDRESS_BOOK_COLUMNS.map(
  ({ accessor, header }) => {
    const key = accessor as keyof IAddressBookItem;
    const columnHelper = createColumnHelper<IAddressBookItem>();
    return columnHelper.accessor(key, {
      header: () => header,
      cell: (info) => {
        const { row } = info 
        console.log(row.getIsSelected())
        const data = info.getValue();
        
        if (key === 'selected') {
          return (
            <Checkbox
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              />
          );
        }

        if (key === 'did') {
          return (
            <AddressCellWrapper>
              {formatDid(data as string, 6, 6)}
              <CopyToClipboard value={data as string} />
            </AddressCellWrapper>
          );
        }

        if (key === 'name') {
          return (
            <NameCellWrapper>
              {data as string}
            </NameCellWrapper>
          );
        }
        return data;
      },
    });
  },
);