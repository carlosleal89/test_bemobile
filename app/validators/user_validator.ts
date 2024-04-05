import vine from '@vinejs/vine';

export const signupValidator = vine.compile(
  vine.object({
    fullName: vine
      .string()
      .trim()
      .minLength(4)
      .regex(/^[A-Za-zÀ-ÿ\s]+$/),
    email: vine.string().email(),
    password: vine.string().minLength(5)
  })
);