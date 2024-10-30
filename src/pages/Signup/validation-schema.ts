import { z } from "zod";
import { emailInvalid, fieldRequired, minContent } from "../../utils/messagesError";
import { emailValidation } from "../../utils/regexExpressions";

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: `O nome ${minContent(3)}`,
    }),
  email: z
    .string()
    .min(1, {
      message: fieldRequired("e-mail"),
    })
    .regex(emailValidation, {
      message: emailInvalid,
    })
    .transform((email) => email.toLocaleLowerCase()),
  username: z
    .string()
    .min(3, {
      message: `O usuário ${minContent(3)}`,
    }),
  password: z.string().min(3, {
    message: `A senha ${minContent(3)}`,
  }),
});
