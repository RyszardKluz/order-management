import { Modal, Form } from 'react-bootstrap';
import { FormEvent, useState } from 'react';
import submitHandler from '../../helpers/submitHandler';
import CustomButton from '../CustomButton';
import FormModal from './FormModal';
import { Fields } from '../../types/fields';
import { ResourceFormState } from '../../types/form';
import { ShowToastFunction } from '../../types/toast';
type Props = {
  isVisible: boolean;
  resourceName: string;
  endpoint: string;
  onClose: () => void;
  onShowToast: ShowToastFunction;
  onSubmitSuccess: () => void;
  fields: Fields;
};

const AddResourceModal = ({
  isVisible,
  resourceName,
  endpoint,
  onClose,
  onShowToast,
  onSubmitSuccess,
  fields,
}: Props) => {
  const initialState: ResourceFormState = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {},
  );

  const [state, setState] = useState(initialState);

  const inputFieldsToValidate = fields.map((field) => field.name);

  const updateState = (newState: ResourceFormState) => {
    setState((prevState) => ({
      ...prevState,
      ...(newState as Record<string, string>),
    }));
  };

  const resetFormFields = () => {
    setState(initialState);
  };

  const handleSubmit = async (e: FormEvent) => {
    submitHandler(
      e,
      endpoint,
      'POST',
      state,
      inputFieldsToValidate,
      resourceName,
      onShowToast,
      onClose,
      onSubmitSuccess,
      resetFormFields,
    );
  };

  return (
    <>
      <Modal
        show={isVisible}
        onHide={() => {
          onClose();
          resetFormFields();
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Enter {resourceName} details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormModal
              state={state}
              updateState={updateState}
              fields={fields}
            />
          </Modal.Body>
          <Modal.Footer>
            <CustomButton
              variantOption={'secondary'}
              text={'Close'}
              callback={onClose}
            />

            <CustomButton
              variantOption={'primary'}
              text={`Add ${resourceName}`}
              type="submit"
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddResourceModal;
