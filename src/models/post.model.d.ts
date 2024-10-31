import { UseMutateFunction } from "react-query"

export interface IPost {
  id: string
  title: string
  content: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface IPostArgs {
  page: number
  size: number
}

export interface IPostResponse {
  data: IPost[];
  count: number;
  isLoading: boolean;
}

export interface ICreatePostArgs {
  title: string
  content: string
  userId: string
}

export interface IUpdatePostArgs extends ICreatePostArgs {
  id: string
}

export interface ICreatePostResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreatePostArgs, unknown>;
}

export interface IUpdatePostResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, IUpdatePostArgs, unknown>;
}

export interface IDeletePostResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, string, unknown>;
}
