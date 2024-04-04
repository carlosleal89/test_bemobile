import type { HttpContext } from '@adonisjs/core/http';
import ISales from '../../interfaces/i_sales.js';
import Client from '../models/client.js';
import Sale from '../models/sale.js';

export default class SalesController {
  async store({ request, response }: HttpContext) {
    try {
      const { clientId, productId, quantity, unitPrice, totalPrice } = request.body();
      console.log(clientId, productId, quantity);
      await Client.findOrFail(clientId);
      
      const newSale = await Sale.create({
        clientId,
        productId,
        quantity,
        unitPrice,
        totalPrice,
      });
      return response.status(201).send({
        data: newSale,
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