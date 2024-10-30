import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme, Input, Button } from "@chakra-ui/react";

// Hooks
import useUsuario from "../../hooks/useUsuarios";

// Estilos
import Centralized from "../../Layouts/Centralized";
import { FieldWrap, Form } from "./styled";

// Funções de utilidade
import { signupFormSchema } from "./validation-schema";

type IhandleSubmitRegister = z.infer<typeof signupFormSchema>;

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { createUsuario } = useUsuario();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(signupFormSchema),
  });

  const { mutate, isLoading } = createUsuario(reset, () => {
    navigate("/login");
  });

  const handleSubmitRegister = ({
    name,
    email,
    username,
    password,
  }: IhandleSubmitRegister) => {
    mutate({
      name,
      email,
      username,
      password,
    })
  };

  useEffect(() => {
    document.title = `${theme.content.project} - Signup`;
  }, [theme]);

  return (
    <Centralized>
      <FieldWrap>
        <Form onSubmit={handleSubmit(handleSubmitRegister)}>
          <h3 className="title">Cadastro</h3>

          <div className="fieldsWrap">
            <div className="field">
              <Input
                height={50}
                placeholder="Nome"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <p className="error">{errors.name.message}</p>
              )}
            </div>

            <div className="field">
              <Input
                height={50}
                placeholder="Usuário"
                type="text"
                {...register("username")}
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>

            <div className="field">
              <Input
                height={50}
                placeholder="Email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
            </div>

            <div className="field">
              <Input
                height={50}
                placeholder="Senha"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <span>
              <Link to="/login" className="forgetPassword">
                Login
              </Link>
            </span>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Cadastrar
          </Button>
        </Form>
      </FieldWrap>
    </Centralized>
  );
};

export default Signup;
