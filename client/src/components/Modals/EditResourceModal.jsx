import { Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import submitHandler from '../../helpers/submitHandler';
import deleteHandler from '../../helpers/deleteHandler';
import CustomButton from '../../components/CustomButton';
import FormModal from './FormModal';

const EditResourceModal = ({
  fields,
  endpoint,
  resourceId,
  resourceName,
  isVisible,
  onClose,
  onShowToast,
  onSubmitSuccess,
}) => {
  const initialState = fields.reduce((acc, field) => {
    return { ...acc, [field.name]: '' };
  }, {});

  const [state, setState] = useState(initialState);

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const inputFieldsToValidate = fields.map((field) => field.name);

  const resetFormFields = () => {
    setState(initialState);
  };

  const handleSubmit = (e) => {
    submitHandler(
      e,
      `${endpoint}/${resourceId}`,
      'PATCH',
      state,
      inputFieldsToValidate,
      resourceName,
      onShowToast,
      onClose,
      onSubmitSuccess,
      resetFormFields,
    );
  };

  const handleDelete = () => {
    deleteHandler(
      endpoint,
      resourceId,
      'DELETE',
      resourceName,
      onShowToast,
      onClose,
      onSubmitSuccess,
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
            <Modal.Title>Edit {resourceName} details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormModal
              fields={fields}
              state={state}
              updateState={updateState}
            />
          </Modal.Body>
          <Modal.Footer>
            <CustomButton
              text={'Close'}
              variantOption={'secondary'}
              callback={onClose}
            />
            <CustomButton
              text={`Update ${resourceName}`}
              variantOption={'primary'}
              type="submit"
            />
            <CustomButton
              variantOption={'danger'}
              callback={handleDelete}
              text={'Delete Client'}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditResourceModal;
