import type { HttpContext } from '@adonisjs/core/http';
import IAddressData from '../../interfaces/i_address.js';
import Address from '../models/address.js';

export default class AddressesController {
  async insertAddress(clientId: number, addressData: Array<IAddressData>) {
    try {
      // const address = await Address.create(addressData);
      const address = addressData
        .map(async (addressEl:IAddressData) => await Address.create({ clientId, ...addressEl }));
      return address;
    } catch(error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      // verificar se o id do cliente existe
      const body = request.body();
      const newAddress = await Address.create(body);
      return response.status(201).send({
        data: newAddress,
      });
    } catch(error: any) {
      console.error(error.message);
    }
  }
}