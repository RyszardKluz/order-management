import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import submitHandler from '../../helpers/submitHandler';
import CustomButton from '../CustomButton';
import FormModal from '../Modals/FormModal';

const AddResourceModal = ({
  isVisible,
  fields,
  resourceName,
  endpoint,
  onClose,
  onShowToast,
  onSubmitSuccess,
}) => {
  const initialState = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {},
  );

  const [state, setState] = useState(initialState);

  const inputFieldsToValidate = fields.map((field) => field.name);

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const resetFormFields = () => {
    setState(initialState);
  };

  const handleSubmit = async (e) => {
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
