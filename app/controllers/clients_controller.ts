import type { HttpContext } from '@adonisjs/core/http';
import Client from '../models/client.js';
import AddressesController from './addresses_controller.js';

export default class ClientsController {
  private addressesController = new AddressesController();

  async index({request, response}: HttpContext) {
    try {
      const allClients = await Client.query().preload('addresses');
      return response.status(200).send({
        data: {
          allClients
        },
      }); 

    } catch(error: any) {
      console.error(error.message);
      return response.status(500).send({
        message: `Internal Server Error: ${error.message}`
      });
    }
  }

  async store({request, response}: HttpContext) {
    try {
      const { name, cpf, addresses } = request.body();
      const newClient = await Client.create({name, cpf});
      const newAddress = await this.addressesController.store({
        clientId: newClient.id,
        ...addresses
      })
      return response.status(201).send({
        message: 'Cliente inserido na base de dados.',
        data: {
          nome: newClient.name,
          CPF: newClient.cpf,
          Addresses: newAddress
        },
      }); 
    } catch(error: any) {
      console.error(error.message);
      const errorMessage = error.code === 'ER_DUP_ENTRY' ?
        'Já existe um cliente cadastrado com o mesmo CPF.'
        : error.message;
        return response.status(409).send({
          message: errorMessage,
        }); 
    }
  }
}