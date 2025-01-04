import fetchFromAPI from '../utils/fetchFromAPI';
const ClientOrderList = () => {
  const clients = fetchFromAPI('/clients');
};

export default ClientOrderList;
