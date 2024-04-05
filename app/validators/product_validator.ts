import vine from '@vinejs/vine';

export const productValidator = vine.compile(
  vine.object({
    products: vine.array (
      vine.object({
        brand: vine
          .string()
          .trim()
          .minLength(3),
        model: vine
          .string()
          .trim()
          .minLength(3),
        size: vine
          .string()
          .trim()
          .minLength(3),
        color: vine
          .string()
          .trim()
          .minLength(3),
        price: vine
          .number(),
      })
    ),
  })
)

export const updateProductValidator = vine.compile(
    vine.object({
      brand: vine
          .string()
          .trim()
          .minLength(3),
        model: vine
          .string()
          .trim()
          .minLength(3),
        size: vine
          .string()
          .trim()
          .minLength(3),
        color: vine
          .string()
          .trim()
          .minLength(3),
        price: vine
          .number(), 
  })
)