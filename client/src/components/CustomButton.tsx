import { Button } from 'react-bootstrap';

const CustomButton = ({
  variantOption,
  type = 'button',
  callback = () => {},
  text,
  buttonClassName,
  isButtonHidden = false,
}) => {
  return (
    <Button
      hidden={isButtonHidden}
      className={buttonClassName}
      variant={variantOption}
      type={type}
      onClick={callback}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
