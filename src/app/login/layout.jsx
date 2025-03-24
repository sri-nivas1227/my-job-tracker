"use client";
import NavBar from "@/app/global/NavBar";
// import { Provider } from "react-redux";
// import store from "@/lib/store";

export default function LoginLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col fixed bg-light-mode-bg">
      {/* <div className="h-full"> */}
      {/* <Provider store={store}> */}
      <NavBar />
      {/* </div> */}
      <div className="w-4/5 min-h-full m-auto py-4">{children}</div>
      {/* </Provider> */}
    </div>
  );
}
