import Form from 'react-bootstrap/Form';
type Props = {
  handleClick: () => void;
};

const Checkbox = ({ handleClick }: Props) => {
  return (
    <>
      <Form.Check onClick={handleClick} type="radio" aria-label="radio 1" />
    </>
  );
};

export default Checkbox;
