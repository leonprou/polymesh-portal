/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import {
  UnsubCallback,
} from '@polymeshassociation/polymesh-sdk/types';
import { EAddressBookEntityTypes } from '../../../../types';
import { useContext } from 'react';
import { Modal } from '~/components';
import { Heading, Button, DropdownSelect } from '~/components/UiKit';
import { StyledInput, StyledLabel, StyledButtonsWrapper } from '../styles';
import { InputWrapper, StyledErrorMessage } from './styles';
import { FORM_CONFIG, IFieldValues } from './config';
import { PolymeshContext } from '~/context/PolymeshContext';
import { notifyError } from '~/helpers/notifications';
import { useTransactionStatus } from '~/hooks/polymesh';
import { InstructionsContext } from '~/context/InstructionsContext';
import { useWindowWidth } from '~/hooks/utility';
import { AddressBookContext } from '~/context/AddressBookContext';

interface ICreateEntityProps {
  toggleModal: () => void | React.ReactEventHandler | React.ChangeEventHandler;
}

export const CreateEntity: React.FC<ICreateEntityProps> = ({ toggleModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<IFieldValues>(FORM_CONFIG);
  const {
    api: { sdk },
  } = useContext(PolymeshContext);
  // const { refreshInstructions } = useContext(InstructionsContext);
  // const { handleStatusChange } = useTransactionStatus();
  const { isMobile } = useWindowWidth();
  const { addDidEntity } = useContext(AddressBookContext);
  const onSubmit = async ({ name, address, did}: IFieldValues) => {
    if (!sdk) return;

    let unsubCb: UnsubCallback | undefined;

    reset();
    toggleModal();
    try {
      await addDidEntity({ name, address, did});
      // const venueQ = await sdk.settlements.createEntity({ description, type });
      // venueQ.onStatusChange(handleStatusChange);
      // await venueQ.run();
      // refreshInstructions();
    } catch (error) {
      notifyError((error as Error).message);
    } finally {
      if (unsubCb) {
        unsubCb();
      }
    }
  };

  return (
    <Modal handleClose={toggleModal} disableOverflow>
      <Heading type="h4" marginBottom={32}>
        Create New Entity
      </Heading>
      <InputWrapper $marginBottom={24}>
        <StyledLabel htmlFor="name">Tag name</StyledLabel>
        <StyledInput id="name" {...register('name')} />
        {!!errors?.name?.message && (
          <StyledErrorMessage>
            {errors?.name?.message as string}
          </StyledErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper $marginBottom={24}>
        <StyledLabel htmlFor="did">DID</StyledLabel>
        <StyledInput id="did" {...register('did')} />
        {!!errors?.did?.message && (
          <StyledErrorMessage>
            {errors?.did?.message as string}
          </StyledErrorMessage>
        )}
      </InputWrapper>
      <InputWrapper $marginBottom={24}>
        <StyledLabel htmlFor="address">Address</StyledLabel>
        <StyledInput id="address" {...register('address')} />
        {!!errors?.address?.message && (
          <StyledErrorMessage>
            {errors?.address?.message as string}
          </StyledErrorMessage>
        )}
      </InputWrapper>
      <StyledButtonsWrapper>
        {!isMobile && (
          <Button variant="modalSecondary" onClick={toggleModal}>
            Cancel
          </Button>
        )}
        <Button
          variant="modalPrimary"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Confirm
        </Button>
      </StyledButtonsWrapper>
    </Modal>
  );
};
