/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Asterisk from "../../../../components/Asterisk";

// Hooks
import usePost from "../../../../hooks/usePost";

import { useGlobal } from "../../../../contexts/UserContext";
import FormInput from "../../../../components/FormInput";
import { postRegisterSchema } from "./validation-schema";

type IhandleSubmitRegister = z.infer<typeof postRegisterSchema>;

interface IModalRecordPost {
  handleClose: () => void;
}

const ModalRegisterPost = ({
  handleClose,
}: IModalRecordPost) => {
  const { user } = useGlobal();
  const { createPost } = usePost();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(postRegisterSchema),
  });

  const { mutate, isLoading } = createPost(reset, handleClose);

  const handleSubmitRegister = (data: IhandleSubmitRegister) => {
    mutate({
      ...data,
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
          isRequired
          name="title"
          register={register}
          errors={errors?.title}
        />

        <FormInput
          id="content"
          label="Conteúdo"
          isRequired
          type="text"
          name="content"
          register={register}
          inputArea={true}
          errors={errors?.content}
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

export default ModalRegisterPost;
