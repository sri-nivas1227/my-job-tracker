"use client";
import { useRouter } from "next/navigation";
import { titleCase } from "@/lib/utils/utilityFunctions";
export default function ApplicationTile({
  application,
  setShowModal,
  setApplication,
}) {
  const router = useRouter();
  const handleApplicationClick = () => {
    setApplication(application);
    router.push(`?applicationId=${application._id}`);
    setShowModal(true);
  };
  return (
    <div onClick={handleApplicationClick} className="application-tile p-1">
      <div className="p-2 py-4 w-full h-full text-dark-gray bg-opacity-50  bg-light-blue rounded-xl text-base font-moul cursor-pointer border-[0.5px] border-transparent hover:border-gray-700">
        <p className="text-center text-3xl">{titleCase(application.company)}</p>
        <div className=" flex flex-col gap-5 ">
          <div className="">
            <p className="text-xs font-medium font-sans text-slate-700">Role</p>
            <p className="text-xl">{titleCase(application.role)}</p>
          </div>
          <div className="">
            <p className="text-xs font-medium font-sans text-slate-700">
              Date Applied
            </p>
            <p className="text-xl">{application.date_applied}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
