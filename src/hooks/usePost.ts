import { useMutation, useQuery } from "react-query";
import { useToastStandalone } from "./useToastStandalone";
import { apiLinx } from "../services/api";
import {
  IPostArgs,
  IPostResponse,
  ICreatePostArgs,
  ICreatePostResponse,
  IUpdatePostArgs,
  IUpdatePostResponse,
  IDeletePostResponse
} from "../models/post.model";
import { Warning } from "../errors";
import { keys, queryClient } from "../services/query";

const getPosts = ({
  page,
  size
}: IPostArgs): IPostResponse => {

  const { data, isLoading } = useQuery(
    [
      keys.posts,
      page
    ],
    async () => {
      const path = 'posts';

      try {
        const { data } = await apiLinx.get(path, {
          params: {
            page,
            size
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

const createPost = (
  reset: () => void,
  handleClose: () => void
): ICreatePostResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: ICreatePostArgs) => {
      const urlPath = 'posts'

      try {
        await apiLinx.post(urlPath, data).then(() => {
          reset()
          handleClose()

          queryClient.invalidateQueries([keys.posts])

          useToastStandalone({
            title: "Postagem feita!",
            status: "success",
          });
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

const updatePost = (
  reset: () => void,
  handleClose: () => void
): IUpdatePostResponse => {

  const { isLoading, mutate } = useMutation(
    async (data: IUpdatePostArgs) => {
      const urlPath = `posts/${data.id}`;

      try {
        await apiLinx.put(urlPath, data).then(() => {
          reset()
          handleClose()
          queryClient.invalidateQueries([keys.posts])

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

const deletePost = (): IDeletePostResponse => {

  const { isLoading, mutate } = useMutation(
    async (id: string) => {
      const urlPath = `posts/${id}`

      try {
        await apiLinx.delete(urlPath).then(function () {
          queryClient.invalidateQueries([keys.posts])

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

export default function usePost() {
  return {
    getPosts,
    createPost,
    updatePost,
    deletePost
  }
}
