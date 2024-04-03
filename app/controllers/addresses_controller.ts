import type { HttpContext } from '@adonisjs/core/http';
import IAddressData from '../../interfaces/i_address.js';
import Address from '../models/address.js';

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
      // verificar se o id do cliente existe
      const { clientId } = request.params();
      const { addresses } = request.body();
      const newAddress = await this.insertAddress(clientId, addresses);
      return response.status(201).send({
        data: newAddress,
      });
    } catch(error: any) {
      console.error(error.message);
    }
  }
}