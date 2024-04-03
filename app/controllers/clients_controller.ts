import type { HttpContext } from '@adonisjs/core/http';
import Client from '../models/client.js';
import AddressesController from './addresses_controller.js';
import formatData from '../../utils/format_data.js';

export default class ClientsController {
  private addressesController = new AddressesController();

  async index({response}: HttpContext) {
    try {
      const allClients = await Client.query().preload('addresses');
      const clientsWithoutTimestamps = formatData(allClients);
      
      return response.status(200).send({
        data: clientsWithoutTimestamps,
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
      const newAddress = await this.addressesController
        .insertAddress( newClient.id, addresses );
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

  async show({params, response}: HttpContext) {
    try {
      const client = await Client.findOrFail(params.id);
      return response.status(200).send({ data: client });
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Cliente não encontrado' });
      }
      return response.status(500).send({ message: 'Erro interno do servidor' });
    }
  }

  async update({params, request, response}: HttpContext) {
    try {
      const body = request.body();
      const client = await Client.findOrFail(params.id);

      client.name = body.name;
      client.cpf = body.cpf;

      await client.save();
      
      return response.status(200).send({ data: client });
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Cliente não encontrado' });
      }
      return response.status(500).send({ message: 'Erro interno do servidor' });
    }
  }

  async destroy({params, response}: HttpContext) {
    try {
      const client = await Client.findOrFail(params.id);

      await client.delete();
      
      return response.status(204);
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Cliente não encontrado' });
      }
      return response.status(500).send({ message: 'Erro interno do servidor' });
    }
  }
}