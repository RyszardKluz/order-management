import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

import SearchInput from '../../../components/SearchInput';
import AddClientModal from '../components/AddClientModal';
import ChangeClientModal from '../components/ChangeClientModal';
import ClientList from '../components/ClientList';
import { useToast } from '../../../hooks/useToast';
import fetchResorce from '../../../helpers/fetchResource';
import searchResource from '../../../helpers/searchResource';

const ClientsPage = () => {
  const [state, setState] = useState({
    clients: [],
    isEditModalVisible: false,
    isAddModalVisible: false,
    selectedClientId: '',
  });

  const { showToast, ToastComponent } = useToast();

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const resetFormFields = () => {
    setState({
      clientName: '',
      clientSurname: '',
      clientAddress: '',
    });
  };

  const handleEditModalClose = () => updateState({ isEditModalVisible: false });
  const handleAddModalClose = () => updateState({ isAddModalVisible: false });

  const fetchClients = async () => {
    await fetchResorce('/clients', 'clients', setState, showToast);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSearch = async (searchValue) => {
    searchResource(
      '/clients',
      searchValue,
      updateState,
      showToast,
      'Client',
      'GET',
    );
  };

  const handleRowClick = (id) => {
    updateState({ isEditModalVisible: true, selectedClientId: id });
  };

  return (
    <>
      <Container>
        {' '}
        <Row>
          <Col xs={6}>{ToastComponent}</Col>
        </Row>
      </Container>

      <AddClientModal
        isVisible={state.isAddModalVisible}
        onClose={handleAddModalClose}
        onAdd={fetchClients}
        onShowToast={showToast}
        onResetFields={resetFormFields}
      />
      <ChangeClientModal
        clientId={state.selectedClientId}
        isVisible={state.isEditModalVisible}
        onClose={handleEditModalClose}
        fetchClients={fetchClients}
        onShowToast={showToast}
        onResetFields={resetFormFields}
      />
      <ClientList
        onRowSelect={handleRowClick}
        clients={state.clients}
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
            <Button
              className="mb-3 mt-4"
              onClick={() => {
                updateState({ isAddModalVisible: true });
              }}
            >
              Add new Client
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClientsPage;
