import type { HttpContext } from '@adonisjs/core/http';
import IAddressData from '../../interfaces/i_address.js';
import Address from '../models/address.js';

export default class AddressesController {
  async store(addressData: IAddressData) {
    try {
      const newAddress = await Address.create(addressData);
    } catch(error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}