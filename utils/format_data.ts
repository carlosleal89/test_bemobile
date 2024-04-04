import Client from "../app/models/client.js";

export default function formatData(data: Client[]) {
  const clientsData = data.map(client => ({
    id: client.id,
    name: client.name,
    cpf: client.cpf,
    addresses: client.addresses.map(address => ({
      id: address.id,
      clientId: address.clientId,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      country: address.country,
      postalCode: address.postal_code,
    })),
    phones: client.phones.map(phone => ({
      id: phone.id,
      clientId: phone.clienteId,
      phone: phone.phone,
    }))
  }));
  return clientsData;
}