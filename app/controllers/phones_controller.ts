import type { HttpContext } from '@adonisjs/core/http';
import Phone from '../models/phone.js';
import Client from '../models/client.js';
import IPhone from '../../interfaces/i_phone.js';

export default class PhonesController {
  async insertPhoneByClientId({ request, response }: HttpContext) {
    try {
      const { clientId } = request.params();
      const { phones } = request.body();
      console.log('TESTE', phones);      

      await Client.findOrFail(clientId);

      const newPhone = await Promise.all(phones.map(async (phoneEl: IPhone) => {
        return await Phone.create({ clientId, ...phoneEl });
      }));
      return response.status(201).send({
        data: newPhone,
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