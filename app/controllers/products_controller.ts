import type { HttpContext } from '@adonisjs/core/http';
import Product from '../models/product.js';

export default class ProductsController {
  async index({response}: HttpContext) {
    try {
      const allProducts = await Product.query().orderBy('brand', 'asc');
      
      return response.status(200).send({
        data: allProducts,
      });

    } catch(error: any) {
      console.error(error.message);
      return response.status(500).send({
        message: `Internal Server Error: ${error.message}`
      });
    }
  }

  async store ({ request, response }: HttpContext) {
    try {
      const body = request.body();
      const newProduct = await Product.create(body);

      return response.status(201).send({
        message: 'Produto inserido na base de dados',
        data: newProduct,
      })
    } catch(error: any) {
      console.error(error.message);
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
    }
  }

  async show({params, response}: HttpContext) {
    try {
      const product = await Product.findOrFail(params.id);;
      return response.status(200).send( product );
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Produto não encontrado' });
      }
      return response.status(500).send({ message: 'Erro interno do servidor' });
    }
  }
}