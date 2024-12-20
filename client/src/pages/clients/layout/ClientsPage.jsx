import { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import SearchInput from '../../../components/SearchInput';
import AddClientModal from '../components/AddClientModal';
import ChangeClientModal from '../components/ChangeClientModal';
import ClientList from '../components/ListOfClients';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState('');

  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('');
  const [toastBody, setToastBody] = useState('');

  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);

  const showErrorToast = (body) => {
    setToastVariant('danger');
    setToastBody(body);
    setShowToast(true);
  };
  const showSuccessToast = (body) => {
    setToastVariant('success');
    setToastBody(body);
    setShowToast(true);
  };

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients/');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log(response);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.log('Error fetching clients', error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSearch = async (searchValue) => {
    try {
      const response = await fetch(
        `http://localhost:5000/clients?query=${encodeURIComponent(searchValue)}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (searchValue.trim() === '') {
        throw new Error('Enter any value');
      }
      if (!response.ok) {
        setClients([]);
        throw new Error('Failed to find a client');
      }
      const data = await response.json();
      setClients(data);
      showSuccessToast('Successfully found a client');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleRowClick = (id) => {
    handleShowEdit();
    setClientId(id);
  };

  return (
    <>
      <Container>
        {' '}
        <Row>
          <Col xs={6}>
            <ToastContainer position="top-end" className="p-3">
              <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={2000}
                autohide
                bg={toastVariant}
              >
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                  />
                </Toast.Header>
                <Toast.Body>{toastBody}</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </Container>

      <AddClientModal
        isVisible={showAdd}
        onClose={handleCloseAdd}
        onAdd={fetchClients}
        onShowSuccessToast={showSuccessToast}
        onShowErrorToast={showErrorToast}
      />
      <ChangeClientModal
        clientId={clientId}
        isVisible={showEdit}
        onClose={handleCloseEdit}
        onUpdateUI={fetchClients}
        onShowSuccessToast={showSuccessToast}
        onShowErrorToast={showErrorToast}
      />
      <ClientList
        onRowSelect={handleRowClick}
        clients={clients}
        columnHeadings={[
          'Client ID',
          'Client Name',
          'Client Surname',
          'Client Address',
        ]}
      />
      <Container>
        {' '}
        <Row>
          <Col>
            <Button onClick={fetchClients} className="mb-3 mt-4">
              Refresh Clients List
            </Button>
          </Col>
          <Col xs={8}>
            <SearchInput
              formText="Look for clients by ID, or client name"
              onSearch={handleSearch}
            />
          </Col>
          <Col>
            <Button className="mb-3 mt-4" onClick={handleShowAdd}>
              Add new Client
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClientsPage;
