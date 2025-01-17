import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SearchInput from '../../components/SearchInput';
import { useToast } from '../../hooks/useToast';
import fetchResorce from '../../helpers/fetchResource';
import searchResource from '../../helpers/searchResource';

import AddResourceModal from '../../components/Modals/AddResourceModal';
import EditResourceModal from '../../components/Modals/EditResourceModal';
import ResourceList from '../../components/Lists/ResourceList.jsx';

import CustomButton from '../../components/CustomButton';

import {
  clientColumnHeadings,
  clientFields,
} from '../../config/clients/clientsFields';

const ClientsPage = () => {
  const [state, setState] = useState({
    clients: [],
    isEditModalVisible: false,
    isAddModalVisible: false,
    selectedClientId: '',
    clientName: '',
    clientSurname: '',
    clientAddress: '',
  });

  const { showToast, ToastComponent } = useToast();

  const updateState = (newState) =>
    setState((prevState) => ({ ...prevState, ...newState }));

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
        <Row>
          <Col xs={6}>{ToastComponent}</Col>
        </Row>
      </Container>

      <AddResourceModal
        endpoint={'/clients'}
        fields={clientFields}
        isVisible={state.isAddModalVisible}
        onClose={handleAddModalClose}
        onShowToast={showToast}
        onSubmitSuccess={fetchClients}
        resourceName={'Client'}
      />

      <EditResourceModal
        endpoint={'/clients'}
        fields={clientFields}
        isVisible={state.isEditModalVisible}
        onClose={handleEditModalClose}
        onShowToast={showToast}
        resourceId={state.selectedClientId}
        onSubmitSuccess={fetchClients}
        resourceName={'Client'}
      />

      <ResourceList
        onRowSelect={handleRowClick}
        resourceList={state.clients}
        columnHeadings={clientColumnHeadings}
      />

      <Container>
        <Row>
          <Col>
            <CustomButton
              text={'Render Clients'}
              variantOption={'primary'}
              callback={fetchClients}
            />
          </Col>
          <Col xs={8}>
            <SearchInput
              formText="Look for clients by ID, or client name"
              onSearch={handleSearch}
            />
          </Col>
          <Col>
            <CustomButton
              text={'Create Client'}
              variantOption={'primary'}
              callback={() => updateState({ isAddModalVisible: true })}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClientsPage;
