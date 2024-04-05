import vine from '@vinejs/vine';

export const addressValidator = vine.compile(
  vine.object({
    addresses: vine.array (
      vine.object({
        street: vine
          .string()
          .trim()
          .minLength(5),
        number: vine
          .string()
          .trim(),
        neighborhood: vine
          .string()
          .trim()
          .minLength(3),
        city: vine
          .string()
          .trim()
          .minLength(3),
        state: vine
          .string()
          .trim()
          .minLength(2),
        country: vine
          .string()
          .trim()
          .minLength(3),
        postal_code: vine
          .string()
          .trim()
          .minLength(3),
      })
    ),
  })
)

export const updateAddressValidator = vine.compile(  
    vine.object({
      street: vine
        .string()
        .trim()
        .minLength(5),
      number: vine
        .string()
        .trim(),
      neighborhood: vine
        .string()
        .trim()
        .minLength(3),
      city: vine
        .string()
        .trim()
        .minLength(3),
      state: vine
        .string()
        .trim()
        .minLength(2),
      country: vine
        .string()
        .trim()
        .minLength(3),
      postal_code: vine
        .string()
        .trim()
        .minLength(3),      
  })
)