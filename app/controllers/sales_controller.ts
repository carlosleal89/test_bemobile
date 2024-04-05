import type { HttpContext } from '@adonisjs/core/http';
import Client from '../models/client.js';
import Sale from '../models/sale.js';
import Product from '../models/product.js';
import { saleValidator } from '../validators/sale_validator.js';

export default class SalesController {
  async store({ request, response }: HttpContext) {
    await request.validateUsing(saleValidator);
    try {
      const { clientId, productId, quantity, unitPrice, totalPrice } = request.body();

      await Client.findOrFail(clientId);
      const isProduct = await Product.find(productId);
      if (!isProduct) {
        return response.status(404).send({ message: 'Produto não encontrado' });
      }

      const newSale = await Sale.create({
        clientId,
        productId,
        quantity,
        unitPrice,
        totalPrice,
      });

      return response.status(201).send(newSale);
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(404).send({ message: 'Cliente não encontrado' });
      }
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
    }
  }
}