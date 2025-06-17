import { FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

type Props = {
  type: string;
  formText: string;
  onSearch: (searchValue: string) => void;
};

const SearchInput = ({ type, formText, onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(searchValue);
    setSearchValue('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type={type}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Form.Text>{formText}</Form.Text>
        <div className="d-grid gap-2">
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SearchInput;
