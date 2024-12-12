import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import SearchInput from '../../../components/SearchInput';
import AddClientModal from '../components/AddClientModal';
import ChangeClientModal from '../components/ChangeClientModal';
import ListOfClients from '../components/ListOfClients';
const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [clientId, setClientId] = useState('');
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShowNew = () => setShowNew(true);
  const handleCloseNew = () => setShowNew(false);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients/');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.log('Error fetching clients:', error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSearch = async (searchValue) => {
    try {
      const response = await fetch(
        `http://localhost:5000/clients/search?query=${encodeURIComponent(searchValue)}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data = await response.json();
      setClients(data);
      if (!response.ok) {
        throw new Error('Failed to find a client');
      }
    } catch (error) {
      console.log(error);
      setClients([]);
    }
  };

  const handleRowClick = (id) => {
    setShow(true);
    setClientId(id);
  };
  return (
    <>
      <AddClientModal
        isVisible={showNew}
        close={handleCloseNew}
        show={handleShowNew}
      />
      <ChangeClientModal
        clientId={clientId}
        isVisible={show}
        close={handleClose}
        show={handleShow}
      />
      <ListOfClients
        handleRowClick={handleRowClick}
        items={clients}
        head1={'Client ID'}
        head2={'Client Name'}
        head3={'Client Surname'}
      />

      <Container>
        <Row>
          <Col>
            <Button onClick={fetchClients} className="mb-3 mt-4">
              Render Clients
            </Button>
          </Col>
          <Col xs={8}>
            <SearchInput
              formText={'Look for clients by ID, or client name'}
              onSearch={handleSearch}
            />
          </Col>
          <Col>
            <Button className="mb-3 mt-4" onClick={handleShowNew}>
              Add new Client
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClientsPage;
