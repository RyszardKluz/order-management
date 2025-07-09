import Form from 'react-bootstrap/Form';
type CheckboxProps = {
  handleClick: () => void;
};

const Checkbox = ({ handleClick }: CheckboxProps) => {
  return (
    <>
      <Form.Check onClick={handleClick} type="radio" aria-label="radio 1" />
    </>
  );
};

export default Checkbox;
