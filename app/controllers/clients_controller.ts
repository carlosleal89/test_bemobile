import type { HttpContext } from '@adonisjs/core/http';
import Client from '../models/client.js';

export default class ClientsController {
  async store({request, response}: HttpContext) {
    try {
      const body = request.body();
      const newClient = await Client.create(body);
      return response.status(201).send({
        message: 'Cliente inserido na base de dados.',
        data: {
          nome: newClient.name,
          CPF: newClient.cpf,
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