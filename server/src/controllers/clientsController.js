import { v4 as uuidv4 } from 'uuid';
class ClientsController {
  clients = [
    {
      clientId: '2fbf70b5-2b67-448c-97e1-9a33dcd8de27',
      clientName: 'Client1',
      clientSurname: 'Surname1',
    },
    {
      clientId: '4bb7ca3d-070e-4be1-a4a1-d63c79fbce65',
      clientName: 'Client2',
      clientSurname: 'Surname2'
    },
  ];

  getAllClients = (req, res) => {
    res.status(200).json(this.clients);
  };

  getClientByQuery = (req, res) => {
    const searchValue = req.query.query

    if (!searchValue) {
      return res.status(400).json({ error: 'Search value is required!' })
    }
    const matchedClients = this.clients.filter((client) =>
      client.clientName.toLowerCase().includes(searchValue.toLowerCase()) || client.clientSurname.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (matchedClients.length === 0) {
      return res.status(404).json({ error: 'No clients found' })
    }

    res.status(200).json(matchedClients)
  }
  addClient = (req, res) => {
    const { clientName, clientSurname } = req.body;

    if (!clientName || typeof clientName !== 'string' || !clientSurname || typeof clientSurname !== 'string') {
      return res.status(400).json({ error: 'Invalid client details!' });
    }

    const newClient = {
      clientId: uuidv4(),
      clientSurname: clientSurname,
      clientName: clientName,
    };
    this.clients.push(newClient);
    res.status(200).json({ message: `Created ${clientName}` });
  };
  changeClient = (req, res) => {
    const { clientId } = req.params
    const { clientName, clientSurname } = req.body

    const clientIndex = this.clients.findIndex((client) => client.clientId === clientId);

    if (clientIndex === -1) {
      return res.status(404).json({ error: 'client not found!' });
    }
    if (clientName.trim() !== '') {
      this.clients[clientIndex].clientName = clientName;
    }
    if (clientName.trim() !== '') {
      this.clients[clientIndex].clientSurname = clientSurname;
    }

    res.status(200).json({
      message: 'client updated successfully!',
      client: this.clients[clientIndex],
    });
  };
  deleteClient = (req, res) => {
    const { clientId } = req.params;
    const clientIndex = this.clients.findIndex((client) => client.clientId === clientId);
    if (clientIndex === -1) {
      return res.status(404).json({ error: 'client not found!' })
    }
    this.clients.splice(clientIndex, 1)

    res.status(200).json({ message: 'Client deleted succesfully' })

  }
}



export { ClientsController };
