"use client";
import { useRouter } from "next/navigation";
export default function ApplicationTile({
  application,
  setShowModal,
  setApplication,
}) {
  const router = useRouter();
  const handleApplicationClick = () => {
    setApplication(application);
    router.push(`?applicationId=${application.id}`);
    setShowModal(true);
  };
  return (
    <div onClick={handleApplicationClick} className="application-tile p-1">
      <div className="p-2 py-4 grid grid-cols-2 text-dark-gray bg-opacity-50  bg-light-blue w-fit rounded-xl text-base font-moul cursor-pointer border-[0.5px] border-transparent hover:border-gray-700">
        <div className=" flex flex-col gap-5 ">
          <p className="">Company Name :</p>
          <p className="">Role :</p>
          <p className="">Applied on :</p>
        </div>
        <div className=" flex flex-col gap-5 ">
          <p className="">{application.company}</p>
          <p className="">{application.role}</p>
          <p className="">{application.date_applied}</p>
        </div>
      </div>
    </div>
  );
}
