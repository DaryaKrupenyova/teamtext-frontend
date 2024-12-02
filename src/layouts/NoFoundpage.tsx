import { AButton } from "../components/AButton/AButton";
import { NotFoundIcon } from "../components/Icons/NotFoundIcon";

export const NoFoundpage = () => {
  return (
    <>
      <main className="min-h-screen bg-lightgray bg-[url('../../images/waves.svg')] bg-fixed bg-bottom bg-no-repeat">
        <div className="p-6 flex justify-between items-center ">
          <span className="text-3xl">TeamText</span>
          <AButton href="/" text="Главная" />
        </div>
        <div className="mt-72 flex flex-col justify-center">
          <div className="mx-auto max-w-md flex flex-col justify-center">
            <NotFoundIcon className="mx-auto h-12" />
            <h2 className="w-full text-center mt-2 text-2xl font-bold sm:mt-6 sm:text-3xl">404</h2>
            <h3 className="w-full text-center text-xl font-medium sm:mt-3 sm:text-2xl">Пока такой страницы нет</h3>
          </div>
        </div>
      </main>
    </>
  );
};
