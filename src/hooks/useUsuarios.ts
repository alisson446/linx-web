import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiLinx } from "../services/api";
import {
  IUsuarioArgs,
  IUsuarioResponse,
  ICreateUsuarioArgs,
  ICreateUsuarioResponse,
  IUpdateUsuarioArgs,
  IUpdateUsuarioResponse,
  IDeleteUsuarioResponse,
  IUsuario
} from "../models/usuarios.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getUsuario = ({ page, size, nome, status }: IUsuarioArgs): IUsuarioResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.usuario,
      page,
      nome,
      status
    ],
    async () => {
      const path = 'users/index';

      try {
        const { data } = await apiLinx.get(path, {
          params: {
            page,
            size,
            nome,
            status,
            orderBy: 'nome'
          },
        });

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data?.rows || [],
    count: data?.count || 0,
    isLoading
  };
}

const getAllUsuario = (): IUsuarioResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.usuario,
    ],
    async () => {
      const path = 'users/findAll';

      try {
        const { data } = await apiLinx.get(path);

        return data
      } catch (error: any) {
        throw new Warning(error.response.data.message, error.response.status);
      }
    }
  )

  return {
    data: data || [],
    count: data?.count || 0,
    isLoading
  };
}

const createUsuario = (
  reset: () => void,
  handleClose: () => void
): ICreateUsuarioResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreateUsuarioArgs) => {
      const urlPath = 'users/create'

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

const updateUsuario = (
  reset: () => void,
  handleClose: () => void
): IUpdateUsuarioResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdateUsuarioArgs) => {
      const urlPath = `users/update/${data.id}`;

      try {
        await apiLinx.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.usuario])

          useToastStandalone({
            title: "Atualizado com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}

const deleteUsuario = (): IDeleteUsuarioResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `users/delete/${id}`
      try {
        await apiLinx.patch(urlPath).then(function () {
          queryClient.invalidateQueries([keys.usuario])

          useToastStandalone({
            title: "Excluída com sucesso!",
            status: "success"
          })
        })
      } catch (error: any) {
        throw new Warning(error.response.data.message, error?.response?.status);
      }
    }
  )

  return {
    isLoading,
    mutate
  }
}


const usuarioPromiseOptions = async (search: string, _loadedOptions: any, { page }: any) => {

  const path = 'users/index';
  const itensPerPage = 20;

  const { data } = await apiLinx.get(path, {
    params: {
      page,
      size: itensPerPage,
      nome: search,
      orderBy: 'nome'
    },
  });

  return {
    options: data.rows.map((item: IUsuario) => ({
      label: item.nome,
      value: item.id
    })),
    hasMore: data.count > (page * itensPerPage),
    additional: {
      page: page + 1,
    }
  }
}

export default function useUsuario() {
  return {
    getUsuario,
    getAllUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    usuarioPromiseOptions
  }
}
