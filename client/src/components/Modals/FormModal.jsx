import { Form, FloatingLabel } from 'react-bootstrap';

const FormModal = ({ state, updateState, fields }) => {
  return (
    <>
      {fields.map((item) => (
        <FloatingLabel label={item.label} className="mb-3" key={item.name}>
          <Form.Control
            type={item.type}
            placeholder={item.label}
            value={state[item.name]}
            onChange={(e) => updateState({ [item.name]: e.target.value })}
          ></Form.Control>
        </FloatingLabel>
      ))}
    </>
  );
};

export default FormModal;
