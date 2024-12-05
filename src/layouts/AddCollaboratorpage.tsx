import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useUpdateAccessTokenMutation } from "../features/api/accountsApi";
import { useGetFilesQuery, useAddCollaboratorMutation } from "../features/api/documentsApi";

type SharingParams = {
  token: string;
};

export const AddCollaboratorpage = () => {
  // нужно для редиректа
  const navigate = useNavigate();

  // токен
  const { token } = useParams<SharingParams>();

  // получаем документ
  const { data: documents, isSuccess: isSuccessDocuments, error, refetch } = useGetFilesQuery();

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

  //  обновления access токена при ошибке "не авторизован"
  const [addCollaborator] = useAddCollaboratorMutation();
  const addCollaboratorHandler = async () => {
    try {
      const response = await addCollaborator({ token: token }).unwrap();
      console.log("ok");
      navigate(`/documents`);
    } catch (error) {
      console.log("ne ok");
      navigate(`/documents`);
    }
  };
  useEffect(() => {
    addCollaboratorHandler();
  }, []);

  return null;
};
