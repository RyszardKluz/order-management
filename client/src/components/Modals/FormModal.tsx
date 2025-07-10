import { Form, FloatingLabel } from 'react-bootstrap';
import { ResourceFormState } from '../../types/form';
import { Field, Fields } from '../../types/fields';

type Props = {
  state: Record<string, string | number>;
  updateState: (arg: Record<string, string | number>) => void;
  fields: Fields;
};

const FormModal = ({ state, updateState, fields }: Props) => {
  return (
    <>
      {fields.map((field: Field) => (
        <FloatingLabel label={field.label} className="mb-3" key={field.name}>
          <Form.Control
            type={field.type}
            placeholder={field.label}
            value={state[field.name]}
            onChange={(e) =>
              updateState({ [field.name]: e.target.value ?? '' })
            }
          ></Form.Control>
        </FloatingLabel>
      ))}
    </>
  );
};

export default FormModal;
