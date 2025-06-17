import { Button } from 'react-bootstrap';

type Props = {
  variantOption: string;
  type?: 'button' | 'submit' | 'reset';
  callback?: () => void;
  text: string;
  buttonClassName?: string;
  isButtonHidden?: boolean;
};

const CustomButton = ({
  variantOption,
  type = 'button',
  callback = () => {},
  text,
  buttonClassName,
  isButtonHidden = false,
}: Props) => {
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
