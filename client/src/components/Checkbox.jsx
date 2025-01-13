import Form from 'react-bootstrap/Form';

const Checkbox = ({ handleClick }) => {
  return (
    <>
      <Form.Check onClick={handleClick} type="radio" aria-label="radio 1" />
    </>
  );
};

export default Checkbox;
