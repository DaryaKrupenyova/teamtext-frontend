import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { useLoginUserMutation } from "../features/api/accountsApi";

import { AButton } from "../components/AButton/AButton";
import { LogoutIcon } from "../components/Icons/LogoutIcon";
import { Input } from "../components/Input/Input";
import { Label } from "../components/Label/Label";
import { Button } from "../components/Button/Button";

import { LoginData, AuthErrorResponse } from "../entities/account/model/types";

export const Loginpage = () => {
  /* валидация формы */
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  // запрос на вход
  const [loginUser] = useLoginUserMutation();

  // делаем запрос на вход + получение ошибок с бэка
  const navigate = useNavigate();
  const handleSubmitProcess = async (data: LoginData) => {
    try {
      const email = data.emailValue;
      const password = data.passwordValue;
      const returned = await loginUser({ email, password }).unwrap();
      const refreshtoken = returned?.refresh ?? null;
      localStorage.setItem("refresh", refreshtoken);
      const accesstoken = returned?.access ?? null;
      localStorage.setItem("access", accesstoken);
      navigate("/documents");
    } catch (error) {
      const errorResponse = error as AuthErrorResponse;
      if (errorResponse.data?.email) {
        setError("emailValue", { type: "custom", message: errorResponse.data?.email });
      }
      if (errorResponse.data?.password) {
        setError("passwordValue", { type: "custom", message: errorResponse.data?.password });
      }
    }
  };

  return (
    <>
      <main className="min-h-screen bg-lightgray bg-[url('../../images/waves.svg')] bg-fixed bg-bottom bg-no-repeat">
        <div className="p-6 flex justify-between items-center ">
          <span className="text-3xl">TeamText</span>
          <AButton href="/auth/register" text="Регистрация" />
        </div>
        <div className="mt-28 flex flex-col justify-center">
          <div className="mx-auto max-w-md">
            <LogoutIcon className="mx-auto h-12" />
            <h2 className="mt-2 text-2xl font-bold sm:mt-6 sm:text-3xl">С возвращением!</h2>
          </div>
          <div className="mx-auto mt-6 w-full max-w-md rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-xl sm:mt-10 sm:p-10">
            <form
              onSubmit={handleSubmit((data) => {
                handleSubmitProcess(data);
              })}
              className="mt-6 space-y-6"
            >
              <div>
                <Label text="Почта" />
                <div className="mt-1">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Некорректный формат почты",
                      },
                    }}
                    render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="text" id="emailValue" name="emailValue" isError={!!errors.emailValue} placeholder="john@mail.com" />}
                    name="emailValue"
                  />
                  {errors.emailValue && (
                    <div className="mt-1 h-8 flex items-center gap-x-3">
                      <h3 className="text-sm font-medium text-red">{errors.emailValue.message}</h3>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label text="Пароль" />
                <div className="mt-1">
                  <Controller
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                    }}
                    render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} type="password" id="passwordValue" name="passwordValue" isError={!!errors.passwordValue} placeholder="*****************" />}
                    name="passwordValue"
                  />
                  {errors.passwordValue && (
                    <div className="mt-1 h-8 flex items-center gap-x-3">
                      <h3 className="text-sm font-medium text-red">{errors.passwordValue.message}</h3>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Button type="submit" text="Войти" />
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};
