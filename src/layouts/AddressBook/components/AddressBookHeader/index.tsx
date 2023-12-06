import { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '~/components';
import {
  Button,
  DropdownSelect,
  RefreshButton,
  SkeletonLoader,
} from '~/components/UiKit';
import { AccountContext } from '~/context/AccountContext';
import { InstructionsContext } from '~/context/InstructionsContext';
import { useWindowWidth } from '~/hooks/utility';
import { ESortOptions } from '../../types';
import { CreateEntity } from './components/CreateEntity';
import { TABS } from './constants';
import {
  StyledHeader,
  StyledWrapper,
  StyledNavList,
  StyledNavLink,
  StyledSortWrapper,
  StyledSort,
  StyledButtonWrapper,
} from './styles';

interface IAddressBookHeaderProps {
  sortBy: ESortOptions;
  setSortBy: React.Dispatch<React.SetStateAction<ESortOptions>>;
}

export const AddressBookHeader: React.FC<IAddressBookHeaderProps> = ({
  sortBy,
  setSortBy,
}) => {
  const { createdVenues, refreshInstructions, instructionsLoading } =
    useContext(InstructionsContext);
  const { identityLoading } = useContext(AccountContext);
  const [createVenueOpen, setCreateVenueOpen] = useState(false);
  const [sendAssetOpen, setSendAssetOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const { isMobile, isWidescreen } = useWindowWidth();

  const toggleCreateVenue = () => {
    setCreateVenueOpen((prev) => !prev);
  };
  const toggleSendAsset = () => {
    setSendAssetOpen((prev) => !prev);
  };

  return (
    <StyledHeader>
      {isMobile ? (
        <DropdownSelect
          options={TABS.map(({ label }) => label)}
          onChange={(option) => {
            const tab = TABS.find(({ label }) => label === option);
            if (tab) {
              setSearchParams(tab.searchParam);
            }
          }}
          selected={type || undefined}
          borderRadius={24}
          error={undefined}
          placeholder={type || ''}
        />
      ) : (
        <StyledNavList>
          {TABS.map(({ label, searchParam }) => (
            <li key={label}>
              <StyledNavLink
                className={type === label ? 'active' : ''}
                onClick={() => setSearchParams(searchParam)}
              >
                {instructionsLoading ? <SkeletonLoader width={48} /> : label}
              </StyledNavLink>
            </li>
          ))}
        </StyledNavList>
      )}
      <StyledWrapper>
        <StyledSortWrapper>
          Sort by:
          <StyledSort>
            <select
              onChange={({ target }) => {
                setSortBy(target.value as ESortOptions);
              }}
              value={sortBy}
            >
              {Object.values(ESortOptions).map((option) => (
                <option className="options" key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Icon name="DropdownIcon" className="dropdown-icon" />
          </StyledSort>
        </StyledSortWrapper>
        <StyledButtonWrapper>
          <Button
            variant="modalPrimary"
            onClick={toggleCreateVenue}
            round={!isWidescreen}
            disabled={identityLoading}
          >
            <Icon name="Plus" />
            {isWidescreen && ' Create Entity'}
          </Button>
          <RefreshButton
            onClick={refreshInstructions}
            disabled={instructionsLoading}
          />
        </StyledButtonWrapper>
      </StyledWrapper>
      {createVenueOpen && <CreateEntity toggleModal={toggleCreateVenue} />}
    </StyledHeader>
  );
};
