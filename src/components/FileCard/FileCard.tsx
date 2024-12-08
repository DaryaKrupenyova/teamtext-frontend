import React, { useState } from "react";
import { useRenameFileMutation, useDeleteFileMutation, useShareFileMutation } from "../../features/api/documentsApi";
import { FileIcon } from "../Icons/FileIcon";
import { MenuIcon } from "../Icons/MenuIcon";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
interface FileCardProps {
  id: number;
  title: string;
}
export const FileCard: React.FC<FileCardProps> = (props) => {
  // состояние для видимости меню
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  // состояние для переименования файла
  const [isRename, setIsRename] = useState<boolean>(false);
  // значение инпута названия файла
  const [newTitle, setNewTitle] = useState<string>(props.title);
  // обработчик изменения значения инпута
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewTitle(value);
  };
  // обработчик снятия фокуса с инпута
  const onBlur = () => {
    renameHandler();
  };
  // обработчик клавиши "Enter" для снятия фокуса с инпута
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // @ts-ignore
      event.target.blur();
    }
  };
  // запрос на переименование файла
  const [renameDocument] = useRenameFileMutation();
  // обработчик переименования файла
  const renameHandler = async () => {
    if (newTitle == "") {
      setNewTitle(props.title);
    }
    try {
      const response = await renameDocument({ id: props.id, title: newTitle }).unwrap();
      console.log(`Файл "${props.title}" успешно переименован:`, response);
      window.location.reload();
    } catch (error) {
      console.error("Файл не получилось переименовать:", error);
      window.location.reload();
    }
  };
  // запрос на удаление файла
  const [deleteDocument] = useDeleteFileMutation();
  // обработчик удаления файла
  const deleteHandler = async () => {
    try {
      const response = await deleteDocument({ id: props.id }).unwrap();
      console.log(`Файл "${props.title}" успешно удален:`, response);
      window.location.reload();
    } catch (error) {
      console.error("Файл не получилось удалить:", error);
    }
  };
  // состояние для режима доступа к файлу
  const [isEditor, setIsEditor] = useState<boolean>(false);
  // состояние для показа банера "Доступ к файлу"
  const [isShareBanner, setIsShareBanner] = useState<boolean>(false);
  // состояние для показа банера "Вот ваша ссылка"
  const [isUrlBanner, setIsUrlBanner] = useState<boolean>(false);
  // состояние для показа банера "Не получилось дать доступ"
  const [isErrorBanner, setIsErrorBanner] = useState<boolean>(false);
  // токен для доступа к файлу
  const [sharingToken, setSharingToken] = useState<string>("");
  // запрос на share файла
  const [shareDocument] = useShareFileMutation();
  // обработчик переименования файла
  const shareHandler = async () => {
    try {
      const response = await shareDocument({ id: props.id, is_sharing: true, is_editor: isEditor }).unwrap();
      console.log(`Файлом "${props.title}" получилось поделиться:`, response);
      setSharingToken(response.sharing_token);
      console.log("sharing_token", sharingToken);
      setIsShareBanner(false);
      setIsUrlBanner(true);
    } catch (error) {
      console.error("Файлом не получилось поделиться:", error);
      setIsShareBanner(false);
      setIsErrorBanner(true);
    }
  };

  return (
    <div className="p-5 flex flex-col justify-start items-center rounded-xl bg-white shadow-xl">
      <div className="mb-2.5 flex flex-row justify-center items-start gap-x-2.5">
        <a href={`/documents/${props.id}`}>
          <div className="">
            <FileIcon className="w-[130px] h-[170px] fill-lightblue" />
          </div>
        </a>
        <MenuIcon onClick={() => setVisibleMenu(!visibleMenu)} className="cursor-pointer w-[7px] h-[25px] fill-gray" />
      </div>
      {!isRename ? <p className="w-[147px] text-xl text-center ellipsis">{props.title}</p> : <Input onChange={onChange} onBlur={onBlur} onKeyDown={onKeyDown} value={newTitle} type="text" className="pl-2" placeholder="Название файла..." />}
      {visibleMenu && (
        <div className="mt-[25px] ml-[290px] absolute shadow-xl z-[2] bg-white border border-gray rounded-xl divide-y divide-gray">
          <div onClick={() => setIsRename(true)} className="cursor-pointer p-3.5 pb-2.5 ">
            <p className="text-gray text-base">Переименовать</p>
          </div>
          <div onClick={deleteHandler} className="cursor-pointer px-3.5 py-2.5">
            <p className="text-gray text-base">Удалить</p>
          </div>
          <div onClick={() => setIsShareBanner(true)} className="cursor-pointer p-3.5 pt-2.5">
            <p className="text-gray text-base">Поделиться</p>
          </div>
        </div>
      )}
      {isShareBanner && (
        <div className="h-dvh fixed inset-0 bg-black/50 bg-none flex justify-center items-center z-[3]">
          <div className="w-[425px] p-6 flex flex-col justify-center items-center rounded-xl bg-white shadow-xl">
            <h1 className="mb-4 text-center text-2xl">Предоставить доступ по ссылке</h1>
            <div className="mb-4 flex flex-row gap-x-3">
              <span className="text-center text-base">Права:</span>
              <div className="relative overflow-hidden flex flex-row items-center cursor-pointer h-[25px] w-[170px] rounded-xl bg-white border border-lightblue" onClick={() => setIsEditor(!isEditor)}>
                <div className={`h-full w-1/2 bg-lightblue transition-transform duration-500 ${isEditor ? "translate-x-full" : ""}`} />
                <span className={`absolute top-0 left-0 h-full w-1/2 text-base text-center ${isEditor ? "text-black" : "text-white"}`}>Читатель</span>
                <span className={`absolute top-0 left-[85px] h-full w-1/2 text-base text-center ${isEditor ? "text-white" : "text-black"}`}>Редактор</span>
              </div>
            </div>
            <Button onClick={shareHandler} text="Предоставить" />
          </div>
        </div>
      )}
      {isUrlBanner && (
        <div className="h-dvh fixed inset-0 bg-black/50 bg-none flex justify-center items-center z-[3]">
          <div className="w-[425px] p-6 flex flex-col justify-center items-center rounded-xl bg-white shadow-xl">
            <h1 className="mb-4 text-center text-2xl">Ссылка успешно сгенерирована</h1>
            <p className="text-center text-base">Отправьте эту ссылку тому, с кем хотите поделиться файлом: </p>
            <p className="mb-4 break-all text-center text-lightblue text-base">http://localhost:5173/documents/sharing/{sharingToken}</p>
            <Button onClick={() => setIsUrlBanner(false)} text="Готово" />
          </div>
        </div>
      )}
      {isErrorBanner && (
        <div className="h-dvh fixed inset-0 bg-black/50 bg-none flex justify-center items-center z-[3]">
          <div className="w-[425px] p-6 flex flex-col justify-center items-center rounded-xl bg-white shadow-xl">
            <h1 className="mb-4 text-center text-2xl">Ссылку не удалось сгенерировать</h1>
            <Button onClick={() => setIsErrorBanner(false)} text="Понятно" />
          </div>
        </div>
      )}
    </div>
  );
};
