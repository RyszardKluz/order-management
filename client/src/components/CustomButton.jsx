import { Button } from 'react-bootstrap';

const CustomButton = ({
  variantOption,
  type = 'button',
  callback = () => {},
  text,
}) => {
  return (
    <Button variant={variantOption} type={type} onClick={callback}>
      {text}
    </Button>
  );
};

export default CustomButton;
