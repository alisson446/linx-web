export interface ICreateUsuarioArgs {
  name: string
  email: string
  username: string
  password: string
}

export interface ICreateUsuarioResponse {
  isLoading: boolean;
  mutate: UseMutateFunction<void, unknown, ICreateUsuarioArgs, unknown>;
}

