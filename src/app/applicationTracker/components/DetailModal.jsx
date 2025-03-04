"use client";
import Image from "next/image";
import crossIcon from "@/app/assets/icons/cross-icon.svg";
import InputTypes from "@/app/applicationTracker/components/InputTypes";
import formData from "@/app/tempResources/ApplicationTrackerForm.json";
import PointsInModal from "@/app/applicationTracker/components/PointsInModal";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import deleteIcon from "@/app/assets/icons/delete-icon-red.svg";

const DetailModal = ({
  application,
  setShowModal,
  edit,
  setModalEdit,
  toast,
  setSelectedApplication,
}) => {
  const [editMode, setEditMode] = useState(edit ? true : false);
  const [applicationForm, setApplicationForm] = useState(
    formData.map((item) => {
      return { key: item.key, value: "" };
    })
  );
  const router = useRouter();
  const params = useSearchParams();
  const isCreating = params.get("create");
  const handleModalClose = () => {
    setShowModal(false);
    setModalEdit(false);
    setSelectedApplication({});
    router.push("/applicationTracker");
  };
  const handleSaveApplication = () => {
    if (isCreating) {
      localStorage.setItem(
        "applications",
        JSON.stringify([
          ...localStorage.getItem("applications"),
          applicationForm.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {}),
        ])
      );
    } else {
    }
  };
  const handleDeleteApplication = () => {
    
  };

  const handleInputChange = (key, value) => {
    const newForm = applicationForm.map((item) => {
      if (item.key === key) {
        return { ...item, value: value };
      }
      return item;
    });
    setApplicationForm(newForm);
  };

  return (
    <div className=" fixed inset-0 bg-dark-gray bg-opacity-20 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 text-dark-blue font-moul border w-2/3 shadow-lg rounded-xl bg-light-cream flex flex-col gap-3">
        <div className="mb-8 flex justify-between items-center">
          <div className="">
            <div className="text-3xl">
              {editMode
                ? isCreating
                  ? "Create Application"
                  : "Edit Application"
                : application["company"]}
            </div>
            {!editMode && (
              <div className="hover:text-steel-blue underline cursor-pointer">
                <Link href={application.job_link ? application.job_link : "#"}>
                  Job Description Link{" "}
                </Link>
              </div>
            )}
          </div>
          {!editMode && (
            <div
              onClick={() => {
                setModalEdit(true);
                setEditMode(true);
              }}
              className="p-2 text-lg bg-light-blue text-dark-gray w-fit rounded-lg cursor-pointer"
            >
              Edit Application
            </div>
          )}
          <div className="p-1 bg-red-500 bg-opacity-30 hover:bg-opacity-50 rounded-lg">
            <Image
              src={crossIcon}
              alt="cross icon"
              onClick={handleModalClose}
              className="cursor-pointer w-6  "
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-[2%]">
          <div className="w-2/3 p-2 text-xl flex flex-col gap-5">
            {editMode ? (
              <>
                {formData.map((data, index) => {
                  return (
                    <div key={index} className="grid grid-cols-2 items-center">
                      <p className="text-nowrap">{data.label} : </p>
                      <InputTypes
                        key={index}
                        inputType={data.type}
                        inputKey={data.key}
                        onInputValueChange={handleInputChange}
                        options={data.options}
                        existingValue={
                          application[data.key] ? application[data.key] : ""
                        }
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {formData.map((data, index) => {
                  if (["company", "job_link"].includes(data.key)) {
                    return (
                      <div className="hidden" key={index}>
                        {" "}
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="grid grid-cols-2 items-center">
                      <p className="text-nowrap">{data.label} : </p>
                      <p className="text-lg text-dark-gray">
                        {application[data.key] ? application[data.key] : "-"}
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="w-1/3 p-2">
            <PointsInModal />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div
            onClick={handleDeleteApplication}
            className="bg-red-500 bg-opacity-30 p-2 rounded-lg cursor-pointer"
          >
            <Image src={deleteIcon} alt="delete icon" className="w-8" />
          </div>
          <div
            className={`flex ${
              isCreating ? "justify-center" : "justify-end"
            } gap-6`}
          >
            <div
              className={`${
                editMode ? "visible" : "invisible"
              } p-2 text-lg bg-steel-blue text-white w-fit rounded-lg cursor-pointer`}
              onClick={handleSaveApplication}
            >
              Save
            </div>
            {!isCreating && (
              <div
                className={`${
                  editMode ? "visible" : "invisible"
                } p-2 text-lg bg-red-500 text-white w-fit rounded-lg cursor-pointer`}
                onClick={() => {
                  setEditMode(false);
                }}
              >
                Cancel
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default DetailModal;
