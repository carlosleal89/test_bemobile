import type { HttpContext } from '@adonisjs/core/http';
import IAddressData from '../../interfaces/i_address.js';
import Address from '../models/address.js';
import Client from '../models/client.js';

export default class AddressesController {
  async insertAddress(clientId: number, addressData: Array<IAddressData>) {
    try {
      const addresses = await Promise.all(addressData.map(async (addressEl: IAddressData) => {
        return await Address.create({ clientId, ...addressEl });
      }));      
      return addresses;
    } catch(error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async insertAddressByClientId({ request, response }: HttpContext) {
    try {
      const { clientId } = request.params();
      const { addresses } = request.body();
      await Client.findOrFail(clientId);      
      const newAddress = await this.insertAddress(clientId, addresses);
      return response.status(201).send({
        data: newAddress,
      });
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Cliente não encontrado' });
      }
      return response.status(500).send({ message: 'Erro interno do servidor' });
    }
  }
}