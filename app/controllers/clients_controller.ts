import type { HttpContext } from '@adonisjs/core/http';
import Client from '../models/client.js';
import formatData from '../../utils/format_data.js';

export default class ClientsController {
  async index({response}: HttpContext) {
    try {
      const allClients = await Client
        .query()
        .orderBy('id', 'asc')
        .preload('addresses')
        .preload('phones');
      
      return response.status(200).send({
        data: allClients,
      });

    } catch(error: any) {
      console.error(error.message);
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
    }
  }

  async store({request, response}: HttpContext) {
    try {
      const body = request.body();
      const newClient = await Client.create(body);
      return response.status(201).send({
        message: 'Cliente inserido na base de dados.',
        data: newClient
      }); 
    } catch(error: any) {
      console.error(error.message);
      if (error.code === 'ER_DUP_ENTRY') {
        return response.status(409).send({ message: 'CPF já cadastrado' });
      }
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });     
    }
  }

  async show({request, params, response}: HttpContext) {
    try {
      const { month, year } = request.qs();

      if (month && year) {
        const client = await Client
          .query()
          .whereRaw(`YEAR(created_at) = ? AND MONTH(created_at) = ?`, [year, month])
          .where('id', params.id)
          .preload('sales', (query) => {
            query.orderBy('created_at', 'desc')
          })
          .firstOrFail();
          return response.status(200).send({ data: client });
      }
      
      const client = await Client
        .query()
        .where('id', params.id)
        .preload('sales', (query) => {
          query.orderBy('created_at', 'desc')
        })
        .firstOrFail();
      return response.status(200).send({ data: client });
    } catch(error: any) {
      console.error(error);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Cliente não encontrado' });
      }
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
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
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
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
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
    }
  }
}