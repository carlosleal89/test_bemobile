import vine, { SimpleMessagesProvider } from '@vinejs/vine';

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'O campo {{ field }} é obrigatório.',
  'string': 'The value of {{ field }} field must be a string',
  'minLength': 'O campo {{ field }} deve ter no minimo {{ min }} caracteres',
  'email': 'Por favor, informe um email válido.',
  'fullName.regex': 'O campo {{ field }} não aceita numeros ou caracteres especiais.',
  'cpf.regex': 'CPF com formato inválido. Deve ter 11 digitos e somente números.',
  'phone.regex': 'O telefone deve conter apenas numeros, ter 10 ou 11 digitos e iniciar pelo DDD',
  'phones.*.phone.regex': 'O telefone deve conter apenas numeros, ter 10 ou 11 digitos e iniciar pelo DDD',
})
