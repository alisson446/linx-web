import { useMutation } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiLinx } from "../services/api";
import {
  ICreateUsuarioArgs,
  ICreateUsuarioResponse
} from "../models/usuarios.model";

const createUsuario = (
  reset: () => void,
  handleClose: () => void
): ICreateUsuarioResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateUsuarioArgs) => {
      const urlPath = 'users'

      try {
        await apiLinx.post(urlPath, data).then(() => {
          reset()
          handleClose()

          useToastStandalone({
            title: "Cadastro concluído!",
            status: "success",
          });
        })
      } catch (error: any) {
        useToastStandalone({
          title: "Erro ao cadastrar usuário",
          description: error.response.data.message,
          status: error?.response?.status || 500,
        });
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

export default function useUsuario() {
  return {
    createUsuario,
  }
}
