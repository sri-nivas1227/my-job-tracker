"use client";

import ApplicationTile from "@/app/applicationTracker/components/ApplicationTile";
import searchIcon from "@/app/assets/icons/search-icon.svg";
import Image from "next/image";
import DetailModal from "@/app/applicationTracker/components/DetailModal";
import CreateApplicationTile from "@/app/applicationTracker/components/CreateApplicationTile";
import { useState } from "react";
import { Toaster, toast } from "sonner";
export default function ApplicationTrackerPage() {
  const [applicationList, setApplicationList] = useState([]);
  const [modalEditMode, setModalEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState({});

  return (
    <div className="">
      <div className="m-2 my-4 flex justify-center items-center">
        <div className="w-1/2 rounded-full bg-light-blue bg-opacity-40 flex items-center">
          <input
            type="text"
            placeholder="Search for applications"
            className="w-full placeholder:text-gray-500 bg-transparent outline-none text-dark-gray text-xl rounded-lg px-2"
          />
          <div className="ml-2 cursor-pointer">
            <Image src={searchIcon} alt="search icon" className="w-14 " />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 gap-x-10">
        <CreateApplicationTile
          setShowModal={setShowModal}
          setModalEdit={setModalEditMode}
        />
        {applicationList &&
          applicationList.map((item) => (
            <div key={item._id}>
              <ApplicationTile
                application={item}
                setShowModal={setShowModal}
                setApplication={setSelectedApplication}
              />
            </div>
          ))}
      </div>
      {showModal ? (
        <DetailModal
          application={selectedApplication}
          setShowModal={setShowModal}
          edit={modalEditMode}
          setModalEdit={setModalEditMode}
          toast={toast}
          setSelectedApplication={setSelectedApplication}
        />
      ) : null}
      <Toaster />
    </div>
  );
}
