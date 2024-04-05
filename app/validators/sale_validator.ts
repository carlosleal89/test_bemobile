import vine from '@vinejs/vine';

export const saleValidator = vine.compile(  
  vine.object({
    clientId: vine
      .number(),
    productId: vine
      .number(),
    quantity: vine
      .number(),
    unitPrice: vine
      .number(),
    totalPrice: vine
      .number(), 
  })
)