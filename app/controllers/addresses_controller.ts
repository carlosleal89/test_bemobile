import type { HttpContext } from '@adonisjs/core/http';
import IAddressData from '../../interfaces/i_address.js';
import Address from '../models/address.js';

export default class AddressesController {
  async inserAddress(addressData: IAddressData) {
    try {
      const {createdAt, updatedAt, ...address} = await Address.create(addressData);      
      return address;
    } catch(error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}