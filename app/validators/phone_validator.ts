import vine from '@vinejs/vine';

export const phoneValidator = vine.compile(
  vine.object({
    phones: vine.array (
      vine.object({
        phone: vine
          .string()
          .trim()
          .minLength(10)
          .regex(/^\d{10,11}$/),
      })
    ),
  })
)

export const updatePhoneValidator = vine.compile(  
  vine.object({
    phone: vine
      .string()
      .trim()
      .minLength(10)
      .regex(/^\d{10,11}$/),
  })
)
