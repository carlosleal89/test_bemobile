import type { HttpContext } from '@adonisjs/core/http';
import IAddressData from '../../interfaces/i_address.js';
import Address from '../models/address.js';
import Client from '../models/client.js';
import { addressValidator, updateAddressValidator } from '../validators/address_validator.js';

export default class AddressesController {
  async insertAddressByClientId({ request, response }: HttpContext) {
    await request.validateUsing(addressValidator);
    try {
      const { clientId } = request.params();
      const { addresses } = request.body();

      await Client.findOrFail(clientId);
     
      const newAddress = await Promise.all(addresses.map(async (addressEl: IAddressData) => {
        return await Address.create({ clientId, ...addressEl });
      }));

      return response.status(201).send({
        data: newAddress,
      });
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Cliente não encontrado' });
      }
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
    }
  }

  async update({params, request, response}: HttpContext) {
    await request.validateUsing(updateAddressValidator);
    try {
      const body = request.body();
      const address = await Address.findOrFail(params.id);
      
      address.street = body.street;
      address.number = body.number;
      address.neighborhood = body.neighborhood;
      address.city = body.city;
      address.state = body.state;
      address.country = body.country;
      address.postal_code = body.postal_code;

      await address.save();

      return response.status(200).send({ data: address });
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Endereço não encontrado' });
      }
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
    }
  }

  async destroy({params, response}: HttpContext) {
    try {
      const address = await Address.findOrFail(params.id);

      await address.delete();
      
      return response.status(204);
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Endereço não encontrado' });
      }
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
    }
  }
}