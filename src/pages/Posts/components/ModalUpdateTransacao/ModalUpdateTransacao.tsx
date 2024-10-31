/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import usePost from "../../../../hooks/usePost";

import {
  fieldRequired
} from "../../../../utils/messagesError";

import { useGlobal } from "../../../../contexts/UserContext";
import FormInput from "../../../../components/FormInput";
import { IPost } from "../../../../models/post.model";

const handleSubmitRegisterSchema = z.object({
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

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>;

interface IModalRecordCollaborator {
  handleClose: () => void
  data: IPost
}

const ModalUpdatePost = ({
  handleClose,
  data
}: IModalRecordCollaborator) => {
  const { user } = useGlobal();
  const { updatePost } = usePost();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema),
    defaultValues: {
      title: data.title,
      content: data.content
    }
  });

  const { mutate, isLoading } = updatePost(reset, handleClose);

  const handleSubmitRegister = (dataSubmit: IhandleSubmitRegister) => {
    mutate({
      ...dataSubmit,
      id: data.id,
      userId: user?.id ?? '',
    })
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitRegister)}
      style={{ width: "100%" }}
    >
      <Box display="flex" flexDirection="column" gap="25px" padding="30px">
        <span>
          (<Asterisk />) indica os campos obrigatórios
        </span>

        <FormInput
          label="Título"
          {...register("title")}
          register={register}
          errors={errors?.title}
        />

        <FormInput
          id="content"
          label="Conteúdo"
          type="text"
          {...register("content")}
          register={register}
          inputArea={true}
          errors={errors.content}
        />

        <Flex justifyContent="flex-end" gap="15px">
          <Button
            isDisabled={isLoading}
            isLoading={isLoading}
            type="submit"
          >
            Cadastrar
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default ModalUpdatePost;
