"use client";

import ApplicationTile from "@/app/applicationTracker/components/ApplicationTile";
import searchIcon from "@/app/assets/icons/search-icon.svg";
import Image from "next/image";
import DetailModal from "@/app/applicationTracker/components/DetailModal";
import CreateApplicationTile from "@/app/applicationTracker/components/CreateApplicationTile";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { redirect } from "next/navigation";

export default function ApplicationTrackerPage() {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) {
    redirect("/login");
  }
  const [modalAction, setModalAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState({});
  const [applicationList, setApplicationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const applicationList = useSelector(jobs);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`/api/applications?userId=${userData.id}`).then((res) => {
      setApplicationList(res.data.data.applications);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
          setModalAction={setModalAction}
        />
        {applicationList &&
          applicationList.map((item) => (
            <div key={item.id}>
              <ApplicationTile
                application={item}
                setShowModal={setShowModal}
                setModalAction={setModalAction}
                setApplication={setSelectedApplication}
              />
            </div>
          ))}
      </div>
      {showModal ? (
        <DetailModal
          application={selectedApplication}
          setShowModal={setShowModal}
          modalAction={modalAction}
          setModalAction={setModalAction}
          toast={toast}
          userId={userData.id}
          setSelectedApplication={setSelectedApplication}
        />
      ) : null}
      <Toaster />
    </div>
  );
}

// const handleLogin = () => {
//   const response = confirm("Please login to continue");

//   const email = prompt("Please enter your email");
//   const password = prompt(
//     "Please enter your password, create one if you don't have one"
//   );
//   const name = prompt("Please enter your name");
//   console.log(email, password, name);
//   if (email && password && name) {
//     axios
//       .post("/api/user", {
//         email,
//         password,
//         name,
//       })
//       .then((res) => {
//         if (!res.data.success) {
//           alert("incorrect password");
//         } else {
//           localStorage.setItem("userData", JSON.stringify(res.data.data));
//         }
//       });
//   } else {
//     handleLogin();
//   }
// };
