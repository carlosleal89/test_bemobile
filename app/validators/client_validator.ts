import vine from '@vinejs/vine';

export const clientValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(5)
      .regex(/^[A-Za-zÀ-ÿ\s]+$/),
    cpf: vine
      .string()
      .trim()
      .regex(/^(?!([0-9])\1+$)\d{11}$/),
  })
)