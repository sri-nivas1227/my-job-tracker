"use client";
import Image from "next/image";
import plusIcon from "@/app/assets/icons/plus-icon.svg";
import { useRouter } from "next/navigation";
const CreateApplicationTile = ({ setShowModal, setModalAction }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/applicationTracker?create=true");
        setShowModal(true);
        setModalAction("create");
      }}
      className="w-full application-tile p-1"
    >
      <div className="w-full h-full p-2 py-4 bg-light-blue bg-opacity-50 rounded-xl flex justify-center items-center gap-2 cursor-pointer border-[0.5px] border-transparent hover:border-gray-700">
        <div className="flex flex-col gap-3 justify-center items-center">
          <Image
            src={plusIcon}
            alt="plus icon"
            className="w-1/6 bg-light-mode-bg rounded-full p-2"
          />
          <span className="font-moul text-dark-blue text-2xl">
            Add Application
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateApplicationTile;
