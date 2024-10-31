/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { useTheme } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import Favicon from "../components/Favicon";

import {
  getUser,
  removeAllCookies,
  setDataCookie,
} from "../cookies";

import { useToastStandalone } from "../hooks/useToastStandalone";
import { apiLinx } from "../services/api";
import { queryClient } from "../services/query";

import { Warning } from "../errors";
import useError from "../hooks/useError";
import { IUser } from "../models/user.model";

interface ISignInCredentials {
  username: string;
  password: string;
}

interface IUserAccess {
  userEmail?: string;
  firstAccess: boolean;
}

interface IGlobalContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  signIn(args: ISignInCredentials): Promise<void>;
  signOut({ hasLoginRedirect }: { hasLoginRedirect: boolean }): void;

  userAccess: IUserAccess;
  setUserAccess: Dispatch<SetStateAction<IUserAccess>>;
}

interface IGlobalProvider {
  children: ReactNode;
}

const GlobalContext = createContext({} as IGlobalContext);

const GlobalProvider = ({ children }: IGlobalProvider) => {
  const navigate = useNavigate();
  const { errorHandler } = useError();

  const theme = useTheme();
  const favicon = theme.images.favicon;

  const [user, setUser] = useState<IUser | null>(getUser());

  const [userAccess, setUserAccess] = useState<IUserAccess>({
    userEmail: "",
    firstAccess: false,
  });

  const finishSession = ({
    hasLoginRedirect,
  }: {
    hasLoginRedirect: boolean;
  }) => {
    queryClient.removeQueries();
    removeAllCookies();
    setUser(null);

    if (hasLoginRedirect) {
      navigate("/login");
    }
  };

  const signOut = ({
    hasLoginRedirect,
  }: {
    hasLoginRedirect: boolean;
  }): void => {
    finishSession({ hasLoginRedirect });
    if (user) {
      useToastStandalone({ title: "Você deslogou!", status: "info" });
    }
  };

  const signIn = async ({
    username,
    password,
  }: ISignInCredentials): Promise<void> => {
    try {
      const loginResponse = await apiLinx.post<{
        userId: string
        token: string
      }>("/auth/login", {
        username,
        password,
      });

      setDataCookie({
        key: "@linx.token",
        value: loginResponse.data.token
      });

      const userResponse = await apiLinx.get<IUser>(`users/${loginResponse.data.userId}`);

      setUser(userResponse.data);

      setDataCookie({
        key: "@linx.user",
        value: JSON.stringify(userResponse.data),
      });

      navigate("/");

    } catch (error: any) {
      if (error?.code === "ERR_NETWORK") {
        return useToastStandalone({
          title: "Sistema indisponível no momento!",
          status: "error",
        });
      }
      if (error.response.status >= 400) {
        useToastStandalone({
          title: "Erro na autenticação",
          description:
            error?.response?.data?.message[0] ||
            "Usuário ou senha incorreto. Verifique seus dados e tente novamente.",
          status: "error",
        });
      }
    }
  };

  queryClient.setDefaultOptions({
    queries: {
      onError: async (error: any) => {
        if (error instanceof Warning && error.code === 401) {
          queryClient.resetQueries();

          finishSession({ hasLoginRedirect: true });

          useToastStandalone({
            title: "Token expirado!",
            description: "Seu token expirou, faça login novamente",
            status: "info",
            duration: 10000,
          });
        } else {
          errorHandler(error);
        }
      },
      cacheTime: 600000, // 10 minutes
      staleTime: 480000, // 8 minutes
      retryDelay: 500, // 1/2 second
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    mutations: {
      onError: errorHandler,
    },
  });

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
        userAccess,
        setUserAccess
      }}
    >
      <Favicon favicon={favicon} />
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobal = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobal };
