import { Outlet } from "react-router-dom";
import HeaderLayout from "./Header";

const DefaultLayout = () => {
  const defaultMenu = [
    {
      href: "/",
      text: "Post",
    },
    {
      href: "/album",
      text: "Album",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderLayout links={defaultMenu} />
      <main className="flex-1 w-full">{<Outlet />}</main>
    </div>
  );
};

export default DefaultLayout;
