// import NavBar from "@/app/components/NavBar";

export default function ApplicationTrackerLayout({ children }) {
  return (
    <div className="h-screen flex flex-col fixed bg-light-mode-bg">
      {/* <div className="h-full">
        <NavBar title={"Application Tracker"} />
      </div> */}
      <div className="w-4/5 min-h-full m-auto py-4">{children}</div>
    </div>
  );
}
