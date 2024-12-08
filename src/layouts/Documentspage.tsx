import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLogoutUserMutation, useUpdateAccessTokenMutation } from "../features/api/accountsApi";
import { useGetFilesQuery, useCreateFileMutation } from "../features/api/documentsApi";

import { FileCard } from "../components/FileCard/FileCard";
import { Button } from "../components/Button/Button";
import { NotFoundIcon } from "../components/Icons/NotFoundIcon";

import { Document } from "../entities/documents/model/types";

export const Documentspage = () => {
  // нужно для редиректа
  const navigate = useNavigate();

  // получаем все файлы
  const { data: documents, isSuccess: isSuccessDocuments, error, refetch } = useGetFilesQuery();

  // запрос на выход
  const [logoutUser] = useLogoutUserMutation();
  const handleLogoutProcess = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh");
      const returned = await logoutUser({ refresh_token: refreshToken }).unwrap();
      localStorage.clear();
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  //  обновления access токена при ошибке "не авторизован"
  const [updateAccessToken] = useUpdateAccessTokenMutation();
  const [isTokenRefreshing, setIsTokenRefreshing] = useState(false);
  const fetchLessons = async () => {
    try {
      const valrefetch = await refetch();
      // @ts-ignore
      if (valrefetch.error?.status === 401 && !isTokenRefreshing) {
        try {
          setIsTokenRefreshing(true);
          const refreshToken = localStorage.getItem("refresh");
          const val = await updateAccessToken({ refresh: refreshToken }).unwrap();
          await refetch();
        } catch (tokenError) {
          navigate("/auth/login");
        } finally {
          setIsTokenRefreshing(false);
        }
      } else if (valrefetch.error) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchLessons();
  }, []);

  // запрос на создание файла
  const [createDocument] = useCreateFileMutation();

  // обработчик создания файла
  const createHandler = async () => {
    try {
      const response = await createDocument({ title: "Новый файл" }).unwrap();
      console.log(`Файл "Новый файл" успешно создан:`, response);
      window.location.reload();
    } catch (error) {
      console.error("Файл не получилось создать:", error);
    }
  };

  if (isSuccessDocuments) {
    if (documents.length == 0) {
      return (
        <main className="min-h-screen bg-lightgray bg-[url('../../images/waves.svg')] bg-fixed bg-bottom bg-no-repeat">
          <div className="p-6 pb-14 flex justify-between items-center ">
            <span className="text-3xl">TeamText</span>
            <div>
              <Button onClick={handleLogoutProcess} text="Выйти" />
            </div>
          </div>
          <div className="px-80 w-full flex justify-between items-center gap-x-8">
            <div>
              <Button onClick={createHandler} text="Создать" />
            </div>
          </div>
          <div className="pt-52 flex items-center justify-center flex-col">
            <NotFoundIcon className="mx-auto h-12" />
            <p className="text-black font-bold text-2xl text-center mt-5">Пока у Вас нет файлов</p>
          </div>
        </main>
      );
    } else {
      return (
        <>
          <main className="min-h-screen bg-lightgray bg-[url('../../images/waves.svg')] bg-fixed bg-bottom bg-no-repeat">
            <div className="p-6 pb-14 flex justify-between items-center ">
              <span className="text-3xl">TeamText</span>
              <div>
                <Button onClick={handleLogoutProcess} text="Выйти" />
              </div>
            </div>
            <div className="mb-9 px-80 w-full flex justify-between items-center gap-x-8">
              <div>
                <Button onClick={createHandler} text="Создать" />
              </div>
            </div>
            <div className="px-80 grid grid-cols-5 gap-y-10 gap-x-14 justify-center items-stretch">
              {documents.map((document: Document) => (
                <FileCard key={document.id} id={document.id} title={document.title} />
              ))}
            </div>
          </main>
        </>
      );
    }
  } else {
    return null;
  }
};
