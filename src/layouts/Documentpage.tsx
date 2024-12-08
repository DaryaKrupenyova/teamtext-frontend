import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useLogoutUserMutation, useUpdateAccessTokenMutation } from "../features/api/accountsApi";
import { useGetFileQuery, useEditFileMutation } from "../features/api/documentsApi";

import { Button } from "../components/Button/Button";

type DocumentParams = {
  documentId: string;
};

export const Documentpage = () => {
  // нужно для редиректа
  const navigate = useNavigate();

  // id документа
  const { documentId } = useParams<DocumentParams>();
  const documentIdNumber = parseInt(documentId ?? "", 10);

  // получаем документ
  const { data: document, isSuccess: isSuccessDocument, error, refetch } = useGetFileQuery({ id: documentIdNumber });

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

  const modules = {
    toolbar: [[{ header: "1" }, { header: "2" }, { font: [] }], [{ size: [] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], ["link", "image", "video"], ["clean"]],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video"];

  const [editorHtml, setEditorHtml] = useState<string>(document?.content || "");

  const handleChange = (html: string) => {
    setEditorHtml(html);
    console.log(editorHtml);
  };

  // обновляем значения инпутов после запросов
  useEffect(() => {
    if (!isSuccessDocument) {
      return;
    }
    setEditorHtml(document?.content || "");
  }, [isSuccessDocument]);

  // запрос на редактирование файла
  const [editDocument] = useEditFileMutation();

  // обработчик редактирование файла
  const editHandler = async () => {
    console.log("createHandler");
    try {
      const response = await editDocument({ id: documentIdNumber, content: editorHtml }).unwrap();
      console.log(`Файл "Новый файл" успешно создан:`, response);
      window.location.reload();
    } catch (error) {
      console.error("Файл не получилось создать:", error);
    }
  };

  if (isSuccessDocument) {
    return (
      <main className="min-h-screen bg-lightgray bg-[url('../../images/waves.svg')] bg-fixed bg-bottom bg-no-repeat">
        <div className="p-6 flex justify-between items-center ">
          <span className="text-3xl">TeamText</span>
          <div>
            <Button onClick={handleLogoutProcess} text="Выйти" />
          </div>
        </div>
        <h1 className="mb-3 px-32 text-left text-2xl">{document.title}</h1>
        <ReactQuill className="z-[2] mb-6 mx-32 border-lightblue bg-white text-black text-base" theme="snow" onChange={handleChange} value={editorHtml} modules={modules} formats={formats} bounds={".app"} placeholder={"Здесь можно писать..."} />
        <div className="px-32 pb-6 flex justify-end items-center ">
          <div>
            <Button onClick={editHandler} text="Сохранить" />
          </div>
        </div>
      </main>
    );
  } else {
    return null;
  }
};
