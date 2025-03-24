// create a login page with name, email, and password fields
// when the form is submitted, send a POST request to the /api/user route

"use client";

import { useState } from "react";
import axios from "axios";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    axios
      .post("/api/user", user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem(
          "isLoggedin",
          JSON.stringify(res.data.data.isLoggedin)
        );
        router.push("/applicationTracker");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(user);
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange}
            name="name"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="p-2 bg-light-blue text-white rounded"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
