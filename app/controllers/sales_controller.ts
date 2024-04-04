import type { HttpContext } from '@adonisjs/core/http';
import ISales from '../../interfaces/i_sales.js';
import Client from '../models/client.js';
import Sale from '../models/sale.js';

export default class SalesController {
  async store({ request, response }: HttpContext) {
    try {
      const { sales } = request.body();
      const clientId = sales[0].clientId;

      await Client.findOrFail(clientId);

      const newSales = await Promise.all(sales.map(async (saleEl: ISales) => {
        return await Sale.create(saleEl);
      }));

      return response.status(201).send(newSales);
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