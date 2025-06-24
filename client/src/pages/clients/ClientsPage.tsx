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
import { ResourceProvider } from '../../store/ResourceLContext';

import {
  clientColumnHeadings,
  clientFields,
} from '../../config/clients/clientsFields';
import { Client } from '../../types/resource';

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

  const updateState = (newState: Record<string, unknown>) =>
    setState((prevState) => ({ ...prevState, ...newState }));

  const handleEditModalClose = () => updateState({ isEditModalVisible: false });
  const handleAddModalClose = () => updateState({ isAddModalVisible: false });

  const fetchClients = async () => {
    const data = await fetchResorce('/clients', 'clients', showToast);
    updateState({ clients: data });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSearch = async (searchValue: string) => {
    const data = await searchResource(
      '/clients',
      searchValue,
      showToast,
      'Client',
      'GET',
    );
    updateState({ clients: data });
  };

  const handleRowClick = (client: Client): void => {
    const id = client.id;
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

      <ResourceProvider<Client>
        value={{
          resourceList: state.clients,
          onRowSelect: handleRowClick,
          columnHeadings: clientColumnHeadings,
          isOrderDetailsList: false,
        }}
      >
        <ResourceList<Client> />
      </ResourceProvider>

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
              type={'clientName/clientSurname/clientAddress'}
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
