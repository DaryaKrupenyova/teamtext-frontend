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
  //const { data: documents, isSuccess: isSuccessDocuments, error, refetch } = useGetFilesQuery();

  const documents = [
    {
      id: 1,
      title: "Очень важный файл",
      content: "<p>Очень важные слова</p>",
      created_at: "2014-01-02",
      updated_at: "2014-01-02",
      sharing_token: "jhgfghjklkj",
    },
    {
      id: 2,
      title: "Файл",
      content: "<p>Очень важные слова</p>",
      created_at: "2014-01-02",
      updated_at: "2014-01-02",
      sharing_token: "jhgfghjklkj",
    },
    {
      id: 3,
      title: "Очень очень очень важный файл",
      content: "<p>Очень важные слова</p>",
      created_at: "2014-01-02",
      updated_at: "2014-01-02",
      sharing_token: "jhgfghjklkj",
    },
    {
      id: 4,
      title: "Очень важный файл",
      content: "<p>Очень важные слова</p>",
      created_at: "2014-01-02",
      updated_at: "2014-01-02",
      sharing_token: "jhgfghjklkj",
    },
    {
      id: 5,
      title: "Файл",
      content: "<p>Очень важные слова</p>",
      created_at: "2014-01-02",
      updated_at: "2014-01-02",
      sharing_token: "jhgfghjklkj",
    },
    {
      id: 6,
      title: "Очень очень очень важный файл",
      content: "<p>Очень важные слова</p>",
      created_at: "2014-01-02",
      updated_at: "2014-01-02",
      sharing_token: "jhgfghjklkj",
    },
  ];

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
  /*const [updateAccessToken] = useUpdateAccessTokenMutation();
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
  }, []);*/

  // запрос на создание файла
  const [createDocument] = useCreateFileMutation();

  // обработчик удаления файла
  const createHandler = async () => {
    try {
      const response = await createDocument({ title: "Новый файл" }).unwrap();
      console.log(`Файл "Новый файл" успешно создан:`, response);
      window.location.reload();
    } catch (error) {
      console.error("Файл не получилось создать:", error);
    }
  };

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
          <div className="w-full">поиск</div>
        </div>
        <div className="px-80 grid grid-cols-5 gap-y-10 gap-x-14 justify-center items-stretch">
          {documents.map((document: Document) => (
            <FileCard key={document.id} id={document.id} title={document.title} />
          ))}
        </div>
      </main>
    </>
  );
};

/*
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
            <Button onClick={() => null} text="Создать" />
          </div>
          <div className="w-full">поиск</div>
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
            <main className="bg-starkit-magnolia">
              <LogoutHeader role={role ? role : "user"} onClickHandler={handleLogoutProcess} />
              <div className="grid auto-cols-auto gap-y-5 justify-center items-center">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row gap-x-5">
                    <a href="/categories">
                      <h2 className="cursor-pointer text-xl font-medium text-starkit-electric">Категории</h2>
                    </a>
                    <a href="/products">
                      <h2 className="cursor-pointer text-xl font-medium text-starkit-lavender">Товары</h2>
                    </a>
                    <a href="/orders">
                      <h2 className="cursor-pointer text-xl font-medium text-starkit-lavender">Заказы</h2>
                    </a>
                    <a href="/carriers">
                      <h2 className="cursor-pointer text-xl font-medium text-starkit-lavender">Доставщики</h2>
                    </a>
                    <a href="/shipments">
                      <h2 className="cursor-pointer text-xl font-medium text-starkit-lavender">Доставки</h2>
                    </a>
                    <a href="/warehouses">
                      <h2 className="cursor-pointer text-xl font-medium text-starkit-lavender">Склады</h2>
                    </a>
                    <a href="/stocks">
                      <h2 className="cursor-pointer text-xl font-medium text-starkit-lavender">Количество товаров</h2>
                    </a>
                  </div>
                  <div>
                    <a href="/categories/create">
                      <Button text="Новая категория" className="px-14" />
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-y-[26px] gap-x-[26px]">
                  {categories.map((category: Category) => (
                    <CategoryCard key={category.id} id={category.id} name={category.name} />
                  ))}
                </div>
              </div>
            </main>
          </>
        );
      }
    } else {
      return null;
    }
*/
