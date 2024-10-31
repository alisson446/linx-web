import { z } from "zod";
import { fieldRequired } from "../../../../utils/messagesError";

export const postUpdateSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: fieldRequired("Título"),
    }),
  content: z
    .string()
    .min(1, {
      message: fieldRequired("Conteúdo"),
    }),
});
