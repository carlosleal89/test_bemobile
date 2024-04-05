import type { HttpContext } from '@adonisjs/core/http';
import Phone from '../models/phone.js';
import Client from '../models/client.js';
import IPhone from '../../interfaces/i_phone.js';
import { phoneValidator, updatePhoneValidator } from '../validators/phone_validator.js';

export default class PhonesController {
  async insertPhoneByClientId({ request, response }: HttpContext) {
    await request.validateUsing(phoneValidator);
    try {
      const { clientId } = request.params();
      const { phones } = request.body();    

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
      return response.status(500)
        .send({ message: `Erro interno do servidor: ${error.message}` });
    }
  }

  async update({params, request, response}: HttpContext) {
    await request.validateUsing(updatePhoneValidator);
    try {
      const body = request.body();
      const phone = await Phone.findOrFail(params.id);
      
      phone.phone = body.phone;

      await phone.save();

      return response.status(200).send({ data: phone });
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Telefone não encontrado' });
      }
      return response.status(500).send({ message: 'Erro interno do servidor' });
    }
  }

  async destroy({params, response}: HttpContext) {
    try {
      const phone = await Phone.findOrFail(params.id);

      await phone.delete();
      
      return response.status(204);
    } catch(error: any) {
      console.error(error.message);
      if (error.message === 'Row not found') {
        return response.status(200).send({ message: 'Telefone não encontrado' });
      }
      return response.status(500).send({ message: 'Erro interno do servidor' });
    }
  }
}